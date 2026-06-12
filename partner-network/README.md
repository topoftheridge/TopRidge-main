# TopRidge Partner Network

Private, application-based vendor coordination network for real estate professionals.

## Files Created

| File | Purpose |
|------|---------|
| `/partner-network/index.html` | Public landing page (11 sections) |
| `/partner-network/apply/index.html` | Real estate partner application form |
| `/partner-network/vendor-apply/index.html` | Vendor partner application form |
| `/portal/login/index.html` | Private partner portal login (noindex) |
| `/portal/submit/index.html` | Private client request submission (noindex) |
| `/partner-network/database-schema.sql` | PostgreSQL schema for all 3 tables |
| `/partner-network/README.md` | This file |
| `/vercel.json` | Subdomain rewrite config |

## Routes

### Public
- `/partner-network` — Landing page
- `/partner-network/apply` — Agent partner application
- `/partner-network/vendor-apply` — Vendor application

### Private (noindex, no public nav links)
- `/portal/login` — Partner portal login
- `/portal/submit` — Client request submission (requires session)

### Subdomain (planned)
- `network.top-ridge.com` → `/portal/login`
- `network.top-ridge.com/submit` → `/portal/submit`

## Database Tables

1. **`partner_applications`** — Real estate professional applications
2. **`vendor_applications`** — Vendor/service provider applications  
3. **`client_requests`** — Client service requests submitted by approved partners

See `database-schema.sql` for full schema with all fields, indexes, and status enums.

## Environment Variables Needed

For backend integration (not yet implemented):

```
DATABASE_URL=postgresql://...
SMTP_HOST=...              # For approval/notification emails
SMTP_USER=...
SMTP_PASS=...
ADMIN_EMAIL=hello@top-ridge.com
```

## Subdomain Routing (Vercel)

A `vercel.json` has been created at the project root with rewrite rules. For this to work:

1. **Add the subdomain** in Vercel dashboard → Project Settings → Domains → Add `network.top-ridge.com`
2. **DNS**: Add a CNAME record for `network` pointing to `cname.vercel-dns.com`
3. The rewrite rules in `vercel.json` map:
   - `network.top-ridge.com/` → `/portal/login/index.html`
   - `network.top-ridge.com/submit` → `/portal/submit/index.html`

**Note:** Vercel rewrites with `has` conditions (host matching) require the Pro plan or higher. On the free/Hobby plan, you may need to deploy the portal as a separate project on the subdomain instead.

### Alternative: Separate Vercel Project

If host-based rewrites aren't available:
1. Create a new Vercel project for `network.top-ridge.com`
2. Copy `/portal/login/` and `/portal/submit/` into that project
3. Update CSS/JS paths to be absolute or hosted on a CDN

## What To Configure Before Deploying

- [ ] Backend API endpoints for form submissions (partner-apply, vendor-apply, submit-request)
- [ ] Partner verification endpoint for portal login
- [ ] Email notifications for new applications and submissions
- [ ] Admin dashboard or process for reviewing applications
- [ ] Partner ID generation logic (e.g., `TR-XXXXX`)
- [ ] DNS and subdomain setup for `network.top-ridge.com`

## What Is Still Manual for MVP

- **Application review** — Someone must manually review partner and vendor applications
- **Partner ID assignment** — Manually generate and email Partner IDs to approved partners
- **Vendor matching** — Manually review client requests and assign vendors
- **Status updates** — Manually update request status in the database
- **Form data storage** — Forms currently simulate success; backend needed to actually store data
- **Portal authentication** — Currently uses sessionStorage only; no real auth or partner verification

All forms have `TODO` comments in the JavaScript indicating where to add backend `fetch()` calls.
