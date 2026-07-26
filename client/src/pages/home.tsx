import HeroSlideshow from "@/components/hero-slideshow";
import FeaturedWork from "@/components/featured-work";
import WhyChooseUs from "@/components/why-choose-us";
import TestimonialsSlider from "@/components/testimonials-slider";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Camera, Film, BookImage, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "wouter";

const servicesData = [
  {
    id: "photography",
    icon: Camera,
    title: "Photography",
    description:
      "Candid photography focusing on natural candid shots of the bride-groom and main family, plus traditional coverage of the entire event.",
    gradient: "from-[hsl(38,92%,58%)] to-[hsl(30,70%,45%)]",
  },
  {
    id: "wedding-films",
    icon: Film,
    title: "Wedding Films",
    description:
      "Cinematic wedding films with artistic storytelling focused on the bride-groom and main family, plus traditional full-event coverage.",
    gradient: "from-[hsl(30,70%,45%)] to-[hsl(20,65%,40%)]",
  },
  {
    id: "photobooks",
    icon: BookImage,
    title: "Photobooks & Albums",
    description:
      "Handcrafted, custom-designed wedding photo books and albums to cater to every taste and preference.",
    gradient: "from-[hsl(45,100%,60%)] to-[hsl(38,92%,50%)]",
  },
  {
    id: "post-production",
    icon: Sparkles,
    title: "Luxury Wedding Films",
    description:
      "Premium editing services including cinematic teasers, short films, and traditional videos with a luxury touch.",
    gradient: "from-[hsl(38,92%,58%)] to-[hsl(45,100%,65%)]",
  },
];

export default function Home() {
  return (
    <div className="pt-16">
      <HeroSlideshow />

      {/* ── Services Section ─────────────────────────── */}
      <section className="py-20 relative overflow-hidden bg-black">
        {/* Diagonal gold lines background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              hsl(38,92%,58%) 0px,
              hsl(38,92%,58%) 1px,
              transparent 1px,
              transparent 50px
            )`,
          }}
        />
        {/* Ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-40 bg-[hsl(38,92%,58%)]/5 blur-[80px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.p
              className="text-[hsl(38,92%,58%)] text-xs font-cinzel tracking-[0.35em] uppercase mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
            >
              What We Offer
            </motion.p>
            <h2
              className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-4 gradient-text-animated"
              style={{ fontFamily: "'Tangerine', cursive" }}
              data-testid="services-title"
            >
              Our Services
            </h2>
            <div className="section-divider mb-5 mt-3" />
            <p
              className="text-white/50 text-base max-w-2xl mx-auto font-cormorant italic"
              data-testid="services-subtitle"
            >
              A comprehensive range of photography and luxury wedding film services to capture your special moments.
            </p>
          </motion.div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {servicesData.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  className="group relative"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  data-testid={`service-card-${index}`}
                >
                  <motion.div
                    className="glass-gold rounded-2xl p-7 h-full flex flex-col relative overflow-hidden border border-[hsl(38,92%,58%)]/10 hover:border-[hsl(38,92%,58%)]/30 transition-all duration-500"
                    whileHover={{ y: -6, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  >
                    {/* Inner glow on hover */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                      style={{
                        background:
                          "radial-gradient(ellipse at 50% 0%, hsla(38,92%,58%,0.10) 0%, transparent 70%)",
                      }}
                    />

                    {/* Icon */}
                    <div className={`w-14 h-14 rounded-xl mb-5 flex items-center justify-center bg-gradient-to-br ${service.gradient} shadow-lg flex-shrink-0`}>
                      <Icon className="w-7 h-7 text-black" strokeWidth={1.8} />
                    </div>

                    <h3
                      className="text-base font-cinzel font-semibold mb-3 text-white group-hover:text-[hsl(38,92%,58%)] transition-colors duration-300 tracking-wide"
                      data-testid={`service-title-${index}`}
                    >
                      {service.title}
                    </h3>

                    <div className="w-8 h-0.5 bg-gradient-to-r from-[hsl(38,92%,58%)] to-transparent mb-4 transition-all duration-300 group-hover:w-14" />

                    <p
                      className="text-white/50 text-sm leading-relaxed group-hover:text-white/75 transition-colors duration-300 flex-1"
                      data-testid={`service-description-${index}`}
                    >
                      {service.description}
                    </p>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* CTA */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <Link href="/services">
              <motion.span
                className="btn-gold inline-flex items-center gap-3 px-10 py-4 rounded-full font-semibold text-base cursor-pointer shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
              >
                View All Services & Packages
                <ArrowRight className="w-4 h-4" />
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </section>

      <FeaturedWork />
      <WhyChooseUs />
      <TestimonialsSlider />

      {/* ── View More Client Stories CTA ─── */}
      <div className="bg-black py-12 text-center relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(38,92%,58%)]/30 to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Link href="/testimonials">
            <motion.span
              className="btn-gold inline-flex items-center gap-3 px-10 py-4 rounded-full font-semibold text-base cursor-pointer shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
            >
              View More Client Stories
              <ArrowRight className="w-4 h-4" />
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
