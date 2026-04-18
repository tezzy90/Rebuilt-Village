---
name: givebutter-sync
description: Pattern for the nightly Cloud Function that syncs Givebutter donor and gift data into Firestore. Invoke when building, modifying, or debugging the Givebutter integration. Covers scheduling, API pagination, idempotent writes, reconciliation, and failure alerting.
---

# Givebutter to Firestore Sync

Rebuilt Village uses Givebutter as the donor-facing fundraising platform (campaigns, peer-to-peer, ticketing, CRM) and Stripe direct for a minimal-friction custom donation flow on `/donate`. Both pipelines need to end up in the same Firestore collections so FireCMS surfaces a unified donor view to Jess and Amanda.

## Architecture

```
Givebutter API  ─┐
                 ├──> Nightly Cloud Function ──> Firestore: donors, gifts
Stripe webhook  ─┘    (real-time for Stripe,
                       nightly for Givebutter)
```

Stripe writes happen immediately when a checkout session completes (via the existing `stripeWebhook` handler). Givebutter writes happen on a nightly schedule because Givebutter does not currently webhook out to us for every gift type, and because their API is rate-limited.

## Collection shapes (from firecms-schema skill)

Canonical donors:

```typescript
type Donor = {
  email: string;
  name: string;
  firstGiftAt: Timestamp;
  lastGiftAt: Timestamp;
  totalGivenCents: number;
  giftCount: number;
  sources: ("stripe" | "givebutter")[];
  givebutterId?: string;
  stripeCustomerId?: string;
  active: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};
```

Canonical gifts:

```typescript
type Gift = {
  donorRef: DocumentReference;  // /donors/{id}
  amountCents: number;
  currency: "usd";
  source: "stripe" | "givebutter";
  sourceId: string;             // Stripe session ID or Givebutter transaction ID
  campaign?: string;
  designation?: string;          // restricted project name, if any
  tributeName?: string;
  tributeEmail?: string;
  occurredAt: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};
```

## Cloud Function: scheduled sync

Deploy as a Firebase v2 scheduled function:

```typescript
// functions/src/handlers/syncGivebutter.ts
import { onSchedule } from "firebase-functions/v2/scheduler";
import { defineSecret } from "firebase-functions/params";
import { logger } from "firebase-functions/v2";
import { db, FieldValue } from "../lib/firebase";

const GIVEBUTTER_API_KEY = defineSecret("GIVEBUTTER_API_KEY");

export const syncGivebutter = onSchedule(
  {
    schedule: "0 3 * * *",         // 3am UTC nightly
    timeZone: "America/New_York",
    secrets: [GIVEBUTTER_API_KEY],
    timeoutSeconds: 540,            // 9 minutes
    memory: "512MiB",
  },
  async (event) => {
    const since = await getLastSyncCursor();
    const transactions = await fetchGivebutterTransactions(since, GIVEBUTTER_API_KEY.value());

    let written = 0;
    let skipped = 0;
    let errors = 0;

    for (const tx of transactions) {
      try {
        const result = await upsertGift(tx);
        if (result === "written") written++;
        else skipped++;
      } catch (err) {
        errors++;
        logger.error("Failed to upsert Givebutter transaction", { txId: tx.id, err });
      }
    }

    await setLastSyncCursor(new Date());

    logger.info("Givebutter sync complete", { written, skipped, errors, total: transactions.length });

    if (errors > 0) {
      await alertOps({ channel: "givebutter-sync", written, skipped, errors });
    }
  }
);
```

## Idempotency is mandatory

Every gift write must be idempotent. The same Givebutter transaction ID arriving twice (from a retry, a re-run, or a reconciliation pass) must not create a duplicate gift record.

```typescript
async function upsertGift(tx: GivebutterTransaction): Promise<"written" | "skipped"> {
  const giftRef = db.collection("gifts").doc(`gb_${tx.id}`);
  const existing = await giftRef.get();
  if (existing.exists && existing.data()?.updatedAt >= tx.updated_at) {
    return "skipped";
  }

  const donorRef = await upsertDonor(tx.donor);

  await giftRef.set({
    donorRef,
    amountCents: tx.amount_cents,
    currency: "usd",
    source: "givebutter",
    sourceId: tx.id,
    campaign: tx.campaign_code ?? null,
    designation: tx.designation ?? null,
    tributeName: tx.tribute_name ?? null,
    tributeEmail: tx.tribute_email ?? null,
    occurredAt: new Date(tx.completed_at),
    createdAt: existing.exists ? existing.data()!.createdAt : FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  }, { merge: true });

  return "written";
}
```

