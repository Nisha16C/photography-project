import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Star, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import type { Testimonial } from "@shared/schema";

export default function Testimonials() {
  const { data: testimonials, isLoading } = useQuery({
    queryKey: ["/api/testimonials"],
    queryFn: api.testimonials.getAll,
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newReview, setNewReview] = useState({
    name: "",
    rating: 5,
    review: ""
  });

  // Auto-play carousel
  useEffect(() => {
    if (!testimonials || testimonials.length === 0) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [testimonials]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    if (!testimonials || testimonials.length === 0) return;
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      const next = prev + newDirection;
      if (next < 0) return testimonials.length - 1;
      if (next >= testimonials.length) return 0;
      return next;
    });
  };

  const handleReviewSubmit = () => {
    if (newReview.name.trim() && newReview.review.trim()) {
      // In a real app, this would submit to the backend
      console.log("New review submitted:", newReview);
      setIsDialogOpen(false);
      setNewReview({ name: "", rating: 5, review: "" });
      // Show success message
      alert("Thank you for your review! It will be published after moderation.");
    }
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Skeleton className="h-12 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="max-w-4xl mx-auto">
            <Skeleton className="h-96 rounded-lg" />
          </div>
        </div>
      </section>
    );
  }

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-black relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/10 to-black pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-blue-400" style={{ fontFamily: "'Tangerine', cursive", fontWeight: 700 }} data-testid="testimonials-title">
            What Clients Say
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-6" style={{ fontFamily: 'Cormorant Garamond, serif' }} data-testid="testimonials-subtitle">
            Read testimonials from couples and families who have trusted us to capture their most precious moments.
          </p>

          {/* Add Review Button */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Write a Review
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900 border-blue-500/30 text-white">
              <DialogHeader>
                <DialogTitle className="text-2xl text-blue-400" style={{ fontFamily: 'Cinzel, serif' }}>Share Your Experience</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="name" className="text-white/90">Your Name</Label>
                  <Input
                    id="name"
                    value={newReview.name}
                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                    placeholder="Enter your name"
                    className="bg-gray-800 border-blue-500/30 text-white"
                  />
                </div>
                <div>
                  <Label className="text-white/90">Rating</Label>
                  <div className="flex gap-2 mt-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-8 h-8 cursor-pointer transition-colors ${star <= newReview.rating ? "fill-blue-400 text-blue-400" : "text-gray-600"
                          }`}
                        onClick={() => setNewReview({ ...newReview, rating: star })}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <Label htmlFor="review" className="text-white/90">Your Review</Label>
                  <Textarea
                    id="review"
                    value={newReview.review}
                    onChange={(e) => setNewReview({ ...newReview, review: e.target.value })}
                    placeholder="Share your experience with us..."
                    rows={4}
                    className="bg-gray-800 border-blue-500/30 text-white"
                  />
                </div>
                <Button
                  onClick={handleReviewSubmit}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                >
                  Submit Review
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>

        {/* Carousel */}
        <div className="max-w-4xl mx-auto relative">
          <div className="relative h-[400px] flex items-center justify-center">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);

                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                  }
                }}
                className="absolute w-full"
                data-testid={`testimonial-${currentIndex}`}
              >
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 shadow-2xl border border-blue-500/20">
                  {/* Rating */}
                  <div className="flex justify-center mb-6">
                    <div className="flex text-blue-400">
                      {Array.from({ length: testimonials[currentIndex].rating || 5 }).map((_, i) => (
                        <Star key={i} className="w-6 h-6 fill-current" />
                      ))}
                    </div>
                  </div>

                  {/* Review */}
                  <p className="text-white/90 text-lg text-center mb-8 italic" style={{ fontFamily: 'Cormorant Garamond, serif' }} data-testid={`testimonial-body-${currentIndex}`}>
                    "{testimonials[currentIndex].body}"
                  </p>

                  {/* Client Info */}
                  <div className="flex items-center justify-center">
                    {testimonials[currentIndex].clientImage && (
                      <img
                        src={testimonials[currentIndex].clientImage}
                        alt={testimonials[currentIndex].clientName}
                        className="w-16 h-16 rounded-full mr-4 object-cover border-2 border-blue-400"
                        data-testid={`testimonial-image-${currentIndex}`}
                      />
                    )}
                    <div className="text-center">
                      <h4 className="font-semibold text-white text-lg" data-testid={`testimonial-name-${currentIndex}`}>
                        {testimonials[currentIndex].clientName}
                      </h4>
                      <p className="text-sm text-blue-400" data-testid={`testimonial-event-${currentIndex}`}>
                        {testimonials[currentIndex].eventType}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => paginate(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-blue-500/20 hover:bg-blue-500/40 text-white p-3 rounded-full backdrop-blur-sm transition-all"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => paginate(1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-blue-500/20 hover:bg-blue-500/40 text-white p-3 rounded-full backdrop-blur-sm transition-all"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_: Testimonial, index: number) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`w-3 h-3 rounded-full transition-all ${index === currentIndex ? "bg-blue-400 w-8" : "bg-blue-400/30"
                  }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
