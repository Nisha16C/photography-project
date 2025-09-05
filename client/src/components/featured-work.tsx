import { motion } from "framer-motion";
import { Link } from "wouter";
import { LOCAL_IMAGES, PORTFOLIO_CATEGORIES } from "@/lib/constants";
import { Camera } from "lucide-react";

const featuredImages = Object.entries(PORTFOLIO_CATEGORIES).map(([title, imgs]) => {
  const getSrc = (i: any) => (typeof i === "string" ? i : i?.src || "");
  return {
    title,
    imgs: imgs.slice(0, 4).map(getSrc), // show up to 4 thumbs per category
    subtitle: `View ${title} gallery`,
  };
});

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
          {featuredImages.map((category, index) => (
            <motion.div
              key={category.title}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              data-testid={`featured-image-${index}`}
            >
              <Link href={`/portfolio?category=${encodeURIComponent(category.title)}`}>
                <div className="relative overflow-hidden rounded-lg aspect-[4/5]">
                  {/* small collage of up to 4 thumbnails */}
                  <div className="grid grid-cols-2 grid-rows-2 h-full w-full">
                    {category.imgs.map((src, i) => (
                      <img
                        key={i}
                        src={src || LOCAL_IMAGES.portfolio?.[0]?.src}
                        alt={`${category.title}-${i}`}
                        className={`w-full h-full object-cover transition-transform duration-300 ${i === 0 ? "group-hover:scale-105" : "opacity-95"}`}
                        loading="lazy"
                      />
                    ))}
                  </div>
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-white text-center px-4">
                      <h3 className="text-xl font-playfair font-semibold mb-2">{category.title}</h3>
                      <p className="text-sm">{category.subtitle}</p>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                      <Camera className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
