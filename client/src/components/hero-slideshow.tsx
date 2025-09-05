import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { LOCAL_IMAGES } from "@/lib/constants";

export default function HeroSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = LOCAL_IMAGES.home;

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);
    
    return () => clearInterval(timer);
  }, [images.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Image Carousel */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ 
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('${images[currentSlide]}')`
            }}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 1 }}
          />
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 text-white hover:text-accent transition-colors"
        data-testid="button-prev-slide"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 text-white hover:text-accent transition-colors"
        data-testid="button-next-slide"
      >
        <ChevronRight className="w-8 h-8" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-accent' : 'bg-white/50'
            }`}
            data-testid={`slide-indicator-${index}`}
          />
        ))}
      </div>
      
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center text-white px-4 sm:px-6 lg:px-8">
          <motion.h1 
            className="text-4xl sm:text-5xl lg:text-7xl font-playfair font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            data-testid="hero-title"
          >
            <span className="bg-gradient-to-r from-white to-accent bg-clip-text text-transparent">
              Capturing Moments,
            </span>
            <span className="text-accent block mt-2">Creating Memories</span>
          </motion.h1>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link href="/portfolio">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-accent to-accent/80 text-accent-foreground hover:from-accent/90 hover:to-accent/70 px-8 py-3 text-base shadow-lg"
                data-testid="button-view-portfolio"
              >
                View Portfolio
              </Button>
            </Link>
            <Link href="/contact">
              <Button 
                variant="outline" 
                size="lg"
                className="bg-gradient-to-r from-accent to-accent/80 text-accent-foreground hover:from-accent/90 hover:to-accent/70 px-8 py-3 text-base shadow-lg"
                data-testid="button-book-session"
              >
                Book a Session
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="text-white">
          <ChevronDown className="w-6 h-6" />
        </div>
      </motion.div>
    </section>
  );
}
