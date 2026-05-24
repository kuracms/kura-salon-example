// Nuxt 3 config for the Bloom Salon demo. Runs on Cloudflare Workers via
// Nitro's cloudflare_module preset; reads from the kura REST API at build /
// request time. Content cache TTL kept short so editor publishes show up
// within a minute on the live site.

export default defineNuxtConfig({
  compatibilityDate: "2025-11-01",
  devtools: { enabled: false },
  ssr: true,
  css: ["~/assets/main.css"],
  app: {
    head: {
      title: "Bloom - hair salon on Ponsonby Road, Auckland",
      htmlAttrs: { lang: "en-NZ" },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "Hair salon on Ponsonby Road, Auckland. Cuts, colour, balayage and treatments. Book online or walk in.",
        },
      ],
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Inter:wght@300;400;500&display=swap",
        },
      ],
    },
  },
  runtimeConfig: {
    public: {
      kuraBaseUrl: "https://kuracms.com",
      kuraProject: "salon",
      kuraToken: "",
    },
  },
  nitro: {
    preset: "cloudflare_module",
  },
});
