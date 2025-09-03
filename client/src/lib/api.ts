import { apiRequest } from "./queryClient";
import type { InsertContact } from "@shared/schema";

export const api = {
  categories: {
    getAll: () => fetch("/api/categories").then(res => res.json())
  },
  
  photos: {
    getAll: (category?: string, featured?: boolean) => {
      const params = new URLSearchParams();
      if (category) params.set("category", category);
      if (featured !== undefined) params.set("featured", featured.toString());
      
      return fetch(`/api/photos?${params}`).then(res => res.json());
    }
  },

  services: {
    getAll: () => fetch("/api/services").then(res => res.json())
  },

  testimonials: {
    getAll: () => fetch("/api/testimonials").then(res => res.json())
  },

  contact: {
    submit: async (data: InsertContact) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    }
  }
};
