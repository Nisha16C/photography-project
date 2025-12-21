import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";
import { api } from "@/lib/api";
import type { Service } from "@shared/schema";

export default function Services() {
  const { data: services, isLoading } = useQuery({
    queryKey: ["/api/services"],
    queryFn: api.services.getAll,
  });

  if (isLoading) {
    return (
      <div className="pt-16 py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Skeleton className="h-12 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-96 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl sm:text-4xl font-playfair font-bold mb-4" data-testid="services-title">
              Services & Packages
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto" data-testid="services-subtitle">
              Comprehensive photography services tailored to capture every special moment of your celebration.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services?.map((service: Service, index: number) => (
              <motion.div
                key={service.id}
                className="bg-card rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                data-testid={`service-${index}`}
              >
                <div className="text-center mb-6">
                  <h3 className="text-xl font-playfair font-semibold mb-2" data-testid={`service-title-${index}`}>
                    {service.title}
                  </h3>
                  <p className="text-3xl font-bold text-accent mb-2" data-testid={`service-price-${index}`}>
                    ₹{service.basePrice.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">Starting price</p>
                  {service.isPopular && (
                    <div className="inline-block bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full mt-2">
                      Most Popular
                    </div>
                  )}
                </div>

                <ul className="space-y-3 mb-6">
                  {service.features?.map((feature: string, featureIndex: number) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="w-5 h-5 text-accent mr-3 flex-shrink-0" />
                      <span className="text-sm" data-testid={`service-feature-${index}-${featureIndex}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link href="/contact">
                  <Button
                    className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                    data-testid={`button-book-${index}`}
                  >
                    Get Quote
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
