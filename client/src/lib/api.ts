import { apiRequest } from "./queryClient";
import type { InsertContact, Category, Photo, Service, Testimonial } from "@shared/schema";

export const api = {
  categories: {
    getAll: (): Promise<Category[]> => fetch("/api/categories").then(res => res.json())
  },

  photos: {
    getAll: (category?: string, featured?: boolean): Promise<Photo[]> => {
      const params = new URLSearchParams();
      if (category) params.set("category", category);
      if (featured !== undefined) params.set("featured", featured.toString());

      return fetch(`/api/photos?${params}`).then(res => res.json());
    }
  },

  services: {
    getAll: (): Promise<Service[]> => fetch("/api/services").then(res => res.json())
  },

  testimonials: {
    getAll: (): Promise<Testimonial[]> => fetch("/api/testimonials").then(res => res.json()),
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
