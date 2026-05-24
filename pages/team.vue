<script setup lang="ts">
const { data: stylists } = await useStylists();

useSeoMeta({
  title: "Team - Bloom",
  description: "Meet the stylists at Bloom Salon, Hackney.",
});
</script>

<template>
  <main class="section">
    <div class="container">
      <p class="eyebrow" style="margin-bottom: 1rem;">Who's in</p>
      <h1>The team</h1>
      <p style="color: var(--muted); max-width: 36rem;">
        Three chairs, four stylists. We rotate so there's always someone in,
        and we always tell you who you're booked with so you can request them
        next time.
      </p>

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
