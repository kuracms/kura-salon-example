<script setup lang="ts">
const { data: page } = await usePage("home");
const { data: services } = await useServices();

const popular = computed(() => (services.value ?? []).filter((s) => s.popular).slice(0, 4));

useSeoMeta({
  description: () =>
    page.value?.subtitle ?? "Independent hair salon in Hackney. Book online or walk in.",
});
</script>

<template>
  <main>
    <section class="hero">
      <div class="container">
        <p class="eyebrow hero-eyebrow">{{ page?.subtitle ?? "Hackney, east London" }}</p>
        <h1>{{ page?.title ?? "Bloom" }}</h1>
        <p class="hero-sub">
          Cutting, colouring and a bit of a chat since 2012. Three chairs, four
          stylists, no airs.
        </p>
        <div class="hero-actions">
          <a class="btn btn-primary" href="tel:+442081234567">Call to book</a>
          <NuxtLink class="btn btn-ghost" to="/services">See our services</NuxtLink>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container-narrow">
        <p class="eyebrow" style="margin-bottom: 1rem;">About</p>
        <div v-if="page" class="prose" v-html="renderMarkdown(page.body)"></div>
      </div>
    </section>

    <section v-if="popular.length" class="section" style="background: var(--bg-soft);">
      <div class="container">
        <header class="section-head">
          <p class="eyebrow" style="margin-bottom: 0.7rem;">Most booked</p>
          <h2>What people come in for</h2>
        </header>
        <div class="svc-section" style="margin-top: 0;">
          <div v-for="s in popular" :key="s.id" class="svc-row">
            <div>
              <span class="svc-name">{{ s.name }}</span>
              <div class="svc-meta">{{ s.duration_min }} mins. {{ s.description }}</div>
            </div>
            <div class="svc-price">{{ formatGbp(s.price_gbp) }}</div>
          </div>
        </div>
        <div style="margin-top: 2rem;">
          <NuxtLink class="btn btn-ghost" to="/services">Full service list</NuxtLink>
        </div>
      </div>
    </section>
  </main>
</template>
