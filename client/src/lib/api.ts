import { apiRequest } from "./queryClient";
import type { InsertContact, Category, Photo, Service, Testimonial } from "@shared/schema";

// Safe fetch that throws on non-2xx so React Query marks the query as error
async function safeFetch<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText);
    throw new Error(`${res.status}: ${text}`);
  }
  return res.json();
}

export const api = {
  categories: {
    getAll: (): Promise<Category[]> => safeFetch("/api/categories")
  },

  photos: {
    getAll: (category?: string, featured?: boolean): Promise<Photo[]> => {
      const params = new URLSearchParams();
      if (category) params.set("category", category);
      if (featured !== undefined) params.set("featured", featured.toString());
      return safeFetch(`/api/photos?${params}`);
    }
  },

  services: {
    getAll: (): Promise<Service[]> => safeFetch("/api/services")
  },

  testimonials: {
    getAll: (): Promise<Testimonial[]> => safeFetch("/api/testimonials"),
    submit: async (data: { name: string; rating: number; review: string; eventType?: string }) => {
      const response = await apiRequest("POST", "/api/testimonials", data);
      return response.json();
    }
  },

  contact: {
    submit: async (data: InsertContact) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    }
  }
};

