import { useMemo, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/lib/api";
import { LOCAL_IMAGES, PORTFOLIO_CATEGORIES } from "@/lib/constants";

// Updated Lightbox component with always-visible navigation
interface LightboxProps {
  isOpen: boolean;
  imageSrc: string;
  imageAlt: string;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

function Lightbox({ isOpen, imageSrc, imageAlt, onClose, onNext, onPrev }: LightboxProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
      {/* Close button - always visible */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors"
        style={{
          opacity: 1,
          transform: 'none',
          transition: 'background-color 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'none';
        }}
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Previous button - always visible */}
      <button
        onClick={onPrev}
        className="absolute left-4 top-1/2 z-10 text-white bg-black/50 rounded-full p-4 hover:bg-black/70"
        style={{
          opacity: 1,
          transform: 'translateY(-50%)',
          transition: 'background-color 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-50%)';
        }}
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Next button - always visible */}
      <button
        onClick={onNext}
        className="absolute right-4 top-1/2 z-10 text-white bg-black/50 rounded-full p-4 hover:bg-black/70"
        style={{
          opacity: 1,
          transform: 'translateY(-50%)',
          transition: 'background-color 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-50%)';
        }}
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Image */}
      <div className="relative max-w-5xl max-h-full">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="max-w-full max-h-screen object-contain"
        />
      </div>
    </div>
  );
}

