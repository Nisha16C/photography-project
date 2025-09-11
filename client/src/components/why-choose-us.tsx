import { motion } from "framer-motion";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  testId?: string;
}

const FeatureCard = ({ icon, title, description, testId }: FeatureCardProps) => {
  return (
    <motion.div
      className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-lg p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      data-testid={testId}
    >
      <div className="text-accent mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-playfair font-semibold mb-2" data-testid={`${testId}-title`}>
        {title}
      </h3>
      <p className="text-muted-foreground text-sm" data-testid={`${testId}-description`}>
        {description}
      </p>
    </motion.div>
  );
};

export default function WhyChooseUs() {
  const features = [
    {
      id: "one-stop",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      ),
      title: "One Stop Solution",
      description: "Because we believe your wedding should feel as exquisite as the memories you carry forever"
    },
    {
      id: "legacy",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      title: "A Legacy Since 2020",
      description: "Legacy since 2020, filmmaking & all types of photography under one roof"
    },
    {
      id: "trusted",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
      title: "Trusted in Indore",
      description: "A reputation as a trusted photographer in Indore with meticulous storytelling and custom direction"
    },
    {
      id: "luxury",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <circle cx="12" cy="12" r="3" />
          <path d="M19 10h-2" />
          <path d="M7 10h-2" />
          <path d="M19 14h-2" />
          <path d="M7 14h-2" />
        </svg>
      ),
      title: "Luxury Albums & Cinematics",
      description: "Advanced editing, drone cinematography, luxe wedding albums, and editorial-style visuals"
    }
  ];

  return (
    <section className="py-16 bg-background relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-playfair font-bold mb-4" data-testid="why-choose-us-title">
            Why Choose Us
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="why-choose-us-subtitle">
            Why Premium Couples Choose New Geeta Studio
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <FeatureCard
              key={feature.id}
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