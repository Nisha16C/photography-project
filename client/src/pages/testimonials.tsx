import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/lib/api";
import { LOCAL_IMAGES } from "@/lib/constants";
import type { Testimonial } from "@shared/schema";

const testimonialData = [
  {
    id: "1",
    clientName: "Priya & Rahul",
    eventType: "Wedding",
    rating: 5,
    body: "Himanshu captured our wedding beautifully! Every photo tells a story and the emotions are so genuine. His professionalism and attention to detail made our special day even more memorable.",
    clientImage: LOCAL_IMAGES.testimonials[0],
    location: "Satna, MP"
  },
  {
    id: "2",
    clientName: "Sneha Sharma",
    eventType: "Baby Shower",
    rating: 5,
    body: "Amazing work on our baby shower! Himanshu made everyone feel comfortable and captured such natural, beautiful moments. The photos are absolutely perfect and we'll treasure them forever.",
    clientImage: LOCAL_IMAGES.testimonials[1],
    location: "Rewa, MP"
  },
  {
    id: "3",
    clientName: "Anjali & Vikash",
    eventType: "Pre-Wedding",
    rating: 5,
    body: "Our pre-wedding shoot was absolutely magical! Himanshu's creative vision and guidance helped us feel relaxed and natural. The locations and lighting were perfect.",
    clientImage: LOCAL_IMAGES.testimonials[2],
    location: "Jabalpur, MP"
  },
  {
    id: "4",
    clientName: "Kavya Singh",
    eventType: "Family Portrait",
    rating: 5,
    body: "Himanshu has an incredible eye for capturing family dynamics. Our family portrait session was fun and the results exceeded our expectations. Highly recommended!",
    clientImage: LOCAL_IMAGES.testimonials[3],
    location: "Bhopal, MP"
  }
];

export default function TestimonialsPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonialData.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonialData.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonialData.length) % testimonialData.length);
  };

  const { data: apiTestimonials, isLoading } = useQuery({
    queryKey: ["/api/testimonials"],
    queryFn: api.testimonials.getAll,
  });

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl sm:text-4xl font-playfair font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent" data-testid="testimonials-page-title">
              Client Testimonials
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto" data-testid="testimonials-page-subtitle">
              Read what our wonderful clients have to say about their photography experience with us.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Testimonial Slider */}
      <section className="py-16 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                className="bg-gradient-to-br from-card to-muted p-8 rounded-2xl shadow-xl"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                data-testid={`featured-testimonial-${currentSlide}`}
              >
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-shrink-0">
                    <img
                      src={testimonialData[currentSlide].clientImage}
                      alt={testimonialData[currentSlide].clientName}
                      className="w-24 h-24 rounded-full object-cover shadow-lg"
                      data-testid={`featured-client-image-${currentSlide}`}
                    />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex justify-center md:justify-start mb-4">
                      {Array.from({ length: testimonialData[currentSlide].rating }).map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-accent fill-current" />
                      ))}
                    </div>
                    <p className="text-lg text-muted-foreground mb-4 italic" data-testid={`featured-testimonial-body-${currentSlide}`}>
                      "{testimonialData[currentSlide].body}"
                    </p>
                    <div>
                      <h4 className="font-semibold text-primary" data-testid={`featured-client-name-${currentSlide}`}>
                        {testimonialData[currentSlide].clientName}
                      </h4>
                      <p className="text-sm text-muted-foreground" data-testid={`featured-event-type-${currentSlide}`}>
                        {testimonialData[currentSlide].eventType} • {testimonialData[currentSlide].location}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <Button
              variant="ghost"
              size="icon"
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-card/80 hover:bg-card shadow-lg"
              data-testid="button-prev-testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-card/80 hover:bg-card shadow-lg"
              data-testid="button-next-testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>

            {/* Slide Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {testimonialData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? 'bg-accent' : 'bg-muted-foreground/30'
                    }`}
                  data-testid={`testimonial-indicator-${index}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* All Testimonials Grid */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl font-playfair font-bold mb-4" data-testid="all-testimonials-title">
              More Happy Clients
            </h2>
          </motion.div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-64 rounded-lg" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {apiTestimonials?.map((testimonial: Testimonial, index: number) => (
                <motion.div
                  key={testimonial.id}
                  className="bg-card rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  data-testid={`grid-testimonial-${index}`}
                >
                  <div className="flex items-center mb-4">
                    <div className="flex text-accent">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4 text-sm" data-testid={`grid-testimonial-body-${index}`}>
                    "{testimonial.body}"
                  </p>

                  <div className="flex items-center">
                    {testimonial.clientImage && (
                      <img
                        src={testimonial.clientImage}
                        alt={testimonial.clientName}
                        className="w-10 h-10 rounded-full mr-3 object-cover"
                        data-testid={`grid-testimonial-image-${index}`}
                      />
                    )}
                    <div>
                      <h4 className="font-semibold text-sm" data-testid={`grid-testimonial-name-${index}`}>
                        {testimonial.clientName}
                      </h4>
                      <p className="text-xs text-muted-foreground" data-testid={`grid-testimonial-event-${index}`}>
                        {testimonial.eventType}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}