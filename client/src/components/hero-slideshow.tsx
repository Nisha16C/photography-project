import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Link } from "wouter";
import { ChevronDown, ChevronLeft, ChevronRight, Camera } from "lucide-react";
import { LOCAL_IMAGES } from "@/lib/constants";

const SLIDE_DURATION = 6000; // ms

// Character-by-character text reveal
function CharReveal({ text, delay = 0, className = "", style }: { text: string; delay?: number; className?: string; style?: React.CSSProperties }) {
  return (
    <span className={className} style={style} aria-label={text}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 20, rotateX: -40 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            delay: delay + i * 0.025,
            duration: 0.45,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ transformOrigin: "bottom" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

export default function HeroSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const images = LOCAL_IMAGES.home;
  const sectionRef = useRef<HTMLElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Parallax
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [0, 0.7]);

  // Auto-slide with progress bar
  useEffect(() => {
    if (isHovered) return;
    setProgress(0);
    const startTime = Date.now();

    const tick = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min((elapsed / SLIDE_DURATION) * 100, 100);
      setProgress(pct);
      if (elapsed >= SLIDE_DURATION) {
        setCurrentSlide((prev) => (prev + 1) % images.length);
        clearInterval(tick);
      }
    }, 30);

    intervalRef.current = tick;
    return () => clearInterval(tick);
  }, [currentSlide, isHovered, images.length]);

  const goTo = (idx: number) => {
    setCurrentSlide(idx);
    setProgress(0);
  };
  const prev = () => goTo((currentSlide - 1 + images.length) % images.length);
  const next = () => goTo((currentSlide + 1) % images.length);

  const slideNum = String(currentSlide + 1).padStart(2, "0");
  const totalNum = String(images.length).padStart(2, "0");

  return (
    <section
      ref={sectionRef}
      className="relative h-screen min-h-[600px] overflow-hidden bg-black"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background slides — full bleed */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${images[currentSlide]}')` }}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1.0 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
      </AnimatePresence>

      {/* Dark vignette overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20 z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/30 z-10" />

      {/* Scroll-driven extra overlay */}
      <motion.div
        className="absolute inset-0 bg-black z-10 pointer-events-none"
        style={{ opacity: overlayOpacity }}
      />

      {/* Slide counter — top right */}
      <motion.div
        className="absolute top-24 right-8 z-30 text-white/60 text-xs font-cinzel tracking-[0.25em] flex flex-col items-end gap-1"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <span className="text-[hsl(38,92%,58%)] text-2xl font-bold">{slideNum}</span>
        <span className="w-px h-8 bg-white/30 self-center" />
        <span>{totalNum}</span>
      </motion.div>

      {/* Decorative camera icon */}
      <motion.div
        className="absolute top-24 left-8 z-30 text-[hsl(38,92%,58%)]/40"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, type: "spring", stiffness: 100 }}
        style={{ y: textY }}
      >
        <Camera className="w-10 h-10" />
      </motion.div>

      {/* Main content */}
      <div className="relative z-20 flex items-center justify-center h-full">
        <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center lg:text-left">
          <motion.div style={{ y: textY }}>
            {/* Pre-headline */}
            <motion.div
              className="flex items-center gap-3 mb-6 lg:justify-start justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <span className="h-px w-10 bg-[hsl(38,92%,58%)]" />
              <span className="text-[hsl(38,92%,58%)] text-xs font-cinzel tracking-[0.35em] uppercase">
                Wedding & Lifestyle Photography
              </span>
              <span className="h-px w-10 bg-[hsl(38,92%,58%)]" />
            </motion.div>

            {/* Main headline — character reveal (re-runs per slide) */}
            <AnimatePresence mode="wait">
              <motion.h1
                key={`title-${currentSlide}`}
                className="mb-8 leading-none"
                data-testid="hero-title"
              >
                <CharReveal
                  text="Capturing Moments,"
                  delay={0.4}
                  className="block text-white text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold drop-shadow-lg"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                />
                <CharReveal
                  text="Creating Memories"
                  delay={0.9}
                  className="block gradient-text-animated text-6xl sm:text-7xl lg:text-8xl xl:text-9xl mt-2"
                  style={{ fontFamily: "'Great Vibes', cursive" }}
                />
              </motion.h1>
            </AnimatePresence>

            {/* Sub-text */}
            <motion.p
              className="text-white/70 text-base sm:text-lg lg:text-xl max-w-xl lg:mx-0 mx-auto mb-10 font-cormorant italic leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.7 }}
            >
              Transforming your precious moments into timeless works of art that tell your unique story
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 lg:justify-start justify-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.9, duration: 0.7 }}
            >
              <Link href="/portfolio">
                <motion.span
                  className="btn-gold px-10 py-4 rounded-full text-base font-semibold inline-block cursor-pointer shadow-xl"
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.96 }}
                  data-testid="button-view-portfolio"
                >
                  View Portfolio
                </motion.span>
              </Link>
              <Link href="/contact">
                <motion.span
                  className="px-10 py-4 rounded-full text-base font-semibold inline-block cursor-pointer border-2 border-white/40 text-white hover:border-[hsl(38,92%,58%)] hover:text-[hsl(38,92%,58%)] transition-all duration-300 backdrop-blur-sm"
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.96 }}
                  data-testid="button-book-session"
                >
                  Book a Session
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prev}
        className="absolute left-5 top-1/2 -translate-y-1/2 z-30 group"
        data-testid="button-prev-slide"
        aria-label="Previous slide"
      >
        <motion.div
          className="glass border border-white/10 p-3 rounded-full text-white group-hover:border-[hsl(38,92%,58%)]/50 group-hover:text-[hsl(38,92%,58%)] transition-all"
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft className="w-6 h-6" />
        </motion.div>
      </button>
      <button
        onClick={next}
        className="absolute right-5 top-1/2 -translate-y-1/2 z-30 group"
        data-testid="button-next-slide"
        aria-label="Next slide"
      >
        <motion.div
          className="glass border border-white/10 p-3 rounded-full text-white group-hover:border-[hsl(38,92%,58%)]/50 group-hover:text-[hsl(38,92%,58%)] transition-all"
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRight className="w-6 h-6" />
        </motion.div>
      </button>

      {/* Slide indicators + progress */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-4">
        {/* Dot indicators */}
        <div className="flex gap-3">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="relative group"
              data-testid={`slide-indicator-${i}`}
              aria-label={`Go to slide ${i + 1}`}
            >
              <span
                className={`block rounded-full transition-all duration-500 ${
                  i === currentSlide
                    ? "w-8 h-1.5 bg-[hsl(38,92%,58%)]"
                    : "w-1.5 h-1.5 bg-white/30 group-hover:bg-white/60"
                }`}
              />
              {/* Active pulse ring */}
              {i === currentSlide && (
                <motion.span
                  className="absolute -inset-1.5 rounded-full border border-[hsl(38,92%,58%)]/40"
                  animate={{ opacity: [0.6, 0, 0.6], scale: [1, 1.4, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom progress bar */}
      <div className="absolute bottom-0 left-0 right-0 z-30 h-[3px] bg-white/10">
        <motion.div
          className="h-full bg-gradient-to-r from-[hsl(38,92%,58%)] to-[hsl(45,100%,72%)] origin-left"
          style={{ scaleX: progress / 100 }}
          transition={{ duration: 0 }}
        />
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-20 left-8 z-30 hidden lg:block"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex flex-col items-center gap-2 text-white/40 group cursor-pointer hover:text-white/70 transition-colors">
          <span className="text-[10px] font-cinzel tracking-[0.3em] uppercase rotate-90 origin-center mb-4">Scroll</span>
          <ChevronDown className="w-4 h-4" />
        </div>
      </motion.div>
    </section>
  );
}
