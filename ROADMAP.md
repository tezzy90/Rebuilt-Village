# Rebuilt Village — Project Context & Development Roadmap

**Goal: Top 5% donor site globally · WCAG 2.1 AA compliant · CMS-driven for non-technical editors**
**Last updated: March 11, 2026**

---

## ORGANIZATION REFERENCE DATA
*Verified from Google Drive. Use this as the source of truth for all site copy.*

**Legal Identity**
- Entity: Rebuilt Village, Inc.
- Status: 501(c)(3) nonprofit — verified
- EIN: PENDING — Cortez to provide; use "On file — request via contact" until received. Set via `firebase functions:config:set ORG_EIN="xx-xxxxxxx"` once received.
- Founded: January 7, 2025 · Ocoee, Florida
- Born from: Rebuilt Minds (Orlando production company)

**Mission Statement (official)**
"Our mission is to enrich the community by telling stories through the art of film and media. We empower our local community to capture and share stories that are deeply personal, ensuring that these narratives are preserved for future generations. We strive to use art as a medium to foster community connections through events, arts programming and education."

**Vision / Tagline**
- Vision: "Rebuilding Community through Art"
- Tagline (Aaron Tanyhill): "It takes a village to tell a story, and stories to rebuild a village."

**Leadership Team**

| Name | Role |
|------|------|
| Tony Golden | Executive Director |
| Steve Kohn | President |
| Amanda Baez | Vice President |
| Kenya Fulton | Treasurer |
| Jess Ayala | Secretary |
| Aaron Tanyhill | Board Member |
| Karen Rugerio | Board Member |
| Nef Alexander | Social Media & Marketing |

**Contact / Financial**
- Email: hello@rebuiltvillage.org
- Zelle donations: donations@rebuiltvillage.com
- Instagram: @rebuiltvillage
- Facebook, YouTube: /rebuiltvillage
- Physical address: PO Box PENDING — do not publish a residential address on the site
- SAM.gov registration: In progress (needed for federal grants)
- DUNS number: Needed

**Confirmed Programs & Events**

*Night at the Cinema* — Ongoing. Student film showcase at Dr. Phillips High School Film & Television Magnet Program. Two events completed. 21 student filmmakers, 42 total participants, 107 audience members. Zip codes served: 32819, 34761, 32836. Sponsor: JC Lighting.

*Film-apalooza at Dr. Phillips* — May 15–17, 2026. Rebuilt Village is the **sponsor** (not the operator). Day 1: Senior Film Showcase with talk-back. Day 2: Workshops and industry panels. Day 3: Award ceremony + inaugural student internship passdown.

*Summer Camp Launch* — Target: July 13–24, 2026. John H. Jackson Community Center, Ocoee. Two weeks, weekdays 9 AM–3 PM. Curriculum in development. Goal: 30+ youth. Free for all students.

*John H. Jackson Community Center Classes* — Curriculum in active development. Film production, storytelling, job skills/interview prep for middle/high school students.

**Confirmed Partners**
- Dr. Phillips High School — Film & Television Magnet Program
- Rebuilt Minds — Founding production company
- JC Lighting — Night at the Cinema sponsor
- All The Line Studio — Community partner
- John H. Jackson Community Center — Ocoee venue for classes and summer camp

**Planned Events (2026 Annual Timeline)**
- 2026 April 5: Spring Cinematography Workshop at JHJCC (hardcoded in Events.tsx)
- 2026 May 15–17: Film-apalooza at Dr. Phillips HS (RV as sponsor)
- 2026 July 13–24: Summer Camp at JHJCC
- 2026 November 14: Annual Fundraising Gala (TBD venue, Ocoee/Orlando area)

**Donor Projects & Goals** (canonical IDs — must match Firestore and Donate.tsx)

| Firestore Doc ID | Title | Goal |
|---|---|---|
| `film-equipment-fund` | Film Equipment Fund | $15,000 |
| `youth-scholarship-fund` | Youth Scholarship Fund | $10,000 |
| `summer-camp-launch` | Summer Camp Launch | $25,000 |
| `film-apalooza-2026` | Film-apalooza at Dr. Phillips | $8,000 |