Document ID uses a source prefix (`gb_` for Givebutter, `st_` for Stripe) so the same Firestore collection safely holds gifts from both sources without ID collisions.

## Donor upsert

Donors are keyed by email (lowercased, trimmed). A Stripe donor and a Givebutter donor with the same email are the same donor:

```typescript
async function upsertDonor(g: GivebutterDonor): Promise<DocumentReference> {
  const emailKey = g.email.trim().toLowerCase();
  const donorRef = db.collection("donors").doc(emailKey.replace(/[^a-z0-9]/g, "_"));

  await donorRef.set({
    email: emailKey,
    name: g.name,
    givebutterId: g.id,
    sources: FieldValue.arrayUnion("givebutter"),
    lastGiftAt: new Date(),
    updatedAt: FieldValue.serverTimestamp(),
    // firstGiftAt and totalGivenCents are maintained by a separate aggregation function
  }, { merge: true });

  return donorRef;
}
```

## Cursor tracking

The sync reads a cursor from a known Firestore doc so it only fetches transactions newer than the last successful run:

```typescript
async function getLastSyncCursor(): Promise<Date> {
  const doc = await db.collection("_sync").doc("givebutter").get();
  const data = doc.data();
  if (!data?.lastRunAt) {
    // First run: look back 30 days
    return new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  }
  return data.lastRunAt.toDate();
}

async function setLastSyncCursor(at: Date): Promise<void> {
  await db.collection("_sync").doc("givebutter").set({ lastRunAt: at }, { merge: true });
}
```

## Pagination

Givebutter's API returns pages of transactions. Always paginate to completion; never trust a single page:

```typescript
async function fetchGivebutterTransactions(since: Date, apiKey: string): Promise<GivebutterTransaction[]> {
  const results: GivebutterTransaction[] = [];
  let page = 1;
  const pageSize = 100;

  while (true) {
    const resp = await fetch(
      `https://api.givebutter.com/v1/transactions?updated_after=${since.toISOString()}&page=${page}&per_page=${pageSize}`,
      { headers: { Authorization: `Bearer ${apiKey}`, Accept: "application/json" } }
    );
    if (!resp.ok) throw new Error(`Givebutter API ${resp.status}: ${await resp.text()}`);
    const body = await resp.json() as { data: GivebutterTransaction[]; last_page: number };
    results.push(...body.data);
    if (page >= body.last_page) break;
    page++;
  }

  return results;
}
```

## Reconciliation

Once a month (first of the month), a separate Cloud Function does a full reconciliation: it fetches the last 60 days of Givebutter transactions and compares against Firestore. Any Givebutter transaction not present in Firestore is written; any Firestore gift flagged `source: "givebutter"` with no matching Givebutter record gets an ops alert.

This catches cases where the nightly sync failed silently, a retry exhausted, or a Givebutter transaction was updated retroactively.

## Alerting

Failures during sync should not fail silently. On any error or on reconciliation mismatch, the function calls `alertOps()` which sends an email via Resend to `admin@rebuiltvillage.org`:

```typescript
async function alertOps(payload: { channel: string; [key: string]: any }) {
  // Resend email via existing sendEmail handler
  await sendOpsEmail({
    subject: `[${payload.channel}] sync issue`,
    body: JSON.stringify(payload, null, 2),
  });
}
```

## Secrets

`GIVEBUTTER_API_KEY` lives in Google Secret Manager, bound to the function via `defineSecret` as shown. Never in code, never in env files.

```bash
# One-time setup
firebase functions:secrets:set GIVEBUTTER_API_KEY
```

## Hard rules

- Never run a sync against production without first running against the Firestore emulator to confirm the idempotency logic.
- Never store a Givebutter API key in the repo, in `.env`, or in a committed config file.
- Never use auto-generated Firestore document IDs for gifts. Always prefix by source.
- Never skip the reconciliation job; silent data drift is worse than a loud failure.
- Never write PII to logs. Donor emails, names, and addresses are logged only to Firestore, never to Cloud Logging.
