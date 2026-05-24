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
      <div class="container hero-grid">
        <div class="hero-copy">
          <p class="eyebrow hero-eyebrow">{{ page?.subtitle ?? "Ponsonby Road, Auckland" }}</p>
          <h1>{{ page?.title ?? "Bloom" }}</h1>
          <p class="hero-sub">
            Cutting, colouring and a bit of a chat since 2012. Three chairs,
            four stylists, ten minutes from the harbour.
          </p>
          <div class="hero-actions">
            <NuxtLink class="btn btn-primary" to="/book">Book online</NuxtLink>
            <a class="btn btn-ghost" href="tel:+6495550070">Or call 09 555 0070</a>
          </div>
        </div>
        <div class="hero-photos" aria-hidden="true">
          <div class="hero-photo hero-photo--coast">
            <img src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&auto=format&fit=crop&q=80" alt="" loading="eager" />
          </div>
          <div class="hero-photo hero-photo--cut">
            <img src="https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=700&auto=format&fit=crop&q=80" alt="" loading="eager" />
          </div>
          <div class="hero-photo hero-photo--colour">
            <img src="https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=700&auto=format&fit=crop&q=80" alt="" loading="eager" />
          </div>
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
            <div class="svc-price">{{ formatNzd(s.price_nzd) }}</div>
          </div>
        </div>
        <div style="margin-top: 2rem;">
          <NuxtLink class="btn btn-ghost" to="/services">Full service list</NuxtLink>
        </div>
      </div>
    </section>
  </main>
</template>
