<script setup lang="ts">
const route = useRoute();

const { data: services } = await useServices();
const { data: stylists } = await useStylists();

const preselectSlug = computed(() => {
  const q = route.query.service;
  return typeof q === "string" ? q : Array.isArray(q) ? q[0] : "";
});

const form = reactive({
  serviceSlug: "",
  stylistSlug: "",
  date: "",
  time: "",
  name: "",
  phone: "",
  email: "",
});

watchEffect(() => {
  if (!form.serviceSlug && services.value?.length) {
    const match = (services.value ?? []).find((s) => s.slug === preselectSlug.value);
    form.serviceSlug = match?.slug ?? services.value[0].slug;
  }
});

const times = ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

const dateOptions = computed(() => {
  const out: { value: string; label: string }[] = [];
  const today = new Date();
  for (let i = 1; i <= 30; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    const value = `${yyyy}-${mm}-${dd}`;
    const label = d.toLocaleDateString("en-NZ", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
    out.push({ value, label });
  }
  return out;
});

const submitted = ref(false);
const confirmation = ref({
  name: "",
  phone: "",
  serviceName: "",
  stylistName: "",
  date: "",
  time: "",
});

function selectedServiceName(): string {
  const s = (services.value ?? []).find((x) => x.slug === form.serviceSlug);
  return s?.name ?? "your appointment";
}

function selectedStylistName(): string {
  if (!form.stylistSlug) return "No preference";
  const s = (stylists.value ?? []).find((x) => x.slug === form.stylistSlug);
  return s?.name ?? "No preference";
}

function prettyDate(value: string): string {
  if (!value) return "";
  const opt = dateOptions.value.find((d) => d.value === value);
  return opt?.label ?? value;
}

function onSubmit(e: Event) {
  e.preventDefault();
  confirmation.value = {
    name: form.name,
    phone: form.phone,
    serviceName: selectedServiceName(),
    stylistName: selectedStylistName(),
    date: prettyDate(form.date),
    time: form.time,
  };
  submitted.value = true;
  if (typeof window !== "undefined") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

useSeoMeta({
  title: "Book an appointment - Bloom",
  description: "Request an appointment at Bloom Salon, Auckland. We'll call to confirm.",
});
</script>

<template>
  <main class="book-page">
    <div class="container-narrow">
      <p class="eyebrow" style="margin-bottom: 1rem;">Appointments</p>
      <h1>Book a chair</h1>
      <p style="color: var(--muted); max-width: 36rem;">
        Tell us what you're after and when suits. We'll call to confirm the same day.
      </p>

      <div v-if="!submitted" class="book-card">
        <form @submit="onSubmit" class="book-form">
          <div class="field">
            <label for="service">Service</label>
            <select id="service" v-model="form.serviceSlug" required>
              <option
                v-for="s in (services ?? [])"
                :key="s.id"
                :value="s.slug"
              >
                {{ s.name }} - {{ s.duration_min }} mins
              </option>
            </select>
          </div>

          <div class="field">
            <label for="stylist">Stylist</label>
            <select id="stylist" v-model="form.stylistSlug">
              <option value="">No preference</option>
              <option
                v-for="s in (stylists ?? [])"
                :key="s.id"
                :value="s.slug"
              >
                {{ s.name }}<span v-if="s.role"> - {{ s.role }}</span>
              </option>
            </select>
          </div>

          <div class="field-row">
            <div class="field">
              <label for="date">Date</label>
              <select id="date" v-model="form.date" required>
                <option value="" disabled>Choose a day</option>
                <option
                  v-for="d in dateOptions"
                  :key="d.value"
                  :value="d.value"
                >
                  {{ d.label }}
                </option>
              </select>
            </div>
            <div class="field">
              <label for="time">Time</label>
              <select id="time" v-model="form.time" required>
                <option value="" disabled>Choose a time</option>
                <option v-for="t in times" :key="t" :value="t">{{ t }}</option>
              </select>
            </div>
          </div>

          <div class="field">
            <label for="name">Your name</label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              autocomplete="name"
              required
            />
          </div>

          <div class="field-row">
            <div class="field">
              <label for="phone">Phone</label>
              <input
                id="phone"
                v-model="form.phone"
                type="tel"
                autocomplete="tel"
                required
              />
            </div>
            <div class="field">
              <label for="email">Email</label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                autocomplete="email"
                required
              />
            </div>
          </div>

          <button type="submit" class="btn btn-primary book-submit">
            Request appointment
          </button>
        </form>
      </div>

      <div v-else class="book-confirm">
        <p class="eyebrow" style="margin-bottom: 1rem; color: var(--accent-strong);">
          Request received
        </p>
        <h2>Thanks, {{ confirmation.name }}.</h2>
        <p>
          We've got your request for
          <strong>{{ confirmation.serviceName }}</strong>
          with <strong>{{ confirmation.stylistName }}</strong>
          on <strong>{{ confirmation.date }}</strong> at
          <strong>{{ confirmation.time }}</strong>.
        </p>
        <p>
          We'll call <strong>{{ confirmation.phone }}</strong> within the day to confirm.
        </p>
        <div style="margin-top: 2rem;">
          <NuxtLink class="btn btn-ghost" to="/">Back to home</NuxtLink>
        </div>
      </div>

      <p class="book-disclaimer">
        <em>
          This is a demo - your appointment won't actually be booked. Built on
          <a href="https://kuracms.com">kura</a>.
        </em>
      </p>
    </div>
  </main>
</template>

<style scoped>
.book-page {
  padding: 4rem 0 5rem;
}
.book-card {
  margin-top: 2.5rem;
  background: #ffffff;
  border: 1px solid var(--line);
  border-radius: 14px;
  padding: 2rem 2rem 2.2rem;
  box-shadow: 0 24px 60px -32px rgba(70, 36, 26, 0.22);
}
.book-form {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}
.field {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  flex: 1;
}
.field label {
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: var(--muted);
  font-weight: 500;
}
.field input,
.field select {
  font-family: inherit;
  font-size: 1rem;
  color: var(--ink);
  background: var(--bg);
  border: 1px solid var(--line-strong);
  border-radius: 8px;
  padding: 0.75rem 0.9rem;
  transition: border-color 0.15s, box-shadow 0.15s;
  appearance: none;
  -webkit-appearance: none;
}
.field select {
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'><path fill='%238a6c64' d='M6 8L0 0h12z'/></svg>");
  background-repeat: no-repeat;
  background-position: right 0.95rem center;
  padding-right: 2.2rem;
}
.field input:focus,
.field select:focus {
  outline: none;
  border-color: var(--accent-strong);
  box-shadow: 0 0 0 3px rgba(192, 138, 107, 0.18);
}
.field-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.2rem;
}
@media (max-width: 540px) {
  .field-row {
    grid-template-columns: 1fr;
  }
}
.book-submit {
  margin-top: 0.6rem;
  align-self: flex-start;
}
.book-confirm {
  margin-top: 2.5rem;
  background: #ffffff;
  border: 1px solid var(--line);
  border-radius: 14px;
  padding: 2.4rem 2rem;
  box-shadow: 0 24px 60px -32px rgba(70, 36, 26, 0.22);
}
.book-confirm h2 {
  margin-top: 0;
}
.book-disclaimer {
  margin-top: 2.5rem;
  color: var(--faint);
  font-size: 0.85rem;
  text-align: center;
}
.book-disclaimer a {
  color: var(--faint);
  text-decoration: underline;
}
.book-disclaimer a:hover {
  color: var(--muted);
}
</style>
