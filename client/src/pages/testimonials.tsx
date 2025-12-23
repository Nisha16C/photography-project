import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/lib/api";
import { LOCAL_IMAGES } from "@/lib/constants";
import type { Testimonial } from "@shared/schema";

export default function TestimonialsPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const { data: testimonials, isLoading } = useQuery({
    queryKey: ["/api/testimonials"],
    queryFn: api.testimonials.getAll,
  });

  const validTestimonials = testimonials || [];

  // Auto-slide functionality
  useEffect(() => {
    if (validTestimonials.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % validTestimonials.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [validTestimonials.length]);

  const nextSlide = () => {
    if (validTestimonials.length <= 1) return;
    setCurrentSlide((prev) => (prev + 1) % validTestimonials.length);
  };

  const prevSlide = () => {
    if (validTestimonials.length <= 1) return;
    setCurrentSlide((prev) => (prev - 1 + validTestimonials.length) % validTestimonials.length);
  };

  return (
    <div className="pt-16 min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 opacity-50" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 text-blue-400"
              style={{ fontFamily: "'Tangerine', cursive" }}
              data-testid="testimonials-page-title">
              Client Stories
            </h1>
            <div className="w-24 h-1 bg-blue-500 mx-auto mb-8 rounded-full" />
            <p className="text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed"
              data-testid="testimonials-page-subtitle">
              Real experiences from couples and families who trusted us with their most precious moments.
            </p>
          </motion.div>

          {/* Featured Testimonial Slider */}
          {isLoading ? (
            <div className="max-w-5xl mx-auto h-96 bg-gray-900/50 rounded-3xl animate-pulse flex items-center justify-center">
              <div className="text-gray-500">Loading stories...</div>
            </div>
          ) : validTestimonials.length > 0 ? (
            <div className="max-w-6xl mx-auto relative">
              <div className="relative overflow-hidden p-4 sm:p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                    className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-8 sm:p-12 shadow-2xl border border-gray-700/50 relative"
                  >
                    <Quote className="absolute top-8 left-8 w-12 h-12 text-blue-500/20" />

                    <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 relative z-10">
                      <div className="flex-shrink-0 relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
                        <img
                          src={validTestimonials[currentSlide].clientImage || LOCAL_IMAGES.testimonials[0]}
                          alt={validTestimonials[currentSlide].clientName}
                          className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-gray-800 shadow-xl relative"
                        />
                      </div>

                      <div className="flex-1 text-center md:text-left">
                        <div className="flex justify-center md:justify-start mb-4 space-x-1">
                          {Array.from({ length: validTestimonials[currentSlide].rating }).map((_, i) => (
                            <Star key={i} className="w-5 h-5 text-yellow-500 fill-current drop-shadow-md" />
                          ))}
                        </div>

                        <blockquote className="text-xl sm:text-2xl text-gray-200 mb-6 font-light italic leading-relaxed">
                          "{validTestimonials[currentSlide].body}"
                        </blockquote>

                        <div>
                          <h3 className="text-2xl font-semibold text-blue-400 mb-1">
                            {validTestimonials[currentSlide].clientName}
                          </h3>
                          <p className="text-gray-400 font-medium tracking-wide text-sm uppercase">
                            {validTestimonials[currentSlide].eventType}
                            {validTestimonials[currentSlide].location && ` • ${validTestimonials[currentSlide].location}`}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none px-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={prevSlide}
                    className="pointer-events-auto bg-black/50 hover:bg-black/80 text-white rounded-full w-12 h-12 backdrop-blur-sm border border-white/10 hover:border-blue-400/50 transition-all"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={nextSlide}
                    className="pointer-events-auto bg-black/50 hover:bg-black/80 text-white rounded-full w-12 h-12 backdrop-blur-sm border border-white/10 hover:border-blue-400/50 transition-all"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </Button>
                </div>
              </div>

              {/* Indicators */}
              <div className="flex justify-center gap-3 mt-8">
                {validTestimonials.map((_: Testimonial, index: number) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${index === currentSlide ? 'w-8 bg-blue-500' : 'w-2 bg-gray-600 hover:bg-gray-500'
                      }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center p-12 bg-gray-900/30 rounded-3xl border border-gray-800">
              <p className="text-gray-400 text-lg">No testimonials available yet. Be the first to review!</p>
            </div>
          )}
        </div>
      </section>

      {/* Grid Section */}
      <section className="py-20 bg-gray-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">More Happy Clients</h2>
            <div className="w-16 h-1 bg-blue-500/50 mx-auto rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-64 bg-gray-800 rounded-2xl animate-pulse" />
              ))
            ) : (
              validTestimonials.map((testimonial: Testimonial, index: number) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-800/40 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 hover:border-blue-500/30 transition-all hover:bg-gray-800/60 shadow-lg group"
                >
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                    ))}
                  </div>

                  <p className="text-gray-300 mb-6 text-sm leading-relaxed line-clamp-4 group-hover:line-clamp-none transition-all">
                    "{testimonial.body}"
                  </p>

                  <div className="flex items-center gap-4 mt-auto pt-4 border-t border-gray-700/50">
                    <img
                      src={testimonial.clientImage || LOCAL_IMAGES.testimonials[index % LOCAL_IMAGES.testimonials.length]}
                      alt={testimonial.clientName}
                      className="w-10 h-10 rounded-full object-cover border border-gray-600"
                    />
                    <div>
                      <h4 className="font-semibold text-white text-sm">{testimonial.clientName}</h4>
                      <p className="text-xs text-blue-400 font-medium">{testimonial.eventType}</p>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}