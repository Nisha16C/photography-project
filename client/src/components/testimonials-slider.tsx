import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Star, ChevronLeft, ChevronRight, Quote, PenTool } from "lucide-react";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { LOCAL_IMAGES } from "@/lib/constants";
import ReviewDialog from "@/components/review-dialog";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0, rotate: -30 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 0.3 + i * 0.07, type: "spring", stiffness: 260, damping: 18 }}
        >
          <Star
            className={`w-5 h-5 drop-shadow-md ${
              i < rating ? "text-[hsl(38,92%,58%)] fill-current" : "text-white/20"
            }`}
          />
        </motion.div>
      ))}
    </div>
  );
}

export default function TestimonialsSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const { data: testimonials, isLoading } = useQuery({
    queryKey: ["/api/testimonials"],
    queryFn: api.testimonials.getAll,
  });

  // Guard: always a real array even if the server returns an error object
  const validTestimonials = Array.isArray(testimonials) ? testimonials : [];

  useEffect(() => {
    if (validTestimonials.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % validTestimonials.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [validTestimonials.length]);

  const next = () => {
    if (validTestimonials.length <= 1) return;
    setCurrentSlide((p) => (p + 1) % validTestimonials.length);
  };
  const prev = () => {
    if (validTestimonials.length <= 1) return;
    setCurrentSlide((p) => (p - 1 + validTestimonials.length) % validTestimonials.length);
  };

  return (
    <div className="relative overflow-hidden w-full bg-black">
      {/* Grain texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Gold glow blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-40 bg-[hsl(38,92%,58%)]/6 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-40 bg-[hsl(38,92%,58%)]/4 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-[hsl(38,92%,58%)] text-xs font-cinzel tracking-[0.35em] uppercase mb-4">
            Testimonials
          </p>
          <h2
            className="text-5xl sm:text-7xl font-bold mb-4 gradient-text-animated"
            style={{ fontFamily: "'Tangerine', cursive" }}
          >
            Client Stories
          </h2>
          <div className="section-divider mb-6 mt-3" />
          <p className="text-white/50 text-base max-w-xl mx-auto font-cormorant italic">
            Real experiences from couples and families who trusted us with their most precious moments.
          </p>

          {/* Write Review button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-8"
          >
            <ReviewDialog>
              <Button className="btn-gold px-8 py-5 rounded-full text-sm font-semibold relative overflow-hidden group">
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                <PenTool className="w-4 h-4 mr-2" />
                Write a Review
              </Button>
            </ReviewDialog>
          </motion.div>
        </motion.div>

        {/* Slider */}
        {isLoading ? (
          <div className="max-w-5xl mx-auto h-80 glass rounded-3xl animate-pulse flex items-center justify-center border border-white/5">
            <div className="text-white/30 flex flex-col items-center gap-2">
              <Star className="w-8 h-8 animate-spin" />
              <span className="text-sm font-cinzel tracking-wider">Loading stories...</span>
            </div>
          </div>
        ) : validTestimonials.length > 0 ? (
          <div className="max-w-5xl mx-auto relative">
            <div className="relative overflow-visible">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 60, filter: "blur(8px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, x: -60, filter: "blur(8px)" }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="relative"
                >
                  {/* Card */}
                  <div className="glass-gold rounded-[2rem] p-8 sm:p-12 shadow-2xl border border-[hsl(38,92%,58%)]/15 relative overflow-hidden group">
                    {/* Watermark quote */}
                    <Quote className="absolute top-6 left-6 w-24 h-24 text-[hsl(38,92%,58%)]/5 rotate-180" />
                    <Quote className="absolute bottom-6 right-6 w-16 h-16 text-[hsl(38,92%,58%)]/5" />

                    {/* Inner glow on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[2rem]"
                      style={{ background: "radial-gradient(ellipse at 50% 0%, hsla(38,92%,58%,0.08) 0%, transparent 65%)" }}
                    />

                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">
                      {/* Avatar */}
                      <div className="flex-shrink-0 relative">
                        <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-[hsl(38,92%,58%)] via-[hsl(45,100%,72%)] to-[hsl(30,70%,50%)] blur-md opacity-30 animate-glow-pulse" />
                        <img
                          src={validTestimonials[currentSlide].clientImage || LOCAL_IMAGES.testimonials[0]}
                          alt={validTestimonials[currentSlide].clientName}
                          className="w-28 h-28 sm:h-40 sm:w-40 rounded-full object-cover border-4 border-[hsl(38,92%,58%)]/30 shadow-2xl relative z-10"
                        />
                        {/* Quote badge */}
                        <div className="absolute bottom-0 right-0 bg-gradient-to-br from-[hsl(38,92%,58%)] to-[hsl(30,70%,45%)] text-black p-2 rounded-full border-4 border-black z-20 shadow-lg">
                          <Quote className="w-3.5 h-3.5 fill-current" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 text-center md:text-left min-w-0">
                        <div className="flex justify-center md:justify-start mb-5">
                          <StarRating rating={validTestimonials[currentSlide].rating} />
                        </div>

                        <blockquote
                          className="text-xl sm:text-2xl text-white/80 mb-7 font-light italic leading-relaxed break-words"
                          style={{ fontFamily: "'Cormorant Garamond', serif" }}
                        >
                          "{validTestimonials[currentSlide].body}"
                        </blockquote>

                        <div>
                          <h3 className="text-xl font-bold gradient-text-gold mb-1 break-words font-playfair">
                            {validTestimonials[currentSlide].clientName}
                          </h3>
                          <p className="text-white/40 text-xs font-cinzel tracking-widest uppercase flex items-center justify-center md:justify-start gap-2">
                            <span className="w-6 h-px bg-[hsl(38,92%,58%)]/50" />
                            {validTestimonials[currentSlide].eventType}
                            {validTestimonials[currentSlide].location && ` • ${validTestimonials[currentSlide].location}`}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Nav buttons — outside card */}
              <div className="flex justify-between mt-6 px-2">
                <motion.button
                  onClick={prev}
                  className="glass border border-white/10 p-3.5 rounded-full text-white hover:border-[hsl(38,92%,58%)]/50 hover:text-[hsl(38,92%,58%)] transition-all shadow-xl"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.92 }}
                >
                  <ChevronLeft className="w-5 h-5" />
                </motion.button>

                {/* Progress dots */}
                <div className="flex items-center gap-2">
                  {validTestimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentSlide(i)}
                      className={`rounded-full transition-all duration-500 ${
                        i === currentSlide
                          ? "w-8 h-1.5 bg-gradient-to-r from-[hsl(38,92%,58%)] to-[hsl(45,100%,72%)] shadow-[0_0_8px_hsla(38,92%,58%,0.6)]"
                          : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40"
                      }`}
                      aria-label={`Go to testimonial ${i + 1}`}
                    />
                  ))}
                </div>

                <motion.button
                  onClick={next}
                  className="glass border border-white/10 p-3.5 rounded-full text-white hover:border-[hsl(38,92%,58%)]/50 hover:text-[hsl(38,92%,58%)] transition-all shadow-xl"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.92 }}
                >
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center p-16 glass-gold rounded-[2rem] border border-[hsl(38,92%,58%)]/15 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-2 font-playfair">No stories yet</h3>
            <p className="text-white/50 text-lg mb-8 font-cormorant italic">Be the first to share your experience!</p>
            <ReviewDialog>
              <Button className="btn-gold px-8 py-3 rounded-full text-sm font-semibold">
                Write a Review
              </Button>
            </ReviewDialog>
          </div>
        )}
      </div>
    </div>
  );
}
