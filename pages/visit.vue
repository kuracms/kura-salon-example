<script setup lang="ts">
useSeoMeta({
  title: "Visit us - Bloom",
  description: "Bloom Salon, 47 Mare Street, Hackney. Tue-Sat 9-7.",
});
</script>

<template>
  <main class="section">
    <div class="container-narrow">
      <p class="eyebrow" style="margin-bottom: 1rem;">Visit</p>
      <h1>Pop in</h1>

      <p style="color: var(--muted); max-width: 36rem;">
        We're a five-minute walk from London Fields station, on the corner
        opposite the pub. Look for the rose-pink shopfront.
      </p>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 2.5rem; margin-top: 3rem;">
        <div>
          <p class="eyebrow" style="margin-bottom: 0.6rem;">Address</p>
          <p style="margin: 0;">47 Mare Street<br />London E8 4RP</p>
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
            <a href="tel:+442081234567">020 8123 4567</a><br />
            <a href="mailto:hello@bloomsalon.example">hello@bloomsalon.example</a>
          </p>
        </div>
      </div>
    </div>
  </main>
</template>
