import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Star } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/lib/api";

export default function Testimonials() {
  const { data: testimonials, isLoading } = useQuery({
    queryKey: ["/api/testimonials"],
    queryFn: api.testimonials.getAll,
  });

  if (isLoading) {
    return (
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Skeleton className="h-12 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-64 rounded-lg" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-playfair font-bold mb-4" data-testid="testimonials-title">
            What Clients Say
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto" data-testid="testimonials-subtitle">
            Read testimonials from couples and families who have trusted us to capture their most precious moments.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials?.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="bg-card rounded-lg p-6 shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              data-testid={`testimonial-${index}`}
            >
              {/* Rating */}
              <div className="flex items-center mb-4">
                <div className="flex text-accent">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
              </div>
              
              {/* Review */}
              <p className="text-muted-foreground mb-4" data-testid={`testimonial-body-${index}`}>
                "{testimonial.body}"
              </p>
              
              {/* Client Info */}
              <div className="flex items-center">
                {testimonial.clientImage && (
                  <img 
                    src={testimonial.clientImage}
                    alt={testimonial.clientName}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                    data-testid={`testimonial-image-${index}`}
                  />
                )}
                <div>
                  <h4 className="font-semibold" data-testid={`testimonial-name-${index}`}>
                    {testimonial.clientName}
                  </h4>
                  <p className="text-sm text-muted-foreground" data-testid={`testimonial-event-${index}`}>
                    {testimonial.eventType}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
