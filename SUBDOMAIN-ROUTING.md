# Subdomain Routing — network.top-ridge.com

## Overview

Route `network.top-ridge.com` to the private partner portal pages:

- `network.top-ridge.com` → `/portal/login/index.html`
- `network.top-ridge.com/submit` → `/portal/submit/index.html`

## Vercel Configuration

### 1. Add the subdomain

In Vercel Dashboard → Project Settings → Domains, add `network.top-ridge.com`.

### 2. DNS

Add a CNAME record for `network` pointing to `cname.vercel-dns.com` (or your Vercel alias).

### 3. vercel.json rewrites

Add to your `vercel.json` in the project root:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "has": [
        {
          "type": "host",
          "value": "network.top-ridge.com"
        }
      ],
      "destination": "/portal/login/$1"
    },
    {
      "source": "/submit",
      "has": [
        {
          "type": "host",
          "value": "network.top-ridge.com"
        }
      ],
      "destination": "/portal/submit/index.html"
    }
  ]
}
```

### Alternative: Redirect approach

If rewrites don't work for your setup, use redirects instead:

```json
{
  "redirects": [
    {
      "source": "/",
      "has": [{ "type": "host", "value": "network.top-ridge.com" }],
      "destination": "https://www.top-ridge.com/portal/login",
      "permanent": false
    },
    {
      "source": "/submit",
      "has": [{ "type": "host", "value": "network.top-ridge.com" }],
      "destination": "https://www.top-ridge.com/portal/submit",
      "permanent": false
    }
  ]
}
```

### Notes

- The portal pages have `noindex, nofollow` meta tags so they won't appear in search
- Portal pages are NOT linked from the public navigation
- The subdomain approach keeps the portal URL clean and separate from the marketing site
