<script setup lang="ts">
const { data: page } = await usePage("visit");
useSeoMeta({
  title: () => (page.value?.title ? `${page.value.title} - Bloom` : "Visit - Bloom"),
  description: "Bloom Salon, 124 Ponsonby Road, Auckland. Tue-Sat 9-7.",
});
</script>

<template>
  <main class="section">
    <div class="container-narrow">
      <p class="eyebrow" style="margin-bottom: 1rem;">{{ page?.subtitle ?? "Visit" }}</p>
      <h1>{{ page?.title ?? "Pop in" }}</h1>

      <div v-if="page" class="prose" v-html="renderMarkdown(page.body)"></div>

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
            <a href="tel:+6495550070">09 555 0070</a><br />
            <a href="mailto:kiaora@bloomsalon.example">kiaora@bloomsalon.example</a>
          </p>
        </div>
      </div>
    </div>
  </main>
</template>
