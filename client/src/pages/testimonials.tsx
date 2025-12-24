import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Star, Quote, PenTool } from "lucide-react";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { LOCAL_IMAGES } from "@/lib/constants";
import type { Testimonial } from "@shared/schema";
import ReviewDialog from "@/components/review-dialog";

export default function TestimonialsPage() {
  const { data: testimonials, isLoading } = useQuery({
    queryKey: ["/api/testimonials"],
    queryFn: api.testimonials.getAll,
  });

  const validTestimonials = testimonials || [];

  return (
    <div className="pt-24 min-h-screen bg-black text-white relative overflow-hidden">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-black to-black" />

      {/* Hero / Header Section */}
      <section className="pb-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-24"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* <h2 className="text-4xl md:text-5xl font-light text-blue-300 mb-4 opacity-80" style={{ fontFamily: "'Tangerine', cursive" }}>
              Love Notes
            </h2> */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-8 text-white tracking-tight leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              Stories of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Connection</span>
            </h1>
            <div className="w-1 h-20 bg-gradient-to-b from-blue-500/50 to-transparent mx-auto rounded-full mb-8" />

            {/* Write Review Button - Elegant Stlye */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <ReviewDialog>
                <Button variant="outline" className="group text-lg px-8 py-6 rounded-full border-blue-500/30 text-blue-300 hover:text-white hover:bg-blue-600/20 hover:border-blue-500 transition-all duration-500 backdrop-blur-sm">
                  <PenTool className="w-4 h-4 mr-3 group-hover:rotate-12 transition-transform duration-500" />
                  <span className="font-light tracking-wide">Share Your Story</span>
                </Button>
              </ReviewDialog>
            </motion.div>
          </motion.div>

          {/* 2-Column Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24 max-w-6xl mx-auto">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-6 animate-pulse opacity-50">
                  <div className="w-32 h-32 rounded-full bg-gray-800" />
                  <div className="w-full h-32 bg-gray-800/50 rounded-lg" />
                </div>
              ))
            ) : (
              validTestimonials.map((testimonial: Testimonial, index: number) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="flex flex-col items-center text-center group"
                >
                  {/* Image with Glow */}
                  <div className="relative mb-8">
                    <div className="absolute inset-0 bg-blue-500 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-700" />
                    <div className="w-32 h-32 rounded-full p-1.5 border border-white/10 relative z-10 backdrop-blur-sm group-hover:scale-105 transition-transform duration-700">
                      <img
                        src={testimonial.clientImage || LOCAL_IMAGES.testimonials[index % LOCAL_IMAGES.testimonials.length]}
                        alt={testimonial.clientName}
                        className="w-full h-full rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                      />
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-6 justify-center">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-blue-400 fill-current opacity-70" />
                    ))}
                  </div>

                  {/* Text */}
                  <div className="relative mb-6 px-4 w-full">
                    <Quote className="absolute -top-4 -left-2 w-8 h-8 text-white/5 rotate-180" />
                    <p className="text-xl text-gray-200 leading-relaxed font-light relative z-10 break-words"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                      "{testimonial.body}"
                    </p>
                  </div>

                  {/* Client Info */}
                  <div className="w-full px-4">
                    <h4 className="text-lg font-bold text-white mb-1 break-words" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {testimonial.clientName}
                    </h4>
                    <p className="text-xs text-blue-300 font-medium uppercase tracking-[0.2em] opacity-80">
                      {testimonial.eventType}
                    </p>
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