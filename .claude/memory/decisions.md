# Architectural Decisions

Append-only log. Every meaningful technical decision gets an entry. Claude Code reads this at the start of sessions to understand why the codebase looks the way it does.

Format: short ADR (Architecture Decision Record). Keep each entry under 15 lines.

---

## ADR-001: Firebase Hosting only, remove Vercel

**Date:** 2026-04-17
**Status:** Accepted
**Context:** Project originated in Google AI Studio, deployed to Vercel, then partially migrated to Firebase. Two hosts running in parallel is operational debt.
**Decision:** Consolidate to Firebase Hosting. Delete `/api/` Vercel serverless endpoints; move all logic to Cloud Functions v2.
**Consequences:** One billing surface, one deploy pipeline, one DNS target. Loss of Vercel's edge caching is offset by Cloudflare Free in front of Firebase.

## ADR-002: FireCMS replaces Sanity

**Date:** 2026-04-17
**Status:** Accepted
**Context:** Sanity was scaffolded but never populated. Running two data stores (Sanity Content Lake + Firestore) doubles backup surface and adds a second auth system for editors.
**Decision:** Self-host FireCMS at admin.rebuiltvillage.org, backed by Firestore. Delete `/sanity/` and `/studio/` directories.
**Consequences:** Editors get a single admin UI over a single data store. Trade-off: FireCMS editor is marginally less polished than Sanity Studio. Acceptable for two editors.

## ADR-003: Givebutter for donor CRM, Stripe direct as fallback

**Date:** 2026-04-17
**Status:** Accepted
**Context:** Custom Stripe Checkout is built and working but lacks CRM, P2P fundraising, and donor acknowledgment workflows. Building these ourselves would duplicate Givebutter's work.
**Decision:** Givebutter hosts public fundraising forms with a 0% platform fee (with donor tipping) or 3% without. Stripe direct remains at `/donate` as a fallback/custom flow. Nightly Cloud Function syncs Givebutter into Firestore.
**Consequences:** Two gift sources writing into the same Firestore `gifts` collection. Document IDs prefixed by source (`gb_*`, `st_*`) to prevent collisions.

## ADR-004: Remove AI StorySpark

**Date:** 2026-04-17
**Status:** Accepted
**Context:** StorySpark is a Gemini-powered film story prompt generator, scaffolded in the original Google AI Studio deploy. It has no connection to donor acquisition, program delivery, or grant reporting.
**Decision:** Remove `/api/generate-story.ts` and all UI references.
**Consequences:** Cleaner surface area. AI investment redirected to grant drafting, donor thank-you generation, and alt-text/meta-description generation in FireCMS.

## ADR-005: GitHub Actions over Cloud Build

**Date:** 2026-04-17
**Status:** Accepted
**Context:** `cloudbuild.yaml` exists but is unwired to any active trigger. GitHub Actions gives free CI/CD on the repo we already have, with simpler configuration.
**Decision:** Delete `cloudbuild.yaml`. Configure GitHub Actions workflow for build + deploy to Firebase Hosting on push to `main`.
**Consequences:** One fewer GCP service to manage. CI logs live where the code does.

## ADR-006: Airtable Free plan for year 1

**Date:** 2026-04-17
**Status:** Accepted
**Context:** Airtable nonprofit discount is 50% off Team ($12/user/month), not free. Free plan caps at 1,000 records per base and 5 editors.
**Decision:** Start on Airtable Free. Upgrade to Team when either donor records exceed 1,000 or a sixth editor is needed, expected late year 2.
**Consequences:** Operational base separation is forced (one base per function to stay under 1,000 records each), which is actually a good organizational discipline.

---

<add new ADRs below this line, most recent at the bottom>
