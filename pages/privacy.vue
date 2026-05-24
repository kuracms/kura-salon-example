<script setup lang="ts">
const { data: page } = await usePage("privacy");
useSeoMeta({
  title: () => (page.value?.title ? `${page.value.title} - Bloom` : "Privacy - Bloom"),
});
</script>

<template>
  <main class="section">
    <div class="container-narrow">
      <p class="eyebrow" style="margin-bottom: 1rem;">{{ page?.subtitle ?? "" }}</p>
      <h1>{{ page?.title ?? "Privacy" }}</h1>
      <div v-if="page" class="prose" v-html="renderMarkdown(page.body)"></div>
    </div>
  </main>
</template>
