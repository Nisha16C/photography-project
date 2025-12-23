import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Star, ChevronLeft, ChevronRight, Quote, PenTool } from "lucide-react";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { LOCAL_IMAGES } from "@/lib/constants";
import type { Testimonial } from "@shared/schema";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function TestimonialsPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newReview, setNewReview] = useState({
    name: "",
    rating: 5,
    review: "",
    eventType: ""
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: testimonials, isLoading } = useQuery({
    queryKey: ["/api/testimonials"],
    queryFn: api.testimonials.getAll,
  });

  const submitReviewMutation = useMutation({
    mutationFn: api.testimonials.submit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/testimonials"] });
      setIsDialogOpen(false);
      setNewReview({ name: "", rating: 5, review: "", eventType: "" });
      toast({
        title: "Review Submitted! 🎉",
        description: "Thank you for sharing your experience with us.",
        className: "bg-green-600 text-white border-green-700"
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit review. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleReviewSubmit = () => {
    if (newReview.name.trim() && newReview.review.trim()) {
      submitReviewMutation.mutate(newReview);
    } else {
      toast({
        title: "Validation Error",
        description: "Please fill in your name and review.",
        variant: "destructive",
      });
    }
  };

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
    <div className="pt-16 min-h-screen bg-black text-white relative">
      {/* Dynamic Background */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black" />

      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl sm:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 animate-gradient-x"
              style={{ fontFamily: "'Tangerine', cursive" }}
              data-testid="testimonials-page-title">
              Client Stories
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto mb-8 rounded-full" />
            <p className="text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed"
              data-testid="testimonials-page-subtitle">
              Real experiences from couples and families who trusted us with their most precious moments.
            </p>

            {/* Write Review Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-8"
            >
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600/90 hover:bg-blue-600 text-white rounded-full px-8 py-6 text-lg shadow-lg shadow-blue-600/20 transition-all hover:scale-105 hover:shadow-blue-600/40 relative overflow-hidden group">
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                    <PenTool className="w-5 h-5 mr-3" />
                    Write a Review
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-black/95 border border-white/10 text-white backdrop-blur-xl sm:max-w-[500px] shadow-2xl">
                  <DialogHeader>
                    <div className="mx-auto w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-4 border border-blue-500/20">
                      <Star className="w-8 h-8 text-blue-400 fill-blue-400" />
                    </div>
                    <DialogTitle className="text-3xl text-center text-white mb-2" style={{ fontFamily: "'Tangerine', cursive" }}>Share Your Experience</DialogTitle>
                    <DialogDescription className="text-center text-gray-400">
                      We'd love to hear about your experience with us.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-6 mt-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-gray-300">Your Name</Label>
                      <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-lg opacity-20 blur transition-opacity group-hover:opacity-40" />
                        <Input
                          id="name"
                          value={newReview.name}
                          onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                          placeholder="John Doe"
                          className="bg-gray-900/80 border-white/10 text-white placeholder:text-gray-600 focus:border-blue-500/50 transition-all relative z-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-gray-300">Rating</Label>
                      <div className="flex justify-center gap-3 p-4 bg-gray-900/50 rounded-xl border border-white/5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <motion.button
                            key={star}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setNewReview({ ...newReview, rating: star })}
                            className={`focus:outline-none transition-colors ${star <= newReview.rating ? "text-yellow-400" : "text-gray-700"
                              }`}
                          >
                            <Star className={`w-8 h-8 ${star <= newReview.rating ? "fill-current" : ""}`} />
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="eventType" className="text-gray-300">Event Type <span className="text-gray-500 text-xs">(Optional)</span></Label>
                      <Input
                        id="eventType"
                        value={newReview.eventType}
                        onChange={(e) => setNewReview({ ...newReview, eventType: e.target.value })}
                        placeholder="e.g. Wedding, Pre-wedding"
                        className="bg-gray-900/80 border-white/10 text-white placeholder:text-gray-600 focus:border-blue-500/50 transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="review" className="text-gray-300">Your Review</Label>
                      <Textarea
                        id="review"
                        value={newReview.review}
                        onChange={(e) => setNewReview({ ...newReview, review: e.target.value })}
                        placeholder="Tell us what you liked..."
                        className="bg-gray-900/80 border-white/10 text-white placeholder:text-gray-600 focus:border-blue-500/50 transition-all min-h-[120px] resize-none"
                      />
                    </div>

                    <Button
                      onClick={handleReviewSubmit}
                      disabled={submitReviewMutation.isPending}
                      className="w-full bg-blue-600 hover:bg-blue-500 text-white py-6 text-lg rounded-xl transition-all shadow-lg hover:shadow-blue-600/30"
                    >
                      {submitReviewMutation.isPending ? (
                        <span className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-white rounded-full animate-bounce" />
                          <span className="w-2 h-2 bg-white rounded-full animate-bounce delay-100" />
                          <span className="w-2 h-2 bg-white rounded-full animate-bounce delay-200" />
                        </span>
                      ) : (
                        "Submit Review"
                      )}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </motion.div>
          </motion.div>

          {/* Featured Testimonial Slider */}
          {isLoading ? (
            <div className="max-w-5xl mx-auto h-96 bg-gray-900/50 rounded-3xl animate-pulse flex items-center justify-center border border-white/5">
              <div className="text-gray-500 flex flex-col items-center gap-2">
                <Star className="w-8 h-8 animate-spin" />
                <span>Loading stories...</span>
              </div>
            </div>
          ) : validTestimonials.length > 0 ? (
            <div className="max-w-6xl mx-auto relative">
              <div className="relative overflow-hidden p-4 sm:p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, x: 50, filter: "blur(10px)" }}
                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, x: -50, filter: "blur(10px)" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-gray-900/90 backdrop-blur-md rounded-[2.5rem] p-8 sm:p-12 shadow-2xl border border-white/10 relative group"
                  >
                    <Quote className="absolute top-8 left-8 w-16 h-16 text-blue-500/10 rotate-180" />

                    <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 relative z-10">
                      <div className="flex-shrink-0 relative">
                        <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition duration-1000 animate-pulse"></div>
                        <img
                          src={validTestimonials[currentSlide].clientImage || LOCAL_IMAGES.testimonials[0]}
                          alt={validTestimonials[currentSlide].clientName}
                          className="w-32 h-32 sm:w-48 sm:h-48 rounded-full object-cover border-4 border-gray-800 shadow-2xl relative z-10"
                        />
                        <div className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full border-4 border-gray-800 z-20">
                          <Quote className="w-4 h-4 fill-current" />
                        </div>
                      </div>

                      <div className="flex-1 text-center md:text-left">
                        <div className="flex justify-center md:justify-start mb-6 space-x-1">
                          {Array.from({ length: validTestimonials[currentSlide].rating }).map((_, i) => (
                            <Star key={i} className="w-6 h-6 text-yellow-500 fill-current drop-shadow-md" />
                          ))}
                        </div>

                        <blockquote className="text-xl sm:text-3xl text-gray-100 mb-8 font-light italic leading-relaxed" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                          "{validTestimonials[currentSlide].body}"
                        </blockquote>

                        <div>
                          <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-1">
                            {validTestimonials[currentSlide].clientName}
                          </h3>
                          <p className="text-gray-400 font-medium tracking-wide text-sm uppercase flex items-center justify-center md:justify-start gap-2">
                            <span className="w-8 h-[1px] bg-blue-500/50" />
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
                    className="pointer-events-auto bg-black/40 hover:bg-blue-600 text-white rounded-full w-14 h-14 backdrop-blur-md border border-white/10 hover:border-transparent transition-all shadow-lg hover:scale-110"
                  >
                    <ChevronLeft className="w-8 h-8" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={nextSlide}
                    className="pointer-events-auto bg-black/40 hover:bg-blue-600 text-white rounded-full w-14 h-14 backdrop-blur-md border border-white/10 hover:border-transparent transition-all shadow-lg hover:scale-110"
                  >
                    <ChevronRight className="w-8 h-8" />
                  </Button>
                </div>
              </div>

              {/* Indicators */}
              <div className="flex justify-center gap-3 mt-8">
                {validTestimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-1.5 rounded-full transition-all duration-500 ${index === currentSlide ? 'w-12 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'w-2 bg-gray-700 hover:bg-gray-500'
                      }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center p-16 bg-gradient-to-br from-gray-900/50 to-black/50 rounded-[2.5rem] border border-white/5 backdrop-blur-sm max-w-4xl mx-auto">
              <div className="inline-block p-6 rounded-full bg-gray-800/50 mb-6">
                <PenTool className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">No stories yet</h3>
              <p className="text-gray-400 text-lg mb-8">Be the first to share your experience with us!</p>
              <Button onClick={() => setIsDialogOpen(true)} variant="outline" className="border-blue-500/50 text-blue-400 hover:text-white hover:bg-blue-500">
                Write a Review
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Grid Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white" style={{ fontFamily: "'Playfair Display', serif" }}>More Happy Clients</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto rounded-full opacity-70" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-64 bg-gray-800/50 rounded-2xl animate-pulse border border-white/5" />
              ))
            ) : (
              validTestimonials.map((testimonial: Testimonial, index: number) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                  className="bg-gray-900/40 backdrop-blur-md p-8 rounded-3xl border border-white/5 hover:border-blue-500/30 transition-all hover:bg-gray-800/40 shadow-xl group hover:shadow-blue-900/20"
                >
                  <div className="flex items-center gap-1 mb-6 bg-black/30 w-fit px-3 py-1 rounded-full border border-white/5">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-yellow-500 fill-current" />
                    ))}
                  </div>

                  <div className="mb-8 relative">
                    <Quote className="absolute -top-2 -left-2 w-8 h-8 text-white/5 rotate-180" />
                    <p className="text-gray-300 text-sm leading-relaxed font-light tracking-wide line-clamp-4 group-hover:line-clamp-none transition-all duration-300 relative z-10">
                      "{testimonial.body}"
                    </p>
                  </div>

                  <div className="flex items-center gap-4 mt-auto pt-6 border-t border-white/5">
                    <img
                      src={testimonial.clientImage || LOCAL_IMAGES.testimonials[index % LOCAL_IMAGES.testimonials.length]}
                      alt={testimonial.clientName}
                      className="w-12 h-12 rounded-full object-cover border-2 border-gray-700 group-hover:border-blue-500 transition-colors"
                    />
                    <div>
                      <h4 className="font-bold text-white text-sm group-hover:text-blue-400 transition-colors">{testimonial.clientName}</h4>
                      <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">{testimonial.eventType}</p>
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