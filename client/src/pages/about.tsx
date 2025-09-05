import { motion, useMotionValue, useTransform, useAnimation } from "framer-motion";
import { Mail, Phone, MapPin, Camera, Award, Users } from "lucide-react";
import { PHOTOGRAPHER_INFO, LOCAL_IMAGES } from "@/lib/constants";
import PROFILE_IMG from "@/assets/images/profile/shared-image.jpg";


export default function About() {
  // Parallax motion values for the profile image
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const imgX = useTransform(mouseX, [-1, 1], [-12, 12]);
  const imgY = useTransform(mouseY, [-1, 1], [-10, 10]);
  const imgRotate = useTransform(mouseX, [-1, 1], [-3, 3]);

  // Stagger controls for sections
  const controls = useAnimation();

  const onMouseMoveContainer = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0..1
    const py = (e.clientY - rect.top) / rect.height; // 0..1
    mouseX.set(px * 2 - 1); // -1..1
    mouseY.set(py * 2 - 1);
  };

  const onMouseLeaveContainer = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="relative self-start"
              onMouseMove={onMouseMoveContainer}
              onMouseLeave={onMouseLeaveContainer}
            >
              {/* raise the image so its top aligns closer to the heading line */}
              <div className="relative overflow-hidden rounded-2xl shadow-2xl -translate-y-6 md:-translate-y-10 lg:-translate-y-6 transform">
                <motion.img
                  src={PROFILE_IMG || LOCAL_IMAGES.profile}
                  alt={`${PHOTOGRAPHER_INFO.name} - Professional Photographer`}
                  className="w-full h-[420px] sm:h-[520px] md:h-[600px] object-cover object-top will-change-transform"
                  loading="lazy"
                  data-testid="about-profile-image"
                  style={{ x: imgX, y: imgY, rotate: imgRotate }}
                  initial={{ opacity: 0, scale: 0.98, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.99 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
              </div>

              {/* gentle floating animation for visual interest */}
              <motion.div
                aria-hidden
                initial={{ y: 0 }}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
                className="absolute -top-4 -right-4 bg-accent p-4 rounded-full shadow-lg"
              >
                <Camera className="w-6 h-6 text-accent-foreground" />
              </motion.div>
            </motion.div>
            
            <motion.div
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } }
              }}
            >
              <motion.h1 
                className="text-3xl sm:text-4xl lg:text-5xl font-playfair font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent" 
                data-testid="about-title"
                variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.6 }}
              >
                Meet {PHOTOGRAPHER_INFO.name}
              </motion.h1>
              
              <motion.p 
                className="text-lg text-muted-foreground mb-6 leading-relaxed" 
                data-testid="about-description-1"
                variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.6 }}
              >
                With over 4+ years of experience in wedding and event photography, I specialize in capturing the authentic emotions and beautiful moments that make your special day unforgettable. Based in Satna, Madhya Pradesh, I bring a unique blend of traditional and contemporary styles to every shoot.
              </motion.p>
              
              <motion.p 
                className="text-lg text-muted-foreground mb-8 leading-relaxed" 
                data-testid="about-description-2"
                variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.6 }}
              >
                My passion lies in storytelling through photography - whether it's the nervous excitement before a ceremony, the joy of a family celebration, or the intimate moments between couples. Every image I capture is crafted to preserve the emotions and memories that matter most.
              </motion.p>
              
              <motion.div 
                className="grid grid-cols-3 gap-4 mb-8"
                variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.6 }}
              >
                <div className="text-center p-4 bg-gradient-to-br from-card to-muted rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex justify-center mb-2">
                    <Award className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold text-accent" data-testid="stat-weddings">500+</h3>
                  <p className="text-sm text-muted-foreground">Events Captured</p>
                </div>
                <motion.div
                  className="text-center p-4 bg-gradient-to-br from-card to-muted rounded-lg shadow-lg"
                  whileHover={{ scale: 1.04, rotateY: 6 }}
                  transition={{ type: "spring", stiffness: 220 }}
                >
                  <div className="flex justify-center mb-2">
                    <Camera className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold text-accent" data-testid="stat-experience">4+</h3>
                  <p className="text-sm text-muted-foreground">Years Experience</p>
                </motion.div>
                <motion.div
                  className="text-center p-4 bg-gradient-to-br from-card to-muted rounded-lg shadow-lg"
                  whileHover={{ scale: 1.04, rotateY: -6 }}
                  transition={{ type: "spring", stiffness: 220 }}
                >
                  <div className="flex justify-center mb-2">
                    <Users className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold text-accent" data-testid="stat-clients">200+</h3>
                  <p className="text-sm text-muted-foreground">Happy Clients</p>
                </motion.div>
               </motion.div>
               
              <motion.div 
                className="space-y-4"
                variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.6 }}
              >
                <motion.div className="flex items-center text-muted-foreground transition-colors p-3 rounded-lg bg-card/50"
                  whileHover={{ x: 6 }}
                  transition={{ type: "spring", stiffness: 250 }}
                >
                  <Mail className="w-5 h-5 mr-4 text-accent" />
                  <span data-testid="contact-email">{PHOTOGRAPHER_INFO.email}</span>
                </motion.div>
                <motion.div className="flex items-center text-muted-foreground transition-colors p-3 rounded-lg bg-card/50"
                  whileHover={{ x: 6 }}
                  transition={{ type: "spring", stiffness: 250, delay: 0.04 }}
                >
                  <Phone className="w-5 h-5 mr-4 text-accent" />
                  <span data-testid="contact-phone">{PHOTOGRAPHER_INFO.phone}</span>
                </motion.div>
                <motion.div className="flex items-center text-muted-foreground transition-colors p-3 rounded-lg bg-card/50"
                  whileHover={{ x: 6 }}
                  transition={{ type: "spring", stiffness: 250, delay: 0.08 }}
                >
                  <MapPin className="w-5 h-5 mr-4 text-accent" />
                  <span data-testid="contact-address">{PHOTOGRAPHER_INFO.address}</span>
                </motion.div>
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
