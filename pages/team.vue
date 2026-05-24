<script setup lang="ts">
const { data: stylists } = await useStylists();
const { data: page } = await usePage("team");

useSeoMeta({
  title: () => (page.value?.title ? `${page.value.title} - Bloom` : "Team - Bloom"),
  description: "Meet the stylists at Bloom Salon, Auckland.",
});
</script>

<template>
  <main class="section">
    <div class="container">
      <p class="eyebrow" style="margin-bottom: 1rem;">{{ page?.subtitle ?? "Who's in" }}</p>
      <h1>{{ page?.title ?? "The team" }}</h1>
      <div v-if="page" class="prose" v-html="renderMarkdown(page.body)"></div>

      <div class="team-grid">
        <article v-for="s in (stylists ?? [])" :key="s.id" class="team-card">
          <div class="team-photo">
            <img v-if="s.photo" :src="s.photo" :alt="s.name" loading="lazy" />
          </div>
          <h3>{{ s.name }}</h3>
          <p v-if="s.role" class="role">{{ s.role }}</p>
          <p v-if="s.bio" class="bio">{{ s.bio }}</p>
        </article>
      </div>
    </div>
  </main>
</template>
