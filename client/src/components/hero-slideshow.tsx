import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimation, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ChevronDown, ChevronLeft, ChevronRight, Camera, Heart, Image } from "lucide-react";
import { LOCAL_IMAGES, PORTFOLIO_CATEGORIES } from "@/lib/constants";
import { cn } from "@/lib/utils";

// Helper function to get random images from portfolio categories
const getRandomImages = (count: number) => {
  // Flatten all portfolio images into a single array
  const allImages = Object.values(PORTFOLIO_CATEGORIES).flat();
  const shuffled = [...allImages].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count).map(img => img.src);
};

export default function HeroSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = LOCAL_IMAGES.home;
  const [floatingImages] = useState(() => getRandomImages(12));
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

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
    <section ref={ref} className="relative h-screen overflow-hidden bg-black">
      {/* Floating small images in background */}
      {floatingImages.map((img, index) => {
        // Calculate random positions and animations for each floating image
        const size = 20 + Math.random() * 60; // Random size between 20px and 80px
        const delay = index * 0.2;
        const duration = 15 + Math.random() * 20;
        const initialX = Math.random() * 100;
        const initialY = Math.random() * 100;

        return (
          <motion.div
            key={`float-${index}`}
            className="absolute rounded-lg overflow-hidden shadow-xl z-10 opacity-40"
            style={{ width: size, height: size }}
            initial={{
              x: `${initialX}vw`,
              y: `${initialY}vh`,
              rotate: 0,
              opacity: 0
            }}
            animate={{
              x: [`${initialX}vw`, `${(initialX + 30) % 100}vw`, `${(initialX + 60) % 100}vw`, `${initialX}vw`],
              y: [`${initialY}vh`, `${(initialY + 40) % 100}vh`, `${(initialY + 20) % 100}vh`, `${initialY}vh`],
              rotate: [0, 10, -10, 0],
              opacity: [0.4, 0.6, 0.4]
            }}
            transition={{
              duration: duration,
              delay: delay,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <img src={img} alt="" className="w-full h-full object-cover" />
          </motion.div>
        );
      })}

      {/* Decorative elements */}
      <motion.div
        className="absolute top-10 left-10 text-accent/60 z-10"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <Camera className="w-16 h-16" />
      </motion.div>

      <motion.div
        className="absolute bottom-20 right-10 text-accent/60 z-10"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <Heart className="w-12 h-12" />
      </motion.div>

      <motion.div
        className="absolute top-40 right-20 text-white/40 z-10"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 1.1 }}
      >
        <Image className="w-10 h-10" />
      </motion.div>

      {/* Main background with gradient overlay - Now only on left side */}
      <div className="absolute inset-0 z-0 lg:w-1/2">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('${images[currentSlide]}')`
            }}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 1 }}
          />
        </AnimatePresence>

        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/50 z-10 lg:block hidden"></div>
      </div>

      {/* Dark overlay for mobile view */}
      <div className="absolute inset-0 bg-black/50 z-5 lg:hidden"></div>

      {/* Navigation Arrows with improved styling */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 text-white hover:text-accent transition-all hover:scale-110 lg:left-10"
        data-testid="button-prev-slide"
      >
        <motion.div
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          className="bg-black/30 backdrop-blur-sm p-3 rounded-full"
        >
          <ChevronLeft className="w-8 h-8" />
        </motion.div>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 text-white hover:text-accent transition-all hover:scale-110 lg:right-[calc(50%-1rem)]"
        data-testid="button-next-slide"
      >
        <motion.div
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          className="bg-black/30 backdrop-blur-sm p-3 rounded-full"
        >
          <ChevronRight className="w-8 h-8" />
        </motion.div>
      </button>

      {/* Slide Indicators with improved styling */}
      <div className="absolute bottom-24 left-1/4 transform -translate-x-1/2 z-20 flex space-x-3 lg:block hidden">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className="group relative"
            data-testid={`slide-indicator-${index}`}
          >
            <span className={cn(
              "block w-4 h-4 rounded-full transition-all duration-300",
              index === currentSlide ? 'bg-accent scale-100' : 'bg-white/50 scale-75 group-hover:scale-90 group-hover:bg-white/70'
            )} />
            {index === currentSlide && (
              <span className="absolute -inset-1 rounded-full border border-accent/50 animate-pulse" />
            )}
          </button>
        ))}
      </div>

      {/* Mobile slide indicators */}
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3 lg:hidden">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className="group relative"
            data-testid={`slide-indicator-mobile-${index}`}
          >
            <span className={cn(
              "block w-3 h-3 rounded-full transition-all duration-300",
              index === currentSlide ? 'bg-accent scale-100' : 'bg-white/50 scale-75 group-hover:scale-90 group-hover:bg-white/70'
            )} />
            {index === currentSlide && (
              <span className="absolute -inset-1 rounded-full border border-accent/50 animate-pulse" />
            )}
          </button>
        ))}
      </div>

      {/* Main content with improved animations - Now on right side */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="w-full lg:grid lg:grid-cols-2 flex flex-col items-center">
          {/* Empty div for image side on large screens */}
          <div className="hidden lg:block"></div>

          {/* Content side */}
          <motion.div
            className="text-white px-4 sm:px-6 lg:px-8 max-w-2xl lg:text-left text-center"
            variants={{
              hidden: { opacity: 0, x: 50 },
              visible: { opacity: 1, x: 0 }
            }}
            initial="hidden"
            animate={mainControls}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              className="mb-6 inline-block"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                type: "spring",
                stiffness: 100
              }}
            >
              <div className="w-20 h-1 bg-accent lg:mx-0 mx-auto mb-6"></div>
            </motion.div>

            <motion.h1
              className="text-5xl sm:text-6xl lg:text-7xl font-playfair font-bold mb-8"
              variants={{
                hidden: { opacity: 0, x: 50 },
                visible: { opacity: 1, x: 0 }
              }}
              initial="hidden"
              animate={mainControls}
              transition={{
                duration: 0.8,
                delay: 0.4,
                type: "spring",
                stiffness: 50
              }}
              data-testid="hero-title"
            >
              <span className="bg-gradient-to-r from-white via-accent/80 to-white bg-clip-text text-transparent">
                Capturing Moments,
              </span>
              {/* style={{ fontFamily: "'Brush Script MT', cursive" }} */}
              <span className="text-accent block mt-4 text-6xl sm:text-7xl lg:text-8xl">Creating Memories</span>
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl text-white/80 lg:max-w-xl max-w-2xl lg:mx-0 mx-auto mb-10"
              variants={{
                hidden: { opacity: 0, x: 30 },
                visible: { opacity: 1, x: 0 }
              }}
              initial="hidden"
              animate={mainControls}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              Transforming your precious moments into timeless works of art that tell your unique story
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-6 lg:justify-start justify-center mt-10"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 }
              }}
              initial="hidden"
              animate={mainControls}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <Link href="/portfolio">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-accent to-accent/80 text-accent-foreground hover:from-accent/90 hover:to-accent/70 px-10 py-6 text-lg shadow-xl rounded-full transition-transform hover:scale-105"
                  data-testid="button-view-portfolio"
                >
                  View Portfolio
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-white/70 bg-transparent text-white hover:bg-white/10 hover:text-white px-10 py-6 text-lg shadow-xl rounded-full transition-transform hover:scale-105"
                  data-testid="button-book-session"
                >
                  Book a Session
                </Button>

              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator with improved animation */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <motion.div
          className="text-white/70 hover:text-accent transition-colors cursor-pointer"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </motion.div>
    </section>
  );
}
