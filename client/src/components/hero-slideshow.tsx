import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ChevronDown } from "lucide-react";
import { DUMMY_IMAGES } from "@/lib/constants";

export default function HeroSlideshow() {
  return (
    <section className="relative h-screen overflow-hidden">
      <div className="hero-slideshow absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${DUMMY_IMAGES.hero}')` }}
        />
      </div>
      
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center text-white px-4 sm:px-6 lg:px-8">
          <motion.h1 
            className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            data-testid="hero-title"
          >
            Capturing Life's Most
            <span className="text-accent block mt-2">Beautiful Moments</span>
          </motion.h1>
          
          <motion.p 
            className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto opacity-90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            data-testid="hero-subtitle"
          >
            Professional wedding and event photography that tells your unique story through stunning visuals and heartfelt emotions.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link href="/portfolio">
              <Button 
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-3 text-base"
                data-testid="button-view-portfolio"
              >
                View Portfolio
              </Button>
            </Link>
            <Link href="/contact">
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white hover:text-primary px-8 py-3 text-base"
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
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
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
