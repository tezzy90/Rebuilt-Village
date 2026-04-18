# Active Plan

**Phase:** 1 (Debloat & Consolidate)
**Owner:** Cortez
**Started:** 2026-04-18
**Target completion:** 2026-04-25

Update this file at the start of each phase. Claude Code reads it to understand what you're working on right now. When you finish a phase, archive this file to `.claude/plans/archive/phase-N-<name>.md` and write a fresh active-plan.md for the next phase.

Phase 0 prep tasks are archived at `.claude/plans/archive/phase-0-prep.md`. They continue in parallel with Phase 1; Phase 1 is not blocked on Phase 0 completion.

---

## Preconditions

- Green build baseline confirmed: `npm run build` exits 0 on `8b98259`.
- `release/pre-debloat-v1` tag created on current HEAD (step 1). Must exist before any deletion steps.
- Phase 0 tasks may run in parallel. The only Phase 1 blocker is nothing; EIN is a Phase 3 concern.

## Steps

### 1. Tag rollback anchor

`git tag release/pre-debloat-v1 && git push origin release/pre-debloat-v1`

### 2. Delete Vercel `/api/` endpoints

Remove `api/generate-story.ts` and `api/send-email.ts` per ADR-001. Cloud Functions v2 is the new home.

- Verify `functions/src/handlers/sendEmail.ts` exists. If not, port first.
- Before removing `@vercel/node`: grep `package.json` to confirm it is actually listed. Only edit `package.json` if the dep is present. If absent, log as no-op.

### 3. Remove StorySpark end-to-end

Broadened grep across the repo excluding `node_modules`, `.git`, `dist`.

a. Filename / identifier references: `generate-story`, `generateStory`, `StorySpark`, `story_spark`, `STORY_SPARK`.

b. Import/export statements for the handler: `import.*generate-story`, `from.*generate-story`, `export.*generateStory`, `require.*generate-story`, including `../api/generate-story` and `/api/generate-story`.

c. Gemini API key: `GEMINI_API_KEY`, `GOOGLE_AI_API_KEY`, `@google/generative-ai`, `@google/genai`. If StorySpark is the only consumer, remove from `.env.example`, `package.json`, `functions/.env*.example`, and docs. If another feature uses Gemini, leave plumbing and only remove StorySpark call sites.

d. UI components / buttons: `fetch.*generate-story`, `axios.*generate-story`, `api/generate-story`, `<StorySpark`, `StorySparkButton`. Remove component files, router entries, nav links, page sections.

e. Types: confirm `STORY_SPARK` is absent from `types.ts`.

f. Documentation: update only `ROADMAP.md` and `security_analysis.md` where StorySpark is described as a live feature. Do NOT touch `CLAUDE.md` or `.claude/agents/*.md` — those mentions are deliberate guardrails instructing agents never to reintroduce StorySpark. ADR-004 in `.claude/memory/decisions.md` stays as the historical record.

g. Verify: final grep. Expected matches limited to `CLAUDE.md` (guardrail list), `.claude/agents/*.md` (guardrails), and `.claude/memory/decisions.md` (ADR-004). Zero matches in source, `ROADMAP.md`, or `security_analysis.md`.

### 4. Sanity removal — staged based on import graph

Per ADR-002, `/sanity` and `/studio` are to be deleted. But the build currently emits a 100 KB `sanity-*.js` chunk, so imports exist in `src/`.

a. Audit import graph first. Greps scoped to `src/`:
  - `from ['"]@sanity/client['"]`
  - `from ['"]@sanity/image-url['"]`
  - `sanityClient`
  - `sanityService`
  - `urlFor`
  - `import.*from ['"].*sanity`

b. Report findings to Cortez before proceeding. Decision branches:
  - **Shallow (1-2 files, simple array fetches)**: replace with local stub returning hardcoded data. Delete `/sanity` and `/studio`. Remove `@sanity/*` deps from `package.json`.
  - **Deeper (image transforms, portable text, deep integration)**: leave a minimal shim in `src/services/sanityService.ts` returning hardcoded data. Delete `/sanity` and `/studio` contents. Remove `@sanity/client`/`@sanity/image-url` only if the shim no longer needs them.
  - **Very deep or risky**: defer directory deletion to Phase 2 alongside the FireCMS standup. Mark step partial; continue with remaining Phase 1 steps.

c. Do not execute any deletion under step 4 before Cortez confirms the branch.

### 5. Delete `cloudbuild.yaml`

Per ADR-005. Grep `.github/workflows/`, `README.md`, `package.json`, `docs/` for `cloudbuild`. Confirm no active Cloud Build triggers reference this file.

### 6. ~~Inline page extraction~~ — REMOVED

Already done. `App.tsx:28-29` uses `lazy()` imports of `./pages/Programs` and `./pages/Contact`. ROADMAP Phase 6 corroborates.

### 7. Delete `sketch.svg` and `potrace` dependency

Grep `index.html`, `public/`, `src/`, `package.json` for `sketch.svg` and `potrace`. Confirm zero references. Remove file and devDependency.

### 8. Fix `firebase.json` rewrites

Add rewrites for `/api/sendEmail`, `/api/createCheckoutSession`, `/api/stripeWebhook`, `/api/projectBalances` to their Cloud Functions. Keep catch-all `/index.html` rewrite last.

`/api/draftThankYou` intentionally omitted; that function does not exist yet (future Givebutter integration). Add the rewrite when the function ships.

Validate with `firebase emulators:start`: hitting a rewritten path should route to the local function.

### 9. Nav/logo Phase 1 polish

Per CLAUDE.md known-gotchas: bump logo size in `ViewfinderNav.tsx`, add visual separation from `ImpactTicker` row. Browser screenshot before/after for verification.

## Acceptance criteria

- `release/pre-debloat-v1` tag exists on `origin`.
- Zero matches for `generate-story`, `generateStory`, `STORY_SPARK`, `cloudbuild`, `sketch.svg`, `potrace` in source code under `src/`, `functions/src/`, `pages/`, `components/`. StorySpark matches permitted in: `CLAUDE.md`, `.claude/agents/*.md`, `.claude/memory/decisions.md`, `ROADMAP.md` (historical), and the plan itself.
- `/api/` directory absent.
- `cloudbuild.yaml` absent.
- `sketch.svg` absent.
- Sanity removal state matches the branch chosen in step 4b.
- `firebase.json` rewrites route 4 `/api/*` paths (`sendEmail`, `createCheckoutSession`, `stripeWebhook`, `projectBalances`) to Cloud Functions. `draftThankYou` not present.
- `npm run build` exits 0; bundle size drops proportional to the Sanity branch taken.
- `cd functions && npm run build` exits 0.
- Emulator test: hitting `/api/sendEmail` routes to the local function.
- Logo visible and separated from ticker row; screenshot confirmed.

## Rollback

Any step goes wrong: `git reset --hard release/pre-debloat-v1`. Requires explicit user confirmation per CLAUDE.md.

## Deferred to later phases

- FireCMS standup and Sanity data migration: Phase 2.
- Hero asset replacement: Phase 2 (blocked on founder asset capture).
- `/api/draftThankYou` rewrite: ship alongside Givebutter thank-you function.
- Ad Grants application: Phase 4.
- Legal review of Terms/Privacy: Phase 6.

## Notes and decisions made this phase

<add notes here as you go>
