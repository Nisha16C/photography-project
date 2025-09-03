import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Lightbox from "./lightbox";
import { api } from "@/lib/api";
import { dummyImages } from "@/assets/dummy-images";
import type { Category } from "@shared/schema";

const allImages = [
  ...dummyImages.wedding,
  ...dummyImages.preWedding,
  ...dummyImages.family,
  ...dummyImages.maternity
];

const filters = [
  { label: "All", value: "all" },
  { label: "Wedding", value: "wedding" },
  { label: "Pre-Wedding", value: "pre-wedding" },
  { label: "Engagement", value: "engagement" },
  { label: "Haldi", value: "haldi" },
  { label: "Mehndi", value: "mehndi" },
  { label: "Baby Shower", value: "baby-shower" },
  { label: "Family", value: "family" }
];

export default function PortfolioGallery() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ["/api/categories"],
    queryFn: api.categories.getAll,
  });

  const filteredImages = activeFilter === "all" 
    ? allImages 
    : allImages.filter(img => img.category === activeFilter);

  const openLightbox = (src: string, index: number) => {
    setLightboxImage(src);
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  const nextImage = () => {
    const nextIndex = (lightboxIndex + 1) % filteredImages.length;
    setLightboxIndex(nextIndex);
    setLightboxImage(filteredImages[nextIndex].src);
  };

  const prevImage = () => {
    const prevIndex = lightboxIndex === 0 ? filteredImages.length - 1 : lightboxIndex - 1;
    setLightboxIndex(prevIndex);
    setLightboxImage(filteredImages[prevIndex].src);
  };

  if (categoriesLoading) {
    return (
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Skeleton className="h-12 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-20" />
            ))}
          </div>
          <div className="masonry-grid">
            {Array.from({ length: 9 }).map((_, i) => (
              <Skeleton 
                key={i} 
                className={`masonry-item rounded-lg ${
                  i % 3 === 0 ? "h-80" : i % 3 === 1 ? "h-96" : "h-64"
                }`} 
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-playfair font-bold mb-4" data-testid="portfolio-title">
            Portfolio
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8" data-testid="portfolio-subtitle">
            Explore our diverse collection of wedding, pre-wedding, and family photography capturing life's most precious moments.
          </p>
          
          {/* Category Filters */}
          <motion.div 
            className="flex flex-wrap justify-center gap-2 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {filters.map((filter) => (
              <Button
                key={filter.value}
                variant={activeFilter === filter.value ? "default" : "secondary"}
                size="sm"
                onClick={() => setActiveFilter(filter.value)}
                className={
                  activeFilter === filter.value
                    ? "bg-accent text-accent-foreground"
                    : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }
                data-testid={`filter-${filter.value}`}
              >
                {filter.label}
              </Button>
            ))}
          </motion.div>
        </motion.div>
        
        {/* Masonry Gallery */}
        <motion.div 
          className="masonry-grid"
          layout
        >
          <AnimatePresence>
            {filteredImages.map((image, index) => (
              <motion.div
                key={`${activeFilter}-${index}`}
                className="masonry-item cursor-pointer"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => openLightbox(image.src, index)}
                data-testid={`gallery-item-${index}`}
              >
                <img 
                  src={image.src}
                  alt={image.alt}
                  className="w-full rounded-lg hover:shadow-lg transition-shadow duration-300"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <Lightbox
        isOpen={!!lightboxImage}
        imageSrc={lightboxImage || ""}
        imageAlt={filteredImages[lightboxIndex]?.alt || ""}
        onClose={closeLightbox}
        onNext={nextImage}
        onPrev={prevImage}
      />
    </section>
  );
}
