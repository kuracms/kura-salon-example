<script setup lang="ts">
useSeoMeta({
  title: "Visit us - Bloom",
  description: "Bloom Salon, 124 Ponsonby Road, Auckland. Tue-Sat 9-7.",
});
</script>

<template>
  <main class="section">
    <div class="container-narrow">
      <p class="eyebrow" style="margin-bottom: 1rem;">Visit</p>
      <h1>Pop in</h1>

      <p style="color: var(--muted); max-width: 36rem;">
        We're on Ponsonby Road, opposite the SPQR end of the strip and a
        ten-minute walk from the Wynyard waterfront. Look for the rose-pink
        shopfront and the kelpie at the window.
      </p>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 2.5rem; margin-top: 3rem;">
        <div>
          <p class="eyebrow" style="margin-bottom: 0.6rem;">Address</p>
          <p style="margin: 0;">124 Ponsonby Road<br />Auckland 1011</p>
        </div>
        <div>
          <p class="eyebrow" style="margin-bottom: 0.6rem;">Hours</p>
          <p style="margin: 0;">
            Tue-Fri 9-7<br />
            Sat 9-6<br />
            Sun &amp; Mon closed
          </p>
        </div>
        <div>
          <p class="eyebrow" style="margin-bottom: 0.6rem;">Get in touch</p>
          <p style="margin: 0;">
            <a href="tel:+6495554070">09 555 4070</a><br />
            <a href="mailto:kiaora@bloomsalon.example">kiaora@bloomsalon.example</a>
          </p>
        </div>
      </div>
    </div>
  </main>
</template>
