import { motion } from "framer-motion";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
  testId?: string;
}

const FeatureCard = ({ icon, title, description, index, testId }: FeatureCardProps) => {
  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: index * 0.12 }}
      viewport={{ once: true }}
      data-testid={testId}
    >
      <motion.div
        className="glass-gold rounded-2xl p-8 flex flex-col items-center text-center h-full relative overflow-hidden"
        whileHover={{ y: -6, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
      >
        {/* Hover glow */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
          style={{ background: "radial-gradient(ellipse at 50% 0%, hsla(38,92%,58%,0.12) 0%, transparent 70%)" }}
        />

        {/* Icon circle with animated gradient border */}
        <div className="relative mb-6">
          <motion.div
            className="w-20 h-20 rounded-full flex items-center justify-center relative"
            style={{
              background: "linear-gradient(135deg, hsl(38,92%,58%), hsl(30,70%,45%))",
            }}
            whileHover={{ rotate: 10 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {/* Pulse ring */}
            <motion.span
              className="absolute inset-0 rounded-full border-2 border-[hsl(38,92%,58%)]/40"
              animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.3 }}
            />
            <div className="text-black w-8 h-8 [&>svg]:w-8 [&>svg]:h-8">
              {icon}
            </div>
          </motion.div>
        </div>

        <h3
          className="text-lg font-playfair font-semibold mb-3 text-white group-hover:text-[hsl(38,92%,58%)] transition-colors duration-300"
          data-testid={`${testId}-title`}
        >
          {title}
        </h3>

        <div className="w-8 h-0.5 bg-gradient-to-r from-transparent via-[hsl(38,92%,58%)] to-transparent mb-4 transition-all duration-300 group-hover:w-16" />

        <p className="text-white/55 text-sm leading-relaxed group-hover:text-white/75 transition-colors duration-300" data-testid={`${testId}-description`}>
          {description}
        </p>
      </motion.div>
    </motion.div>
  );
};

export default function WhyChooseUs() {
  const features = [
    {
      id: "one-stop",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      ),
      title: "One Stop Solution",
      description: "Because we believe your wedding should feel as exquisite as the memories you carry forever",
    },
    {
      id: "legacy",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      title: "A Legacy Since 2020",
      description: "Legacy since 2020, filmmaking & all types of photography under one roof",
    },
    {
      id: "trusted",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
      title: "Trusted in Satna",
      description: "A reputation as a trusted photographer in Satna with meticulous storytelling and custom direction",
    },
    {
      id: "luxury",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <circle cx="12" cy="12" r="3" />
          <path d="M19 10h-2M7 10h-2M19 14h-2M7 14h-2" />
        </svg>
      ),
      title: "Luxury Albums & Cinematics",
      description: "Advanced editing, drone cinematography, luxe wedding albums, and editorial-style visuals",
    },
  ];

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Decorative diagonal lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            hsl(38,92%,58%) 0px,
            hsl(38,92%,58%) 1px,
            transparent 1px,
            transparent 50px
          )`,
        }}
      />

      {/* Glow blobs */}
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-[hsl(38,92%,58%)]/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-[hsl(38,92%,58%)]/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-[hsl(38,92%,58%)] text-xs font-cinzel tracking-[0.35em] uppercase mb-4">Why Us</p>
          <h2
            className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-4 gradient-text-animated"
            style={{ fontFamily: "'Tangerine', cursive" }}
            data-testid="why-choose-us-title"
          >
            Why Choose Us
          </h2>
          <div className="section-divider mb-5 mt-3" />
          <p className="text-white/50 text-base max-w-2xl mx-auto font-cormorant italic" data-testid="why-choose-us-subtitle">
            Why Premium Couples Choose New Geeta Studio
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <FeatureCard
              key={feature.id}
              index={i}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              testId={`feature-${feature.id}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}