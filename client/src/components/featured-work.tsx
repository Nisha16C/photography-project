import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { LOCAL_IMAGES, PORTFOLIO_CATEGORIES } from "@/lib/constants";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";

const featuredImages = Object.entries(PORTFOLIO_CATEGORIES).map(([key, imgs]) => {
  const getSrc = (i: any) => (typeof i === "string" ? i : i?.src || "");
  const title = key.replace(/-Img$/i, "").replace(/-/g, " ");
  return {
    key,
    title,
    imgs: imgs.slice(0, 4).map(getSrc),
    subtitle: `View ${title} gallery`,
  };
});

export default function FeaturedWork() {
  const [, setLocation] = useLocation();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [autoScrollActive, setAutoScrollActive] = useState(true);
  const [scrollDirection, setScrollDirection] = useState(1);

  // Auto-scroll
  useEffect(() => {
    if (!autoScrollActive || !scrollContainerRef.current) return;
    const el = scrollContainerRef.current;
    let frameId: number;
    let last = 0;

    const tick = (ts: number) => {
      if (!last) last = ts;
      if (ts - last > 18) {
        last = ts;
        if (scrollDirection > 0 && el.scrollLeft >= el.scrollWidth - el.clientWidth - 10) {
          setScrollDirection(-1);
        } else if (scrollDirection < 0 && el.scrollLeft <= 10) {
          setScrollDirection(1);
        }
        el.scrollLeft += scrollDirection * 2.5;
      }
      frameId = requestAnimationFrame(tick);
    };
    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [autoScrollActive, scrollDirection]);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setShowLeftArrow(scrollLeft > 20);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 20);
  };

  const scrollLeft = () => {
    setAutoScrollActive(false);
    scrollContainerRef.current?.scrollBy({ left: -320, behavior: "smooth" });
  };
  const scrollRight = () => {
    setAutoScrollActive(false);
    scrollContainerRef.current?.scrollBy({ left: 320, behavior: "smooth" });
  };

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Subtle background texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            hsl(38,92%,58%) 0px,
            hsl(38,92%,58%) 1px,
            transparent 1px,
            transparent 40px
          )`,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <motion.p
            className="text-[hsl(38,92%,58%)] text-xs font-cinzel tracking-[0.35em] uppercase mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
          >
            Our Portfolio
          </motion.p>
          <h2 className="text-4xl sm:text-5xl font-playfair font-bold mb-4" data-testid="featured-work-title">
            <motion.span
              className="inline-block text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              viewport={{ once: true }}
            >
              Featured&nbsp;
            </motion.span>
            <motion.span
              className="inline-block gradient-text-gold"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              viewport={{ once: true }}
            >
              Work
            </motion.span>
          </h2>
          <motion.div
            className="section-divider mt-4 mb-5"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            viewport={{ once: true }}
          />
          <motion.p
            className="text-white/50 text-base max-w-xl mx-auto font-cormorant italic"
            data-testid="featured-work-subtitle"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            viewport={{ once: true }}
          >
            A glimpse into some of our most cherished moments captured for couples and families across Madhya Pradesh.
          </motion.p>
        </motion.div>

        {/* Scrollable rail */}
        <div className="relative">
          {/* Left arrow */}
          {showLeftArrow && (
            <motion.button
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 glass border border-white/10 p-3 rounded-full text-white hover:border-[hsl(38,92%,58%)]/50 hover:text-[hsl(38,92%,58%)] transition-all shadow-xl -translate-x-4"
              onClick={scrollLeft}
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
          )}

          {/* Right arrow */}
          {showRightArrow && (
            <motion.button
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 glass border border-white/10 p-3 rounded-full text-white hover:border-[hsl(38,92%,58%)]/50 hover:text-[hsl(38,92%,58%)] transition-all shadow-xl translate-x-4"
              onClick={scrollRight}
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          )}

          <div
            ref={scrollContainerRef}
            className="overflow-x-auto hide-scrollbar pb-4 pt-2"
            onScroll={handleScroll}
            onMouseEnter={() => setAutoScrollActive(false)}
            onMouseLeave={() => setAutoScrollActive(true)}
          >
            <div className="flex space-x-5 min-w-max px-2">
              {featuredImages.map((category, index) => (
                <motion.div
                  key={category.title}
                  className="group cursor-pointer w-72 flex-shrink-0"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: index * 0.1 }}
                  viewport={{ once: false, margin: "-80px" }}
                  data-testid={`featured-image-${index}`}
                >
                  <button
                    onClick={() => setLocation(`/portfolio?category=${encodeURIComponent(category.key)}`)}
                    aria-label={`Open ${category.title} gallery`}
                    className="w-full text-left"
                  >
                    <motion.div
                      className="relative overflow-hidden rounded-2xl aspect-[3/4] shadow-2xl card-gold-border"
                      whileHover={{ y: -8, scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 260, damping: 22 }}
                    >
                      {/* Collage grid */}
                      <div className="grid grid-cols-2 grid-rows-2 h-full w-full">
                        {category.imgs.map((src, i) => (
                          <div key={i} className="overflow-hidden">
                            <img
                              src={src || LOCAL_IMAGES.portfolio?.[0]?.src}
                              alt={`${category.title}-${i}`}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                              loading="lazy"
                            />
                          </div>
                        ))}
                      </div>

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-5">
                        <motion.div
                          initial={{ y: 15, opacity: 0 }}
                          whileInView={{ y: 0, opacity: 1 }}
                          className="text-white"
                        >
                          <h3 className="text-lg font-playfair font-semibold capitalize mb-1">{category.title}</h3>
                          <div className="flex items-center gap-2 text-[hsl(38,92%,58%)] text-sm font-medium">
                            <span>Explore gallery</span>
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </motion.div>
                      </div>

                      {/* Category label badge (always visible) */}
                      <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-white/80 text-xs font-cinzel tracking-wider capitalize border border-white/10 opacity-90 group-hover:opacity-0 transition-opacity duration-300">
                        {category.title}
                      </div>
                    </motion.div>
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* View all */}
          <motion.div
            className="mt-10 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Link href="/portfolio">
              <motion.span
                className="inline-flex items-center gap-2 text-[hsl(38,92%,58%)] hover:text-[hsl(45,100%,72%)] font-semibold font-cinzel tracking-wider text-sm uppercase cursor-pointer group"
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <span>View all categories</span>
                <motion.span
                  className="group-hover:translate-x-1 transition-transform"
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.span>
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
