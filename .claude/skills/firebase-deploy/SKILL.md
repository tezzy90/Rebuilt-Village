---
name: firebase-deploy
description: Safe deployment workflow for Rebuilt Village. Covers hosting-only deploys (frequent, low risk), functions deploys (rare, requires confirmation), firestore rules deploys (rare, requires emulator test first), and multi-site deploys when the FireCMS admin site is also changing. Invoke before any firebase deploy command.
---

# Firebase Deploy Workflow

Rebuilt Village deploys to Firebase. The project ID is `rebuilt-village-web` (from `.firebaserc`). There are two hosting targets: the main site (`rebuiltvillage.org`) and the admin site (`admin.rebuiltvillage.org`).

Every Firebase deploy falls into one of four categories. Know which one you are running before you type the command.

## Category 1: Main site hosting only (the common case)

Changes to files under the main Vite app that do not touch Cloud Functions, Firestore rules, or indexes.

Pre-flight:

```bash
# From repo root
npm run build
echo "Exit code: $?"  # Must be 0
```

Confirm `dist/` exists and `dist/index.html` is present. Then deploy:

```bash
firebase deploy --only hosting:main
```

If the target is not configured, run once: `firebase target:apply hosting main rebuilt-village-web`.

Expected duration: 30-60 seconds. Verify by visiting `https://rebuiltvillage.org` and confirming the change is live.

## Category 2: Admin site hosting only

Changes to the FireCMS admin app under `/admin/`.

```bash
cd admin
npm run build
echo "Exit code: $?"  # Must be 0
cd ..
firebase deploy --only hosting:admin
```

If the admin target is not configured: `firebase target:apply hosting admin rv-admin` (assumes the `rv-admin` site has been created via `firebase hosting:sites:create rv-admin`).

## Category 3: Cloud Functions deploy

Requires explicit user confirmation in chat before running. Functions handle Stripe webhooks, donation creation, and transactional email. A bad deploy breaks donations.

Pre-flight:

```bash
cd functions
npm run build
echo "Exit code: $?"  # Must be 0
cd ..

# Review what will deploy
firebase deploy --only functions --dry-run
```

Ask user: "The following Cloud Functions will be deployed: <list from dry run>. Confirm deployment?"

On confirmation:

```bash
firebase deploy --only functions
```

After deploy, smoke test. For the donation flow specifically, run a $1 test transaction against Stripe test mode and confirm the webhook fires and writes to Firestore.

## Category 4: Firestore rules or indexes

Rules changes are high risk. A wrong rule can either lock users out of data they need or expose data they should not see.

Pre-flight:

```bash
# Run emulator tests first
firebase emulators:exec --only firestore "npm test --prefix functions"
echo "Exit code: $?"  # Must be 0
```

If no emulator tests exist, pause and ask the user whether to create them or proceed without. Never silently deploy rules without testing.

For rules only:

```bash
firebase deploy --only firestore:rules
```

For indexes only:

```bash
firebase deploy --only firestore:indexes
```

Indexes take 5-15 minutes to build. Do not expect queries requiring the new index to work immediately.

## What never to do

- Never run bare `firebase deploy` without a `--only` flag. It deploys everything, including functions, rules, and indexes simultaneously. Too much surface area.
- Never deploy functions without `npm run build` passing.
- Never deploy rules without emulator tests passing.
- Never deploy from a branch other than `main` unless the user explicitly says so.
- Never deploy with uncommitted changes in the working tree. Commit first.

## Post-deploy smoke checks

After any main site deploy:

1. `curl -sSf https://rebuiltvillage.org/ > /dev/null && echo OK` — site responds.
2. Visual spot check in browser for the changed pages.

After any functions deploy:

1. Check logs for cold-start errors: `firebase functions:log --limit 50`.
2. Trigger the changed function if possible (curl, Stripe test webhook, etc.).

After any rules deploy:

1. Confirm the rules are active: `firebase firestore:indexes` shows the expected state.
2. Test the critical path: can an unauthenticated user read public content? Can an admin write?

## Rollback

If something breaks in prod:

```bash
# For hosting, rollback to previous release via console or:
firebase hosting:clone rebuilt-village-web:live rebuilt-village-web:live --version <previous-version-id>

# For functions, redeploy previous commit:
git checkout <previous-good-sha>
cd functions && npm run build && cd ..
firebase deploy --only functions
git checkout main  # return to current branch
```

Rollback first, diagnose second. Donors see the broken site in the meantime.
