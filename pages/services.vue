<script setup lang="ts">
const { data: services } = await useServices();

const byCategory = computed(() => {
  const out: Record<string, typeof services.value> = {};
  for (const cat of CATEGORY_ORDER) {
    const list = (services.value ?? []).filter((s) => s.category === cat);
    if (list.length) out[cat] = list;
  }
  return out;
});

useSeoMeta({
  title: "Services - Bloom",
  description: "Cut, colour, treatments and styling. Bloom Salon, Hackney.",
});
</script>

<template>
  <main class="svc-page">
    <div class="container-narrow">
      <p class="eyebrow" style="margin-bottom: 1rem;">Price list</p>
      <h1>Services</h1>
      <p style="color: var(--muted); max-width: 36rem;">
        Prices are a guide. If your hair takes longer or needs more product,
        your stylist will tell you what it'll come to before they start.
      </p>

      <div v-for="cat in CATEGORY_ORDER" :key="cat">
        <section v-if="byCategory[cat]" class="svc-section">
          <h2 class="svc-cat">{{ CATEGORY_LABELS[cat] }}</h2>
          <div v-for="s in byCategory[cat]" :key="s.id" class="svc-row">
            <div>
              <span class="svc-name">
                {{ s.name }}
                <span v-if="s.popular" class="svc-pop">Popular</span>
              </span>
              <div class="svc-meta">
                {{ s.duration_min }} mins<span v-if="s.description">. {{ s.description }}</span>
              </div>
            </div>
            <div class="svc-price" :class="{ 'svc-price-free': s.price_nzd === 0 }">
              {{ formatNzd(s.price_nzd) }}
            </div>
          </div>
        </section>
      </div>
    </div>
  </main>
</template>
