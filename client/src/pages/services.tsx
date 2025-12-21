import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Check, Heart, Baby, Cake, Users, Briefcase, Church, Sparkles, Camera, Plane, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";
import { api } from "@/lib/api";
import type { Service } from "@shared/schema";
import { useState } from "react";

// Comprehensive services data organized by categories
const serviceCategories = [
  {
    icon: Heart,
    title: "Wedding & Pre-Wedding Occasions",
    gradient: "from-pink-500 to-rose-600",
    services: [
      "Pre-Wedding Shoot",
      "Engagement",
      "Ring Ceremony",
      "Roka Ceremony",
      "Haldi Ceremony",
      "Mehndi Ceremony",
      "Sangeet Night",
      "Wedding (Day Ceremony)",
      "Reception",
      "Destination Wedding"
    ]
  },
  {
    icon: Baby,
    title: "Maternity & Baby",
    gradient: "from-blue-400 to-cyan-500",
    services: [
      "Maternity Shoot",
      "Baby Shower (Godh Bharai)",
      "Newborn Shoot",
      "Baby Photoshoot",
      "Baby Naming Ceremony",
      "First Birthday",
      "Kids Birthday Party"
    ]
  },
  {
    icon: Cake,
    title: "Birthdays & Personal Celebrations",
    gradient: "from-purple-500 to-pink-500",
    services: [
      "Birthday Party",
      "Surprise Birthday Shoot",
      "Anniversary Celebration",
      "Milestone Birthdays (18th, 25th, 50th, etc.)"
    ]
  },
  {
    icon: Users,
    title: "Family & Lifestyle",
    gradient: "from-emerald-500 to-teal-500",
    services: [
      "Family Portraits",
      "Couple Shoot",
      "Lifestyle Photoshoot",
      "Home Photoshoot"
    ]
  },
  {
    icon: Briefcase,
    title: "Corporate & Professional",
    gradient: "from-slate-600 to-slate-800",
    services: [
      "Corporate Events",
      "Conferences & Seminars",
      "Office Events",
      "Product Launch",
      "Brand Shoot",
    ]
  },
  {
    icon: Church,
    title: "Religious & Cultural Events",
    gradient: "from-orange-500 to-red-500",
    services: [
      "Housewarming (Griha Pravesh)",
      "Pooja / Hawan",
      "Festival Events"
    ]
  },
  {
    icon: Sparkles,
    title: "Special Events",
    gradient: "from-yellow-500 to-amber-500",
    services: [
      "Farewell Party",
      "Get-together",
      "Community Events",
      "Charity Events",
      "Cultural Programs",
      "Award Ceremonies"
    ]
  },
  {
    icon: Camera,
    title: "Creative & Commercial",
    gradient: "from-indigo-500 to-purple-600",
    services: [
      "Fashion Shoot",
      "Editorial Shoot",
      "Model Portfolio",
      "Product Photography",
      "Food Photography",
      "Real Estate Photography"
    ]
  },
  {
    icon: Plane,
    title: "Travel & Outdoor",
    gradient: "from-sky-500 to-blue-600",
    services: [
      "Travel Photography",
      "Destination Shoots",
      "Nature & Landscape"
    ]
  }
];

export default function Services() {
  const { data: services, isLoading } = useQuery({
    queryKey: ["/api/services"],
    queryFn: api.services.getAll,
  });

  const [expandedCategories, setExpandedCategories] = useState<number[]>([]);

  const toggleCategory = (index: number) => {
    setExpandedCategories(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

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
      {/* Pricing Packages Section */}
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

      {/* Comprehensive Services Section */}
      <section className="py-24 relative overflow-hidden bg-black">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e3a8a15_1px,transparent_1px),linear-gradient(to_bottom,#1e3a8a15_1px,transparent_1px)] bg-[size:4rem_4rem]" />

          <motion.div
            className="absolute top-20 left-20 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-10 right-20 w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.15, 0.3, 0.15],
              x: [0, -40, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 pb-2 bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent"
              style={{ fontFamily: "'Playfair Display', serif" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Complete Photography Services
            </motion.h2>
            <motion.p
              className="text-blue-200/80 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed"
              style={{ fontFamily: "'Inter', sans-serif" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              viewport={{ once: true }}
            >
              From weddings to corporate events, we cover every moment that matters. Explore our comprehensive range of professional photography services.
            </motion.p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceCategories.map((category, index) => {
              const Icon = category.icon;
              const isExpanded = expandedCategories.includes(index);

              return (
                <motion.div
                  key={index}
                  className="group relative"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {/* Card */}
                  <div className="relative bg-slate-900/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl overflow-hidden hover:border-blue-500/40 transition-all duration-500">
                    {/* Gradient Accent */}
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${category.gradient}`} />

                    {/* Card Content */}
                    <div className="p-6">
                      {/* Icon & Title */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <motion.div
                            className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.gradient} p-[2px] shadow-lg`}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="w-full h-full rounded-xl bg-slate-900 flex items-center justify-center">
                              <Icon className="w-7 h-7 text-blue-400" />
                            </div>
                          </motion.div>

                          <div>
                            <h3
                              className="text-xl font-bold text-white mb-1"
                              style={{ fontFamily: "'Playfair Display', serif" }}
                            >
                              {category.title}
                            </h3>
                            <p className="text-sm text-blue-300/60">
                              {category.services.length} services
                            </p>
                          </div>
                        </div>

                        <motion.button
                          onClick={() => toggleCategory(index)}
                          className="text-blue-400 hover:text-blue-300 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ChevronDown className="w-6 h-6" />
                          </motion.div>
                        </motion.button>
                      </div>

                      {/* Services List */}
                      <motion.div
                        initial={false}
                        animate={{
                          height: isExpanded ? "auto" : 0,
                          opacity: isExpanded ? 1 : 0
                        }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <ul className="space-y-2 pt-4 border-t border-blue-500/10">
                          {category.services.map((service, serviceIndex) => (
                            <motion.li
                              key={serviceIndex}
                              className="flex items-start gap-2 text-blue-200/70 text-sm"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: serviceIndex * 0.05 }}
                            >
                              <Check className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                              <span>{service}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>

                      {/* Preview (when collapsed) */}
                      {!isExpanded && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {category.services.slice(0, 3).map((service, i) => (
                            <span
                              key={i}
                              className="text-xs px-2 py-1 rounded-full bg-blue-500/10 text-blue-300/80 border border-blue-500/20"
                            >
                              {service}
                            </span>
                          ))}
                          {category.services.length > 3 && (
                            <span className="text-xs px-2 py-1 rounded-full bg-blue-500/10 text-blue-300/80 border border-blue-500/20">
                              +{category.services.length - 3} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Hover Glow Effect */}
                    <div className={`absolute -inset-1 bg-gradient-to-r ${category.gradient} rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10`} />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* CTA Section */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <p className="text-blue-200/70 mb-6 text-lg">
              Don't see what you're looking for? We offer custom photography solutions for any occasion.
            </p>
            <Link href="/contact">
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(59, 130, 246, 0.5)" }}
                whileTap={{ scale: 0.95 }}
              >
                Get Custom Quote
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
