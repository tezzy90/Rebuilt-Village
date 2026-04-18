# Rebuilt Village — GCP Deployment Guide

Stack: **Firebase Hosting** (SPA) + **Cloud Functions v2** (API) + **GitHub Actions** (CI/CD)

---

## 1. One-Time GCP Setup

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Create your project (or use existing)
firebase projects:create rebuilt-village-prod

# Update .firebaserc with your actual project ID
# Update firebase.json CSP header: replace REPLACE_PROJECT_ID with actual project ID

# Initialize (select Hosting + Functions when prompted)
firebase init
```

---

## 2. Set Secrets in Cloud Functions

Secrets live in Google Secret Manager — never in env files.

```bash
# Stripe
firebase functions:secrets:set STRIPE_SECRET_KEY
firebase functions:secrets:set STRIPE_WEBHOOK_SECRET

# Resend
firebase functions:secrets:set RESEND_API_KEY
```

Set these environment variables (non-secret, set in `.env.local` for dev):
```
FROM_EMAIL=hello@rebuiltvillage.org
DONATION_NOTIFY_EMAIL=cortez@321work.com
```

---

## 3. Stripe Setup

1. Create a Stripe account at stripe.com
2. Go to Products → create the 8 donation tiers (4 one-time, 4 monthly)
3. Copy each Price ID into Secret Manager:
   ```bash
   firebase functions:secrets:set STRIPE_PRICE_ONE_TIME_25
   # ... etc for all 8 price IDs
   ```
4. Configure the Stripe webhook:
   - Endpoint: `https://rebuiltvillage.org/api/stripe-webhook`
   - Events to listen for: `checkout.session.completed`, `customer.subscription.deleted`, `invoice.payment_failed`
   - Copy the webhook signing secret → `firebase functions:secrets:set STRIPE_WEBHOOK_SECRET`

---

## 4. Build & Deploy

```bash
# Manual deploy
npm run build
npm --prefix functions run build
firebase deploy --project rebuilt-village-prod

# Deploy only functions (faster iteration)
firebase deploy --only functions --project rebuilt-village-prod

# Deploy only hosting
firebase deploy --only hosting --project rebuilt-village-prod
```

---

## 5. CI/CD via GitHub Actions

Continuous deployment is wired via `.github/workflows/deploy.yml`. On push to
`main` the workflow runs type-check, builds the frontend, and deploys to the
`live` channel on Firebase Hosting. On pull requests it deploys a preview
channel (7-day expiry) and comments the URL on the PR.

Required GitHub repo secret: `FIREBASE_SERVICE_ACCOUNT_REBUILT_VILLAGE_WEB`.
Generate it from a service account in the Firebase project with
`roles/firebase.hostingAdmin` and `roles/firebaseauth.admin`, then paste the
JSON into GitHub repo Settings → Secrets and variables → Actions.

No Cloud Build setup required.

---

## 6. Local Development with Emulators

```bash
# Install emulators
firebase init emulators

# Start everything
firebase emulators:start

# In a separate terminal, run the frontend with emulator proxy
VITE_USE_EMULATORS=true npm run dev
```

---

## 7. Custom Domain

```bash
# In Firebase console: Hosting → Add custom domain → rebuiltvillage.org
# Firebase will provision SSL automatically via Let's Encrypt.
# Update DNS at your registrar with the provided A records.
```

---

## 8. Post-Deploy Checklist

- [ ] Verify `/api/send-email` returns 200 in production
- [ ] Place a $1 test donation through Stripe Checkout
- [ ] Confirm tax receipt email arrives
- [ ] Confirm team notification email arrives
- [ ] Check Stripe webhook logs for `checkout.session.completed`
- [ ] Verify service worker registers (Chrome DevTools → Application → Service Workers)
- [ ] Run Lighthouse audit (target: 90+ on all 4 categories)
- [ ] Update EIN `93-XXXXXXX` placeholder in Donate.tsx, DonateSuccess.tsx, stripeWebhook.ts, and index.html
- [ ] Replace YouTube embed URL in Home.tsx with real video
- [ ] Replace partner/sponsor logos in Home.tsx sponsor bar
- [ ] Add real team headshots to About.tsx
