// Read-only typed client for the kura public REST API.
// All endpoints are GET; the public-readonly token is set via runtime config.

import { marked } from "marked";

export interface KuraListResponse<T> {
  data: T[];
  meta: { count: number; limit: number; offset: number };
}

export interface Page {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  body: string;
  published?: boolean;
  published_at: string | null;
}

export interface Service {
  id: string;
  slug: string;
  name: string;
  category: "cut" | "colour" | "treatment" | "styling";
  duration_min: number;
  price_gbp: number;
  description?: string;
  photo?: string | null;
  popular?: boolean;
  published?: boolean;
  published_at: string | null;
}

export interface Stylist {
  id: string;
  slug: string;
  name: string;
  role?: string;
  bio?: string;
  photo?: string | null;
  instagram?: string | null;
  published?: boolean;
  published_at: string | null;
}

async function kuraFetch<T>(path: string): Promise<T> {
  const cfg = useRuntimeConfig().public;
  const url = `${cfg.kuraBaseUrl}/api/v1/${cfg.kuraProject}${path}`;
  const res = await $fetch<T>(url, {
    headers: { Authorization: `Bearer ${cfg.kuraToken}` },
  });
  return res;
}

export function usePage(slug: string) {
  return useAsyncData(`page-${slug}`, async () => {
    const r = await kuraFetch<KuraListResponse<Page>>(`/page?limit=10`);
    return r.data.find((p) => p.slug === slug && p.published) ?? null;
  });
}

export function useServices() {
  return useAsyncData("services", async () => {
    const r = await kuraFetch<KuraListResponse<Service>>(`/service?limit=50`);
    return r.data.filter((s) => s.published);
  });
}

export function useStylists() {
  return useAsyncData("stylists", async () => {
    const r = await kuraFetch<KuraListResponse<Stylist>>(`/stylist?limit=20`);
    return r.data.filter((s) => s.published);
  });
}

export function renderMarkdown(md: string): string {
  return marked.parse(md, { async: false }) as string;
}

export function formatGbp(n: number): string {
  if (n === 0) return "Free";
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(n);
}

export const CATEGORY_LABELS: Record<Service["category"], string> = {
  cut: "Cut & finish",
  colour: "Colour",
  treatment: "Treatment",
  styling: "Styling",
};

export const CATEGORY_ORDER: Service["category"][] = ["cut", "colour", "treatment", "styling"];
