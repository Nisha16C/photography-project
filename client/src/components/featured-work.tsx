import { motion, useScroll, useTransform, useAnimation, useInView } from "framer-motion";
import { Link, useLocation } from "wouter";
import { LOCAL_IMAGES, PORTFOLIO_CATEGORIES } from "@/lib/constants";
import { Camera, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";

const featuredImages = Object.entries(PORTFOLIO_CATEGORIES).map(([key, imgs]) => {
  const getSrc = (i: any) => (typeof i === "string" ? i : i?.src || "");
  // Derive a friendly title for UI but keep original key for routing
  const title = key.replace(/-Img$/i, "").replace(/-/g, " ");
  return {
    key, // exact map key — use this in ?category so PortfolioGallery can match reliably
    title,
    imgs: imgs.slice(0, 4).map(getSrc),
    subtitle: `View ${title} gallery`,
  };
});

export default function FeaturedWork() {
  const [, setLocation] = useLocation();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [autoScrollActive, setAutoScrollActive] = useState(true);
  const [scrollDirection, setScrollDirection] = useState(1); // 1 for right, -1 for left
  
  // Auto-scroll functionality
  useEffect(() => {
    if (!autoScrollActive || !scrollContainerRef.current) return;
    
    const scrollContainer = scrollContainerRef.current;
    let animationFrameId: number;
    let lastTimestamp = 0;
    
    const scroll = (timestamp: number) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const elapsed = timestamp - lastTimestamp;
      
      if (elapsed > 20) { // Control scroll speed
        lastTimestamp = timestamp;
        
        // Check if we've reached the end or beginning
        if (scrollDirection > 0 && 
            scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth - 10) {
          setScrollDirection(-1);
        } else if (scrollDirection < 0 && scrollContainer.scrollLeft <= 10) {
          setScrollDirection(1);
        }
        
        scrollContainer.scrollLeft += scrollDirection * 3; // Increased scroll speed from 1 to 3
      }
      
      animationFrameId = requestAnimationFrame(scroll);
    };
    
    animationFrameId = requestAnimationFrame(scroll);
    
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [autoScrollActive, scrollDirection]);
  
  // Handle scroll events to show/hide navigation arrows
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setShowLeftArrow(scrollLeft > 20);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 20);
  };
  
  // Scroll functions for navigation buttons
  const scrollLeft = () => {
    if (!scrollContainerRef.current) return;
    setAutoScrollActive(false);
    scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };
  
  const scrollRight = () => {
    if (!scrollContainerRef.current) return;
    setAutoScrollActive(false);
    scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };
  
  // Pause auto-scroll when hovering over container
  const handleMouseEnter = () => setAutoScrollActive(false);
  const handleMouseLeave = () => setAutoScrollActive(true);
  
  return (
    <section className="py-16 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            viewport={{ once: true }}
            className="mb-2"
          >
            <div className="w-16 h-1 bg-accent mx-auto"></div>
          </motion.div>
          
          <h2 className="text-3xl sm:text-4xl font-playfair font-bold mb-4" data-testid="featured-work-title">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="inline-block"
            >
              Featured
            </motion.span>{" "}
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="inline-block text-accent"
            >
              Work
            </motion.span>
          </h2>
          
          <motion.p 
            className="text-muted-foreground text-lg max-w-2xl mx-auto" 
            data-testid="featured-work-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            A glimpse into some of our most cherished moments captured for couples and families across Madhya Pradesh.
          </motion.p>
        </motion.div>
        
        <div className="relative">
          {/* Navigation arrows */}
          {showLeftArrow && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/30 backdrop-blur-sm p-3 rounded-full text-white hover:bg-accent/80 transition-all"
              onClick={scrollLeft}
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
          )}
          
          {showRightArrow && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/30 backdrop-blur-sm p-3 rounded-full text-white hover:bg-accent/80 transition-all"
              onClick={scrollRight}
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          )}
          
          {/* Scrollable container */}
          <div 
            ref={scrollContainerRef}
            className="overflow-x-auto hide-scrollbar pb-4 pt-2"
            onScroll={handleScroll}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <div className="flex space-x-6 min-w-max px-2">
              {featuredImages.map((category, index) => (
                <motion.div
                  key={category.title}
                  className="group cursor-pointer w-80 flex-shrink-0"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.12 }}
                  viewport={{ once: false, margin: "-100px" }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  data-testid={`featured-image-${index}`}
                >
                  {/* use setLocation so Portfolio reads ?category and filters correctly */}
                  <button
                    onClick={() => setLocation(`/portfolio?category=${encodeURIComponent(category.key)}`)}
                    aria-label={`Open ${category.title} gallery`}
                    className="w-full text-left"
                  >
                    <div className="relative overflow-hidden rounded-lg aspect-[4/5] shadow-lg shadow-black/10">
                      {/* small collage of up to 4 thumbnails */}
                      <div className="grid grid-cols-2 grid-rows-2 h-full w-full">
                        {category.imgs.map((src, i) => (
                          <motion.div
                            key={i}
                            className="overflow-hidden"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.3 }}
                          >
                            <img
                              src={src || LOCAL_IMAGES.portfolio?.[0]?.src}
                              alt={`${category.title}-${i}`}
                              className={`w-full h-full object-cover transition-transform duration-500 ${i === 0 ? "group-hover:scale-110" : "opacity-95 group-hover:opacity-100"}`}
                              loading="lazy"
                            />
                          </motion.div>
                        ))}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                        <div className="text-white text-center px-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                          <h3 className="text-xl font-playfair font-semibold mb-2">{category.title}</h3>
                          <div className="flex items-center justify-center space-x-2">
                            <p className="text-sm">{category.subtitle}</p>
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                      <motion.div 
                        className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        whileHover={{ rotate: [0, 15, 0, -15, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        <div className="bg-accent/80 backdrop-blur-sm rounded-full p-2 shadow-lg">
                          <Camera className="w-5 h-5 text-white" />
                        </div>
                      </motion.div>
                    </div>
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* View all button */}
          <motion.div 
            className="mt-10 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <Link href="/portfolio">
              <motion.button 
                className="inline-flex items-center space-x-2 text-accent hover:text-accent/80 font-medium"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <span>View all categories</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
      
      {/* Add some CSS for hiding scrollbar */}
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
