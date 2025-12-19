# Rebuilt Village: Security and Cost Analysis

This document outlines the security measures implemented and the projected costs for the backend services integrated into the Rebuilt Village website.

## 1. Security Architecture

### Gemini API (AI StorySpark)
- **Mechanism**: Proxied via a Vercel Serverless Function (`/api/generate-story`).
- **Security**: The `GEMINI_API_KEY` is never exposed to the client. It resides in Vercel's environment variables and is only accessible during the server-side execution of the function.
- **Access Control**: Currently allows requests from the deployed domain.

### Email Services (Resend)
- **Mechanism**: Proxied via a Vercel Serverless Function (`/api/send-email`).
- **Security**: The `RESEND_API_KEY` is kept server-side. Form validation is performed before transmission.
- **Spam Prevention**: Basic honeypot techniques can be added if needed, but Resend handles much of the deliverability security.

### Content Management (Sanity CMS)
- **Mechanism**: Secure API fetching via `@sanity/client`.
- **Security**: 
    - **CORS**: Restricted to `http://localhost:3000` and the production Vercel URL.
    - **API Tokens**: If private datasets are used, tokens are stored in Vercel environment variables.
- **Protection**: Data is fetched as JSON, preventing many typical CMS vulnerabilities.

---

## 2. Cost Analysis (Projected)

We have prioritized services with generous free tiers to keep operational costs at or near **$0/month** for a small-to-medium nonprofit.

| Service | Purpose | Free Tier Limit | Expected Monthly Cost |
| :--- | :--- | :--- | :--- |
| **Vercel** | Hosting & Serverless | 100GB Bandwidth / 1M Executions | **$0.00** |
| **Sanity CMS** | Content Management | 500k API Requests / 5GB Assets | **$0.00** |
| **Resend** | Transactional Email | 3,000 emails/month | **$0.00** |
| **Gemini API**| AI StorySpark | 60 requests/min (Free tier) | **$0.00** |
| **GitHub** | Code Repository | Unlimited Public/Private | **$0.00** |
| **Google Analytics**| Tracking | Unlimited (Standard) | **$0.00** |
| **TOTAL** | | | **$0.00 / mo** |

### Potential Future Costs:
1. **Custom Domain**: ~$12 - $20 annually (e.g., `rebuiltvillage.org`).
2. **Resend Pro**: If you exceed 3,000 emails/month (~$20/mo).
3. **Vercel Pro**: Only needed if you require team features or exceed generous bandwidth limits (~$20/user/mo).

---

## 3. Best Practices Implemented
- **Environment Variables**: Modern `import.meta.env` (Vite) and `process.env` (Vercel) separation.
- **HTTPS Enforcement**: All external assets and API calls use secure protocols.
- **GDPR/CCPA Compliance**: Included cookie consent banner and structured privacy policy placeholders.
- **Error Boundaries**: Prevents the whole app from crashing if one service fails.

## 4. Maintenance Recommendations
1. **Regular Updates**: Periodically run `npm update` to keep dependencies secure.
2. **Content Backups**: Sanity keeps history, but consider exporting content periodically.
3. **API Key Rotation**: If you suspect a leak, rotate keys in Vercel settings immediately.