export default function PortfolioGallery() {
  const [location, setLocation] = useLocation();
  const galleryRef = useRef<HTMLDivElement>(null);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);

  // ensure we correctly extract query string even if routing behavior changes
  const search = location && location.includes("?") ? location.split("?")[1] : "";
  const params = useMemo(() => new URLSearchParams(search), [search]);
  const rawUrlCategory = params.get("category") ? decodeURIComponent(params.get("category")!) : null;

  // Normalize helper to make matching robust (ignores case, spaces, dashes)
  const normalize = (s?: string) => (s || "").toLowerCase().replace(/[^a-z0-9]/g, "");

  // try to find the actual key in PORTFOLIO_CATEGORIES even if casing/characters differ
  const urlCategory = useMemo(() => {
    if (!rawUrlCategory) return null;
    const target = normalize(rawUrlCategory);
    // first try exact key match
    if (PORTFOLIO_CATEGORIES[rawUrlCategory]) return rawUrlCategory;
    // then try normalized match against keys
    const match = Object.keys(PORTFOLIO_CATEGORIES || {}).find((k) => normalize(k) === target);
    return match || null;
  }, [rawUrlCategory]);

  // local selected category state so UI buttons control gallery
  const [selectedCategory, setSelectedCategory] = useState<string | null>(urlCategory || null);

  // keep local selection in sync when URL changes (e.g. clicking FeaturedWork links)
  useEffect(() => {
    setSelectedCategory(urlCategory || null);
  }, [urlCategory]);

  // images is an array of { src, alt? }
  const images = useMemo(() => {
    const active = selectedCategory || urlCategory;
    if (active && PORTFOLIO_CATEGORIES[active]) return PORTFOLIO_CATEGORIES[active];
    if (active) {
      const foundKey = Object.keys(PORTFOLIO_CATEGORIES || {}).find((k) => normalize(k) === normalize(active));
      if (foundKey) return PORTFOLIO_CATEGORIES[foundKey];
    }
    return LOCAL_IMAGES.portfolio || [];
  }, [selectedCategory, urlCategory]);

  // build category list for buttons (preserve order)
  const categoryList = useMemo(() => {
    return ["All", ...Object.keys(PORTFOLIO_CATEGORIES || {})];
  }, []);

  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ["/api/categories"],
    queryFn: api.categories.getAll,
  });

  // Check if gallery is scrollable and handle scroll indicator visibility
  useEffect(() => {
    const checkScroll = () => {
      if (galleryRef.current) {
        const { scrollHeight, clientHeight, scrollTop } = galleryRef.current;
        // Show indicator only if there's more content to scroll AND user hasn't scrolled too far down
        const hasMoreContent = scrollHeight > clientHeight;
        const notScrolledTooFar = scrollTop < (scrollHeight - clientHeight) * 0.7;
        setShowScrollIndicator(hasMoreContent && notScrolledTooFar);
      }
    };

    checkScroll();
    window.addEventListener('resize', checkScroll);

    // Add scroll event listener to hide indicator when user scrolls down
    const galleryElement = galleryRef.current;
    if (galleryElement) {
      galleryElement.addEventListener('scroll', checkScroll);
    }

    return () => {
      window.removeEventListener('resize', checkScroll);
      if (galleryElement) {
        galleryElement.removeEventListener('scroll', checkScroll);
      }
    };
  }, [images]);

  const openLightbox = (src: string, index: number) => {
    setLightboxImage(src);
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  const nextImage = () => {
    const nextIndex = (lightboxIndex + 1) % images.length;
    setLightboxIndex(nextIndex);
    setLightboxImage(images[nextIndex].src);
  };

  const prevImage = () => {
    const prevIndex = lightboxIndex === 0 ? images.length - 1 : lightboxIndex - 1;
    setLightboxIndex(prevIndex);
    setLightboxImage(images[prevIndex].src);
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
                className={`masonry-item rounded-lg ${i % 3 === 0 ? "h-80" : i % 3 === 1 ? "h-96" : "h-64"
                  }`}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-background to-muted/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className=" text-3xl sm:text-4xl font-playfair font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent" data-testid="portfolio-title">
            Portfolio Gallery
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8" data-testid="portfolio-subtitle">
            Explore our diverse collection of wedding, pre-wedding, and family photography capturing life's most precious moments with artistic vision.
          </p>
        </motion.div>

        {/* Category buttons - generated from assets */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categoryList.map((cat) => {
            const isAll = cat === "All";
            const active = (isAll && !selectedCategory && !urlCategory) || (!isAll && (selectedCategory === cat || urlCategory === cat));
            return (
              <button
                key={cat}
                onClick={() => {
                  // update local state + route so selection is shareable / deep-linkable
                  const newCat = isAll ? null : cat;
                  setSelectedCategory(newCat);
                  setLocation(newCat ? `/portfolio?category=${encodeURIComponent(newCat)}` : "/portfolio", { replace: false });
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${active ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  }`}
                data-testid={`category-btn-${cat}`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Scrollable masonry gallery container */}
        <div
          ref={galleryRef}
          className="masonry-grid-container relative max-h-[70vh] overflow-y-auto scroll-smooth hide-scrollbar"
        >

          {/* Scroll indicator */}
          {showScrollIndicator && (
            <div className="sticky top-[50%] z-10 w-full flex justify-center pointer-events-none">
              <motion.div
                className="bg-accent/90 backdrop-blur-sm text-accent-foreground px-8 py-4 rounded-full shadow-lg flex items-center gap-3 pointer-events-auto cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: [0, 1, 1, 1, 0.8, 1],
                  y: 0,
                  scale: [1, 1.03, 1, 1.03, 1]
                }}
                transition={{
                  opacity: { duration: 3, repeat: Infinity, repeatDelay: 1 },
                  scale: { duration: 2, repeat: Infinity, repeatType: "reverse" }
                }}
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0 15px 30px -5px rgba(0, 0, 0, 0.2), 0 15px 15px -5px rgba(0, 0, 0, 0.1)"
                }}
                onClick={() => {
                  if (galleryRef.current) {
                    galleryRef.current.scrollBy({
                      top: 300,
                      behavior: 'smooth'
                    });
                  }
                }}
                style={{
                  boxShadow: '0 0 20px 8px rgba(var(--accent-rgb), 0.4)',
                  position: 'relative',
                }}
              >
                {/* Pulsing glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-accent/30 z-[-1]"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.7, 0.2, 0.7]
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />

                <span className="font-medium text-white text-lg">See More</span>
                <motion.div
                  className="ml-1"
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "easeInOut"
                  }}
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </motion.div>
              </motion.div>
            </div>
          )}

          {/* Masonry Gallery */}
          <motion.div
            className="masonry-grid"
            layout
          >
            <AnimatePresence>
              {images.map((image, index) => (
                <motion.div
                  key={`${selectedCategory || urlCategory || "All"}-${index}`}
                  className="masonry-item cursor-pointer group relative overflow-hidden rounded-lg"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => openLightbox((image as any).src || (image as unknown as string), index)}
                  data-testid={`gallery-item-${index}`}
                >
                  <div className="relative overflow-hidden rounded-lg shadow-lg group-hover:shadow-2xl transition-all duration-300">
                    <img
                      src={(image as any).src || (image as unknown as string)}
                      alt={(image as any).alt || `portfolio-${index}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 text-white">
                        <p className="text-sm font-medium capitalize">{/* optional category label */}</p>
                      </div>
                    </div>
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox
        isOpen={!!lightboxImage}
        imageSrc={lightboxImage || ""}
        imageAlt={images[lightboxIndex]?.alt || ""}
        onClose={closeLightbox}
        onNext={nextImage}
        onPrev={prevImage}
      />
    </section>
  );
}