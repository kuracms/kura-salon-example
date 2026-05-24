# Bloom Salon (kura demo, Nuxt 3)

Example Nuxt 3 site reading from a [kura](https://kuracms.com) content backend. An independent east-London hair salon at [salon.kuracms.com](https://salon.kuracms.com).

Showcases:

- A `page` content type (home, privacy, terms) edited as markdown in kura - so editors can change every part of the website, not just the price list
- A `service` content type for the bookable price list, grouped by category
- A `stylist` content type for the team page
- SSR on Cloudflare Workers via Nuxt 3's `cloudflare_module` Nitro preset

## Develop

```bash
npm install
npm run dev
```

`nuxt dev` reads the same `NUXT_PUBLIC_KURA_*` env vars; set them in a `.env` file for local development or rely on the values in `wrangler.jsonc` for Workers deploys.

## Deploy

```bash
npm run deploy
```

Routes traffic from `salon.kuracms.com` to the worker via wrangler's custom-domain binding.
