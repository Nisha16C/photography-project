import { motion } from "framer-motion";
import { DUMMY_IMAGES } from "@/lib/constants";

const featuredImages = [
  {
    src: DUMMY_IMAGES.portfolio[0],
    alt: "Elegant bridal portrait",
    title: "Wedding Photography",
    subtitle: "Capturing eternal love stories"
  },
  {
    src: DUMMY_IMAGES.portfolio[1], 
    alt: "Romantic pre-wedding couple shoot",
    title: "Pre-Wedding",
    subtitle: "Romantic storytelling sessions"
  },
  {
    src: DUMMY_IMAGES.portfolio[2],
    alt: "Happy family portrait",
    title: "Family Photography", 
    subtitle: "Treasured family moments"
  }
];

export default function FeaturedWork() {
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
          <h2 className="text-3xl sm:text-4xl font-playfair font-bold mb-4" data-testid="featured-work-title">
            Featured Work
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto" data-testid="featured-work-subtitle">
            A glimpse into some of our most cherished moments captured for couples and families across Madhya Pradesh.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredImages.map((image, index) => (
            <motion.div
              key={index}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              data-testid={`featured-image-${index}`}
            >
              <div className="relative overflow-hidden rounded-lg aspect-[4/5]">
                <img 
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-white text-center">
                    <h3 className="text-xl font-playfair font-semibold mb-2">{image.title}</h3>
                    <p className="text-sm">{image.subtitle}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