---

## SESSION LOG

### March 11, 2026
- **Logo assets** — Generated `logo.png` (900×700, #0A0A0A background) + `logo@2x.png` (1800×1400 retina) from `logo-dark.svg`. Both saved to `public/assets/brand/`. ViewfinderNav already points at `logo.png`.
- **Logo SVGs** — `logo-dark.svg` + `logo-light.svg` created (v5 architecture: 8 trunk strands from shared origin 450,525, unified trunk, left/center/right branch structure, gold typography).
- **Phase 5 Accessibility** — Completed `useReducedMotion` gating in 5 files: Events, Contact, DonateSuccess, Programs, ImpactDashboard. ImpactDashboard bar-chart width animation skips directly to final value when prefers-reduced. Accessibility statement page created at `/accessibility`, linked from Footer. `@axe-core/react` installed and wired in DEV mode via `import.meta.env.DEV` guard.
- **vite.config.ts** — Updated `allowedHosts: true` (Vite 6 tunneling), port set to 5173.
- **Dev preview** — Site rendered via Cloudflare tunnel. All sections confirmed rendering: hero, Radical Impact transparency, testimonials, program cards, donate CTA, partners, footer.

---

## CURRENT TECH STACK

**Frontend**
- React 19 + TypeScript + Vite + Tailwind CSS v4
- Framer Motion (with `useReducedMotion` throughout)
- React Router v6 (all routes listed below)
- `@/` path alias maps to project root (tsconfig + vite.config)
- `src/brand.ts` — single source of truth for colors, fonts, donor tiers

**Backend**
- Firebase Hosting + Cloud Functions v2 (Node 20)
- Firestore — `donor_projects` collection for live raised amounts
- Sanity CMS (configured, not yet populated)
- Stripe Checkout Sessions (metadata: fundType, projectId, tributeName, frequency)
- Resend for transactional email (tax receipts + team notifications)
- Google Secret Manager for all secrets

**Key environment variables (Secret Manager)**
- `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `RESEND_API_KEY`
- `ORG_EIN` — set this when EIN is received (used in tax receipt HTML)
- `FROM_EMAIL` (default: hello@rebuiltvillage.org)
- `DONATION_NOTIFY_EMAIL` (default: hello@rebuiltvillage.org)

---

## ALL ROUTES

| Path | Component | Status |
|------|-----------|--------|
| `/` | `Home` | ✅ Real data, fake EIN removed |
| `/about` | `About` | ✅ Real team, real year, real mission |
| `/programs` | `Programs` (standalone) | ✅ Rebuilt with 3 real programs |
| `/events` | `Events` | ✅ Real 2026 events, past/upcoming split |
| `/donate` | `Donate` | ✅ Full rebuild, live Firestore raised amounts |
| `/donate/success` | `DonateSuccess` | ✅ Project-aware, donor tier badge |
| `/contact` | `Contact` (standalone) | ✅ 8 subject options, sidebar info |
| `/faq` | `FAQ` | ✅ 16 Q&As, 4 category filters, FAQPage schema |
| `/blog` | `Blog` | ⚠️ Sanity connection exists, verify states |
| `/blog/:slug` | `PostDetail` | ⚠️ Sanity-driven, verify |
| `/board` | `Board` | 🔴 Placeholder |
| `/documents` | `Documents` | ⚠️ CSS bug fixed, still placeholder data |
| `/privacy` | `Privacy` | ✅ |
| `/terms` | `Terms` | ✅ |

---

## WHAT HAS BEEN BUILT

### Phase 1 — Foundation ✅ COMPLETE

- StorySpark / AI Studio removed from all 9 touch points
- Brand kit: gold #C9A84C primary, 7-color accent palette, `src/brand.ts` as source of truth
- Typography: Cinzel (display), Cormorant Garamond (serif), Inter (sans), Fira Code (mono)
- CSS design tokens fully rewritten in `src/index.css`
- `tailwind.config.js` rebuilt with brand palette, fonts, animations
- ViewfinderNav: fixed header, scroll-aware, mobile drawer, focus trap, progress bar
- Footer: impact stats bar, 4 nav columns, donate CTA strip, legal bar, color strip
- `Button.tsx`, `ThemeToggle.tsx` rebuilt with correct brand tokens

### Phase 3 — Donor Page ✅ COMPLETE (Firestore now live)

- `Donate.tsx`: fund selector tabs, 4 restricted projects with live Firestore raised amounts, tree-metaphor 6-tier grid, impact calculator, monthly projection, tribute toggle, employer match
- `DonateSuccess.tsx`: project-aware copy, donor tier badge
- `createCheckoutSession.ts`: accepts fundType/projectId/tributeName, routes to Stripe metadata
- `stripeWebhook.ts`: Firestore `FieldValue.increment` on restricted donations, EIN from env var, enriched team notification
- `functions/src/lib/firebase.ts`: Admin SDK singleton — import `{ db, FieldValue }` here
- `functions/src/handlers/getProjectBalances.ts`: public Cloud Function returning live raised amounts, 60s CDN cache
- `services/projectBalancesService.ts`: frontend hook `useProjectBalances(60_000)` — polls every 60s, falls back to `raisedSeed` if unreachable
- `firebase.json`: rewrite added at `/api/project-balances`

### Phase 6 — Page Rebuilds ✅ SUBSTANTIALLY COMPLETE

**All real data populated across the site. Zero fake EINs. Zero 2023 founding dates.**

- `About.tsx`: 8 real team members, Tanyhill tagline, Film-apalooza as sponsor, JHJCC summer camp, `--secondary` bug fixed
- `Home.tsx`: Est. 2025, 5 real confirmed partners, fake EIN removed
- `Footer.tsx`: Est. 2025, real impact stats (42+/2/107/85%/100%)
- `Events.tsx`: 4 upcoming + 2 past 2026 events, past/upcoming split, `border-secondary` bug fixed
- `Programs.tsx` (new standalone): 3 real programs with highlights, partner institutions section
- `Contact.tsx` (new standalone): hero + sidebar + 8 subject options, proper ARIA
- `FAQ.tsx` (new): 16 Q&As across 4 categories, animated accordion, FAQPage schema.org
- `Documents.tsx`: `text-secondary` CSS bug fixed
- `types.ts`: STORY_SPARK removed, Event interface expanded
- `Blog.tsx`: `bg="light"` fixed to `bg="dark"` (TS error resolved)
- `ViewfinderNav.tsx`: type narrowing false positive fixed

### Agentic / SEO Optimization ✅ DONE

- `public/llms.txt`: full org summary in llmstxt.org format — org identity, team, programs, events, donor projects, partners, site map
- `public/robots.txt`: explicit allow for GPTBot, ChatGPT-User, Google-Extended, PerplexityBot, Claude-Web, anthropic-ai, Applebot-Extended, cohere-ai, CCBot
- `public/sitemap.xml`: all 12 routes with changefreq + priority
- `index.html`: FAQPage JSON-LD (8 Q&As, eligible for Google rich results), Event JSON-LD (Film-apalooza + Summer Camp, eligible for Google Events carousel), `foundingDate` corrected to 2025-01-07, fake taxID removed, `<link rel="alternate" href="/llms.txt">` added
- `/faq` added to Footer Organization column and bottom legal strip

---

## WHAT IS LEFT TO DO

### Phase 2 — Homepage ⚠️ PARTIAL

| Task | Priority | Notes |
|------|----------|-------|
| Swap hero background from Unsplash to real RV footage/photos | HIGH | Unsplash image is a copyright/brand risk |
| Replace placeholder video URL with real embed | HIGH | Path: `/assets/video/village-story-v1.mp4` |
| Update hero CTA button to gold variant | MEDIUM | |
| ImpactDashboard component — verify counter values align with real data | HIGH | |
| Mission section — replace aspirational bullet points with confirmed programs | MEDIUM | |

### Phase 3 — Donor Page Remaining Items

| Task | Priority | Notes |
|------|----------|-------|
| Replace EIN placeholder once Cortez provides it | CRITICAL | Files: Donate.tsx transparency panel, index.html schema.org taxID, Footer.tsx, createCheckoutSession.ts metadata. Set `ORG_EIN` env var for tax receipts. |
| Initialize Firestore `donor_projects` collection with seed docs | HIGH | Webhook auto-creates docs on first donation; for display before first donation, seed manually in Firestore console |
| Test end-to-end donation ($1 test charge, both fund types) | CRITICAL | Cortez |
| Add Seed Planter tier ($10) back if desired | LOW | |

### Phase 4 — Sanity CMS ✅ SUBSTANTIALLY COMPLETE

Non-technical staff (Jess Ayala, Amanda Baez) can now manage content at **https://rebuilt-village.sanity.studio/**

| Task | Priority | Status |
|------|----------|--------|
| Event schema: title, date, time, location, type, registration link, featured flag | HIGH | ✅ Done — `studio/schemas/event.ts` |
| Team member schema: name, role, bio, headshot (alt required), social links | HIGH | ✅ Done — `studio/schemas/teamMember.ts` |
| Blog post schema: excerpt, category, author, SEO fields, image alt (required) | HIGH | ✅ Done — `studio/schemas/post.ts` |
| Donor project schema: title, description, goal, start date, deadline, active flag | HIGH | ✅ Done — `studio/schemas/donorProject.ts` |
| Program schema: title, description, age group, schedule, image, enrollment link | HIGH | ✅ Done — `studio/schemas/program.ts` (full upgrade) |
| Sponsor/partner schema: name, logo, website, sponsorship tier | MEDIUM | ✅ Done — `studio/schemas/sponsor.ts` |
| Board member schema: name, role, bio, term dates, headshot | MEDIUM | ✅ Done — `studio/schemas/boardMember.ts` |
| Configure role-based access (Editor vs Admin) | HIGH | 🔴 Manual step — add Jess + Amanda as Editor at sanity.io/manage > Access |
| Deploy Studio to studio.rebuiltvillage.org | HIGH | ✅ Deployed — live at https://rebuilt-village.sanity.studio/ · Custom domain pending DNS |
| Wire all schemas to frontend via `sanityService.ts` | HIGH | ✅ Done — Event, TeamMember, Post queries wired |
| Update Events, Programs, About (team) pages to pull from Sanity | HIGH | ✅ Done — Events + About wired with hardcoded fallback |

**Studio: https://rebuilt-village.sanity.studio/ · Project: `7gkqod4s` · Dataset: `production`**

**Remaining Sanity tasks:**
- ~~Wire Programs.tsx and Board.tsx to pull from Sanity~~ ✅ Done
- Enter seed content: 4 donor projects, 7 team members, 3 programs, current events

**ACTION REQUIRED — Cortez**

**1. Add Jess + Amanda as Editors (5 min)**

1. Go to: https://sanity.io/organizations/ozlmxnED7/project/7gkqod4s/access
2. Click **"Add member"**
3. Enter Jess Ayala's email → set role to **Editor**
4. Repeat for Amanda Baez

Editors can create, edit, and publish all content types but cannot change schemas or project settings (Admin only). Cortez + Tony Golden should be Admin.

**2. Point `studio.rebuiltvillage.org` to Sanity (10 min)**

Add this DNS record in your domain registrar (wherever rebuiltvillage.org DNS is managed):

```
Type:   CNAME
Name:   studio
Value:  rebuilt-village.sanity.studio
TTL:    Auto (or 3600)
```

After DNS propagates (~5–30 min), the Studio will be accessible at `studio.rebuiltvillage.org`. The `rebuilt-village.sanity.studio` URL continues to work regardless.

### Phase 5 — Accessibility (WCAG 2.1 AA) ✅ SUBSTANTIALLY COMPLETE

Legal exposure under ADA Title III. Florida standard is WCAG 2.1 AA.

**Audit date: March 2026. Conducted via static analysis across all pages.**

| Task | Priority | Status |
|------|----------|--------|
| Run static audit on all pages — document all violations | HIGH | ✅ Complete |
| Verify all color contrast meets 4.5:1 minimum | HIGH | ✅ All tokens verified (primary/text/muted) |
| Confirm zero remaining `--secondary` / `text-secondary` CSS var references | HIGH | ✅ Fixed in all pages |
| Verify skip-to-content link works on all pages | HIGH | ✅ Present in App.tsx → `#main-content` |
| All icon-only buttons have aria-labels | HIGH | ✅ Fixed VideoPlayer (play/pause, mute, fullscreen) |
| All images have meaningful alt text | HIGH | ✅ Fixed across Board, About, Card, Footer, PostDetail |
| Add `prefers-reduced-motion` to Framer Motion instances | HIGH | ✅ Fixed in 5 files: Events, Contact, DonateSuccess, Programs, ImpactDashboard |
| ImpactDashboard bar-chart width animation gated | HIGH | ✅ `initial.width` skips to final value when prefers-reduced |
| Add accessibility statement page `/accessibility` | MEDIUM | ✅ Created + wired in router + linked from Footer |
| Add axe-core to dev dependencies | MEDIUM | ✅ `@axe-core/react` installed, auto-loads in DEV mode |
| Verify focus order through donate flow | HIGH | 🟡 Manual test needed when Stripe keys are live |
| Add axe-core to CI pipeline | MEDIUM | 🔴 Deferred — no CI pipeline yet |

**Remaining known gaps (pre-launch)**
- Real headshots need alt text in Sanity headshot.alt field before going live
- Embedded video on Home page needs captions when student film content is added
- Run Lighthouse Accessibility: 100 sweep against staging URL before launch

### Phase 7 — Engagement & Trust Features ❌ NOT STARTED

These are what separate top-5% sites from average nonprofits.

| Feature | Priority | Notes |
|---------|----------|-------|
| Student Showcase — gallery of student film thumbnails with player modal | HIGH | Night at the Cinema footage is available |
| Annual Impact Report page — animated stats, not a PDF | HIGH | Year 1 data is documented |
| Alumni Outcomes — "Where are they now?" | MEDIUM | Dr. Phillips alumni are first cohort |
| Donor Recognition Wall — tiered display (opt-in) | MEDIUM | |
| Real-time giving activity — "Someone from Orlando just gave $50" | MEDIUM | |
| Corporate Sponsorship packages page — Title / Program / Community / In-Kind | MEDIUM | |
| Volunteer Portal — role listings, signup form | MEDIUM | |
| Press / Media page — coverage, press kit, media contact | LOW | |

### Phase 8 — Advanced Giving Infrastructure ❌ NOT STARTED

| Feature | Priority |
|---------|----------|
| Donor Portal — login with Google, giving history, tax receipts | MEDIUM |
| Peer-to-peer fundraising pages | MEDIUM |
| Double the Donation / employer match widget | MEDIUM |
| Giving Tuesday / Year-End campaign landing pages | MEDIUM |
| Text-to-Give via SMS shortcode | LOW |

### Phase 9 — SEO & Performance

| Task | Priority | Status |
|------|----------|--------|
| `schema.org/FAQPage` — FAQ page rich results | HIGH | ✅ Done in index.html |
| `schema.org/Event` for Film-apalooza + Summer Camp | HIGH | ✅ Done in index.html |
| `schema.org/NonprofitOrganization` — update EIN when received | HIGH | ⚠️ EIN pending |
| `schema.org/Article` on blog posts | HIGH | 🔴 Not started |
| XML sitemap | HIGH | ✅ Done at `/public/sitemap.xml` |
| llms.txt for AI agent discoverability | HIGH | ✅ Done at `/public/llms.txt` |
| robots.txt with AI crawler allowlist | HIGH | ✅ Done |
| Open Graph images per page | MEDIUM | 🔴 Not started |
| Core Web Vitals: LCP < 2.5s, CLS < 0.1 | HIGH | 🔴 Not measured |
| Lighthouse targets: Performance 90+, Accessibility 100, SEO 100 | HIGH | 🔴 Not measured |
| Submit sitemap to Google Search Console | HIGH | 🔴 Pending deploy |

---

## PRE-LAUNCH CHECKLIST

| Item | Status | Owner |
|------|--------|-------|
| Real EIN — update in Donate.tsx transparency panel, index.html schema.org, Footer.tsx, set `ORG_EIN` env var | 🔴 PENDING | Cortez |
| Real logo uploaded to `/public/assets/brand/logo.png` and `.svg` | 🟡 PARTIAL — `logo.png` (900×700, #0A0A0A bg) + `logo@2x.png` (retina) + `logo-dark.svg` + `logo-light.svg` in place. Swap when final designer SVG is ready. | Cortez |
| PO Box obtained and added to Footer/Contact | 🔴 PENDING | Cortez |
| Team headshots uploaded — swap `/assets/brand/placeholder-team.png` | 🔴 PENDING | Jess/Tony |
| Stripe Price IDs set in Secret Manager (all 12: 6 once + 6 monthly) | 🔴 PENDING | Cortez |
| Test donation end-to-end ($1 test, general + each restricted project) | 🔴 PENDING | Cortez |
| Verify tax receipt email sends correctly via Resend | 🔴 PENDING | Cortez |
| Seed `donor_projects` Firestore docs (or they auto-create on first donation) | 🟡 OPTIONAL | Dev |
| Real GCP project ID in `firebase.json` CSP header (replace `REPLACE_PROJECT_ID`) | 🔴 PENDING | Cortez |
| Social media URLs verified and live (Instagram confirmed @rebuiltvillage) | 🟡 PARTIAL | Nef |
| SAM.gov + DUNS registration complete | 🔴 PENDING | Tony/Amanda |
| axe-core audit — zero critical violations | ✅ Static audit complete · Run Lighthouse against staging URL | Dev |
| Lighthouse 90+ on all key pages | 🔴 PENDING | Dev |
| Sanity Studio deployed, Jess + Amanda trained | ✅ Deployed at https://rebuilt-village.sanity.studio/ · Add users as Editor, then train | Dev + Jess |
| Real event data entered in Sanity | 🔴 PENDING — Studio is live, Jess can start entering | Jess |
| Google Search Console — submit sitemap | 🔴 PENDING | Dev/Cortez |
| Google Analytics + GA4 verified | 🔴 PENDING | Nef |
| Google for Nonprofits activation | ✅ COMPLETE | Tony |

---

## CURRENT FILE STATUS

| File | State |
|------|-------|
| `pages/Home.tsx` | ✅ Real year, real partners, fake EIN removed. Hero footage/video still placeholder |
| `pages/Accessibility.tsx` | ✅ New — WCAG 2.1 AA conformance statement, known gaps, feedback contact, HHS OCR complaint link |
| `pages/About.tsx` | ✅ Real team (8), real year (2025), Tanyhill tagline, Film-apalooza accurate. Placeholder headshots remain |
| `pages/Programs.tsx` | ✅ Standalone page — 3 real programs, highlights, partner section, enroll CTA |
| `pages/Events.tsx` | ✅ 4 upcoming + 2 past 2026 events, past/upcoming split, real dates/venues, CSS bug fixed |
| `pages/Donate.tsx` | ✅ Full rebuild — live Firestore raised amounts via `useProjectBalances` hook. EIN shows "On file" |
| `pages/DonateSuccess.tsx` | ✅ Project-aware copy, donor tier badge |
| `pages/Contact.tsx` | ✅ Standalone — hero, sidebar info, 8 subject options, ARIA-complete form |
| `pages/FAQ.tsx` | ✅ 16 Q&As, 4 category tabs, animated accordion, FAQPage schema |
| `pages/Blog.tsx` | ⚠️ Sanity connection exists — verify loading/empty states |
| `pages/Board.tsx` | 🔴 Placeholder — needs Sanity schema |
| `pages/Documents.tsx` | ⚠️ CSS bug fixed (`text-secondary` → `text-[#2DBFA0]`). Still placeholder data |
| `pages/Privacy.tsx` | ✅ |
| `pages/Terms.tsx` | ✅ |
| `components/Footer.tsx` | ✅ Real stats, FAQ in nav columns and legal strip. EIN placeholder |
| `components/ViewfinderNav.tsx` | ✅ Fully rebuilt, TS error fixed |
| `src/brand.ts` | ✅ Source of truth — colors, fonts, donor tiers, program accent styles |
| `src/index.css` | ✅ Full token rewrite |
| `tailwind.config.js` | ✅ Brand palette, fonts, animations |
| `types.ts` | ✅ STORY_SPARK removed, Event interface expanded (registrationUrl, featured, sponsoredBy, accentColor, tags, dateEnd) |
| `index.html` | ✅ FAQPage + Event JSON-LD, corrected foundingDate (2025-01-07), fake taxID removed, llms.txt link |
| `App.tsx` | ✅ All pages lazy-loaded. Inline Programs/Contact components removed. |
| `functions/src/index.ts` | ✅ Exports: sendEmail, createCheckoutSession, stripeWebhook, getProjectBalances |
| `functions/src/lib/firebase.ts` | ✅ Admin SDK singleton — `db` + `FieldValue` |
| `functions/src/handlers/createCheckoutSession.ts` | ✅ fundType, projectId, tributeName in metadata |
| `functions/src/handlers/stripeWebhook.ts` | ✅ Firestore increment, EIN from env var, enriched notifications |
| `functions/src/handlers/getProjectBalances.ts` | ✅ Public endpoint, 60s CDN cache |
| `services/projectBalancesService.ts` | ✅ `useProjectBalances(intervalMs)` hook with polling + fallback |
| `services/sanityClient.ts` | ✅ Project ID set (`7gkqod4s`), dataset `production`, wired |
| `services/sanityService.ts` | ✅ SanityEvent, SanityTeamMember, SanityPost interfaces + getEvents/getTeamMembers/getPosts/getPostBySlug queries |
| `sanity/schemas/event.ts` | ✅ Full schema — date, time, location, type, featured, tags, registration, preview |
| `sanity/schemas/teamMember.ts` | ✅ Full schema — name, role, bio, headshot (alt required), order, social links, active flag |
| `sanity/schemas/post.ts` | ✅ Upgraded — excerpt, category, SEO object, image alt required |
| `sanity/schemas/index.ts` | ✅ Exports event, teamMember, post, program |
| `sanity/sanity.config.ts` | ✅ Studio config with structured nav, projectId `7gkqod4s` — ready for `npx sanity deploy` |
| `firebase.json` | ✅ All 5 rewrites including `/api/project-balances`. CSP has placeholder GCP project ID |
| `public/sitemap.xml` | ✅ All 12 routes |
| `public/llms.txt` | ✅ Full org summary for AI agents |
| `public/robots.txt` | ✅ AI crawler allowlist + sitemap ref |
| `public/assets/brand/logo.png` | ✅ 900×700, #0A0A0A background — rendered from logo-dark.svg |
| `public/assets/brand/logo@2x.png` | ✅ 1800×1400 retina version |
| `public/assets/brand/logo-dark.svg` | ✅ v5 — unified trunk base, 8 branch strands, gold typography |
| `public/assets/brand/logo-light.svg` | ✅ v5 — white background variant |
| `vite.config.ts` | ✅ `allowedHosts: true`, port 5173 |

---

## RECOMMENDED NEXT BUILD SEQUENCE

1. **Sanity CMS schemas** — biggest unlocker. Jess/Amanda can't manage content until this is done. Start with Event + TeamMember schemas.
2. **Student Showcase page** — highest donor trust signal. Night at the Cinema footage is already on hand.
3. **Annual Impact Report page** — Year 1 data exists in Drive. Turn it into an animated web page.
4. **Board.tsx** — connect to Sanity board member schema, quick win.
5. **Homepage hero** — real footage/photo from Tony/Nef to replace Unsplash placeholder.
6. **Accessibility audit** — axe-core sweep before any external promotion.
7. **Pre-launch blocklist** — EIN + headshots + Stripe test charge = go-live.
