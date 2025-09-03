import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { PHOTOGRAPHER_INFO, DUMMY_IMAGES } from "@/lib/constants";

export default function About() {
  return (
    <div className="pt-16">
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <img 
                src={DUMMY_IMAGES.profile}
                alt={`${PHOTOGRAPHER_INFO.name} - Professional Photographer`}
                className="rounded-lg shadow-xl w-full"
                data-testid="about-profile-image"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-3xl sm:text-4xl font-playfair font-bold mb-6" data-testid="about-title">
                Meet {PHOTOGRAPHER_INFO.name}
              </h1>
              
              <p className="text-lg text-muted-foreground mb-6" data-testid="about-description-1">
                With over {PHOTOGRAPHER_INFO.experience} of experience in wedding and event photography, I specialize in capturing the authentic emotions and beautiful moments that make your special day unforgettable. Based in Satna, Madhya Pradesh, I bring a unique blend of traditional and contemporary styles to every shoot.
              </p>
              
              <p className="text-lg text-muted-foreground mb-6" data-testid="about-description-2">
                My passion lies in storytelling through photography - whether it's the nervous excitement before a ceremony, the joy of a family celebration, or the intimate moments between couples. Every image I capture is crafted to preserve the emotions and memories that matter most.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="text-center p-4 bg-card rounded-lg">
                  <h3 className="text-2xl font-bold text-accent" data-testid="stat-weddings">500+</h3>
                  <p className="text-sm text-muted-foreground">Weddings Captured</p>
                </div>
                <div className="text-center p-4 bg-card rounded-lg">
                  <h3 className="text-2xl font-bold text-accent" data-testid="stat-experience">{PHOTOGRAPHER_INFO.experience}</h3>
                  <p className="text-sm text-muted-foreground">Years Experience</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center text-muted-foreground">
                  <Mail className="w-5 h-5 mr-3 text-accent" />
                  <span data-testid="contact-email">{PHOTOGRAPHER_INFO.email}</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Phone className="w-5 h-5 mr-3 text-accent" />
                  <span data-testid="contact-phone">{PHOTOGRAPHER_INFO.phone}</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="w-5 h-5 mr-3 text-accent" />
                  <span data-testid="contact-address">{PHOTOGRAPHER_INFO.address}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
