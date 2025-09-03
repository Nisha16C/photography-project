import { 
  type Category, type Photo, type Service, type Testimonial, type Contact,
  type InsertCategory, type InsertPhoto, type InsertService, type InsertTestimonial, type InsertContact
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Categories
  getCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;

  // Photos
  getPhotos(categoryId?: string, featured?: boolean): Promise<Photo[]>;
  getPhotoById(id: string): Promise<Photo | undefined>;
  createPhoto(photo: InsertPhoto): Promise<Photo>;

  // Services
  getServices(): Promise<Service[]>;
  getServiceBySlug(slug: string): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;

  // Testimonials
  getTestimonials(approved?: boolean): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;

  // Contacts
  getContacts(): Promise<Contact[]>;
  createContact(contact: InsertContact): Promise<Contact>;
}

export class MemStorage implements IStorage {
  private categories: Map<string, Category> = new Map();
  private photos: Map<string, Photo> = new Map();
  private services: Map<string, Service> = new Map();
  private testimonials: Map<string, Testimonial> = new Map();
  private contacts: Map<string, Contact> = new Map();

  constructor() {
    this.seedData();
  }

  private seedData() {
    // Seed categories
    const categoryData: InsertCategory[] = [
      { name: "Wedding", slug: "wedding", description: "Complete wedding photography", order: 1 },
      { name: "Pre-Wedding", slug: "pre-wedding", description: "Romantic pre-wedding shoots", order: 2 },
      { name: "Engagement", slug: "engagement", description: "Engagement ceremonies", order: 3 },
      { name: "Haldi", slug: "haldi", description: "Traditional haldi ceremonies", order: 4 },
      { name: "Mehndi", slug: "mehndi", description: "Beautiful mehndi celebrations", order: 5 },
      { name: "Baby Shower", slug: "baby-shower", description: "Joyful baby shower moments", order: 6 },
      { name: "Maternity", slug: "maternity", description: "Elegant maternity photography", order: 7 },
      { name: "Family", slug: "family", description: "Cherished family portraits", order: 8 },
      { name: "Corporate", slug: "corporate", description: "Professional corporate events", order: 9 },
    ];

    categoryData.forEach(cat => {
      const id = randomUUID();
      this.categories.set(id, { ...cat, id });
    });

    // Seed services
    const serviceData: InsertService[] = [
      {
        title: "Complete Wedding",
        slug: "complete-wedding",
        description: "Full wedding coverage from pre-wedding to reception",
        basePrice: 45000,
        features: [
          "Pre-wedding shoot",
          "Haldi & Mehndi coverage", 
          "Wedding ceremony & reception",
          "500+ edited photos",
          "Online gallery & USB drive"
        ],
        isPopular: true,
        order: 1
      },
      {
        title: "Pre-Wedding Shoot",
        slug: "pre-wedding-shoot", 
        description: "Romantic couple photography session",
        basePrice: 15000,
        features: [
          "4-6 hour photo session",
          "Multiple location options",
          "100+ edited photos",
          "Online gallery access",
          "High-resolution downloads"
        ],
        order: 2
      },
      {
        title: "Family & Events",
        slug: "family-events",
        description: "Family portraits and special events",
        basePrice: 12000,
        features: [
          "Baby shower coverage",
          "Maternity shoots", 
          "Family portraits",
          "Corporate events",
          "Flexible packages"
        ],
        order: 3
      }
    ];

    serviceData.forEach(service => {
      const id = randomUUID();
      this.services.set(id, { ...service, id });
    });

    // Seed testimonials
    const testimonialData: InsertTestimonial[] = [
      {
        clientName: "Priya & Rahul",
        eventType: "Wedding",
        rating: 5,
        body: "Himanshu captured our wedding beautifully! Every photo tells a story and the emotions are so genuine. His professionalism and attention to detail made our special day even more memorable.",
        clientImage: "https://images.unsplash.com/photo-1464207687429-7505649dae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
        isApproved: true
      },
      {
        clientName: "Sneha Sharma", 
        eventType: "Baby Shower",
        rating: 5,
        body: "Amazing work on our baby shower! Himanshu made everyone feel comfortable and captured such natural, beautiful moments. The photos are absolutely perfect and we'll treasure them forever.",
        clientImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
        isApproved: true
      },
      {
        clientName: "Anjali & Vikash",
        eventType: "Pre-Wedding", 
        rating: 5,
        body: "Our pre-wedding shoot was absolutely magical! Himanshu's creative vision and guidance helped us feel relaxed and natural. The locations and lighting were perfect.",
        clientImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
        isApproved: true
      }
    ];

    testimonialData.forEach(testimonial => {
      const id = randomUUID();
      this.testimonials.set(id, { 
        ...testimonial, 
        id, 
        createdAt: new Date()
      });
    });
  }

  // Categories
  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values()).sort((a, b) => a.order - b.order);
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(cat => cat.slug === slug);
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = randomUUID();
    const category: Category = { ...insertCategory, id };
    this.categories.set(id, category);
    return category;
  }

  // Photos
  async getPhotos(categoryId?: string, featured?: boolean): Promise<Photo[]> {
    let photos = Array.from(this.photos.values());
    
    if (categoryId) {
      photos = photos.filter(photo => photo.category === categoryId);
    }
    
    if (featured !== undefined) {
      photos = photos.filter(photo => photo.isFeatured === featured);
    }
    
    return photos.sort((a, b) => a.order - b.order);
  }

  async getPhotoById(id: string): Promise<Photo | undefined> {
    return this.photos.get(id);
  }

  async createPhoto(insertPhoto: InsertPhoto): Promise<Photo> {
    const id = randomUUID();
    const photo: Photo = { 
      ...insertPhoto, 
      id, 
      createdAt: new Date()
    };
    this.photos.set(id, photo);
    return photo;
  }

  // Services
  async getServices(): Promise<Service[]> {
    return Array.from(this.services.values()).sort((a, b) => a.order - b.order);
  }

  async getServiceBySlug(slug: string): Promise<Service | undefined> {
    return Array.from(this.services.values()).find(service => service.slug === slug);
  }

  async createService(insertService: InsertService): Promise<Service> {
    const id = randomUUID();
    const service: Service = { ...insertService, id };
    this.services.set(id, service);
    return service;
  }

  // Testimonials
  async getTestimonials(approved?: boolean): Promise<Testimonial[]> {
    let testimonials = Array.from(this.testimonials.values());
    
    if (approved !== undefined) {
      testimonials = testimonials.filter(testimonial => testimonial.isApproved === approved);
    }
    
    return testimonials.sort((a, b) => 
      new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    );
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = randomUUID();
    const testimonial: Testimonial = { 
      ...insertTestimonial, 
      id, 
      createdAt: new Date()
    };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }

  // Contacts
  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values()).sort((a, b) => 
      new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    );
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = randomUUID();
    const contact: Contact = { 
      ...insertContact, 
      id, 
      status: "new",
      createdAt: new Date()
    };
    this.contacts.set(id, contact);
    return contact;
  }
}

export const storage = new MemStorage();
