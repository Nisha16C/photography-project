import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Camera, Award, Users } from "lucide-react";
import { PHOTOGRAPHER_INFO, LOCAL_IMAGES } from "@/lib/constants";

export default function About() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img 
                  src={LOCAL_IMAGES.profile}
                  alt={`${PHOTOGRAPHER_INFO.name} - Professional Photographer`}
                  className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-700"
                  data-testid="about-profile-image"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              {/* Floating elements */}
              <motion.div 
                className="absolute -top-4 -right-4 bg-accent p-4 rounded-full shadow-lg"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <Camera className="w-6 h-6 text-accent-foreground" />
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <motion.h1 
                className="text-3xl sm:text-4xl lg:text-5xl font-playfair font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent" 
                data-testid="about-title"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                Meet {PHOTOGRAPHER_INFO.name}
              </motion.h1>
              
              <motion.p 
                className="text-lg text-muted-foreground mb-6 leading-relaxed" 
                data-testid="about-description-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                With over 4+ years of experience in wedding and event photography, I specialize in capturing the authentic emotions and beautiful moments that make your special day unforgettable. Based in Satna, Madhya Pradesh, I bring a unique blend of traditional and contemporary styles to every shoot.
              </motion.p>
              
              <motion.p 
                className="text-lg text-muted-foreground mb-8 leading-relaxed" 
                data-testid="about-description-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                My passion lies in storytelling through photography - whether it's the nervous excitement before a ceremony, the joy of a family celebration, or the intimate moments between couples. Every image I capture is crafted to preserve the emotions and memories that matter most.
              </motion.p>
              
              <motion.div 
                className="grid grid-cols-3 gap-4 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <div className="text-center p-4 bg-gradient-to-br from-card to-muted rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex justify-center mb-2">
                    <Award className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold text-accent" data-testid="stat-weddings">500+</h3>
                  <p className="text-sm text-muted-foreground">Events Captured</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-card to-muted rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex justify-center mb-2">
                    <Camera className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold text-accent" data-testid="stat-experience">4+</h3>
                  <p className="text-sm text-muted-foreground">Years Experience</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-card to-muted rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex justify-center mb-2">
                    <Users className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold text-accent" data-testid="stat-clients">200+</h3>
                  <p className="text-sm text-muted-foreground">Happy Clients</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <div className="flex items-center text-muted-foreground hover:text-primary transition-colors p-3 rounded-lg bg-card/50">
                  <Mail className="w-5 h-5 mr-4 text-accent" />
                  <span data-testid="contact-email">{PHOTOGRAPHER_INFO.email}</span>
                </div>
                <div className="flex items-center text-muted-foreground hover:text-primary transition-colors p-3 rounded-lg bg-card/50">
                  <Phone className="w-5 h-5 mr-4 text-accent" />
                  <span data-testid="contact-phone">{PHOTOGRAPHER_INFO.phone}</span>
                </div>
                <div className="flex items-center text-muted-foreground hover:text-primary transition-colors p-3 rounded-lg bg-card/50">
                  <MapPin className="w-5 h-5 mr-4 text-accent" />
                  <span data-testid="contact-address">{PHOTOGRAPHER_INFO.address}</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Specialties Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl font-playfair font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Photography Specialties
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Discover the diverse range of photography services I offer to capture your most precious moments.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PHOTOGRAPHER_INFO.specialties.map((specialty, index) => (
              <motion.div
                key={specialty}
                className="bg-gradient-to-br from-card to-muted p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                data-testid={`specialty-${index}`}
              >
                <div className="flex items-center justify-center w-12 h-12 bg-accent rounded-lg mb-4">
                  <Camera className="w-6 h-6 text-accent-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{specialty}</h3>
                <p className="text-sm text-muted-foreground">
                  Professional {specialty.toLowerCase()} services with attention to detail and creative storytelling.
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
