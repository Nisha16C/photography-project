import { motion, useMotionValue, useTransform, useAnimation } from "framer-motion";
import { Mail, Phone, MapPin, Camera, Award, Users } from "lucide-react";
import { PHOTOGRAPHER_INFO, LOCAL_IMAGES } from "@/lib/constants";
import PROFILE_IMG from "@/assets/images/profile/shared-image.jpg";
import { useEffect, useState, useRef } from "react";
import CountUp from "react-countup";

// Import background images
import WEDDING_BG from "@/assets/images/portfolio/weddings-Img/indian-bride-and-groom-at-amazing-hindu-wedding-ceremony-photo.jpeg";
import PREWEDDING_BG from "@/assets/images/portfolio/PreWedding-Img/Capture-Timeless-Moments-Pre-Wedding-Photoshoots-in-Valparai-with-Yabesh-Photography-10.jpeg";
import FAMILY_BG from "@/assets/images/portfolio/Family-img/happy-indian-family-outdoor-park-candid-portrait-parents-children-having-fun-garden-park-36754546.webp";
import MEHNDI_BG from "@/assets/images/portfolio/Mehndi-Img/photo-1505932794465-147d1f1b2c97.jpg";


export default function About() {
  // Parallax motion values for the profile image
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const imgX = useTransform(mouseX, [-1, 1], [-12, 12]);
  const imgY = useTransform(mouseY, [-1, 1], [-10, 10]);
  const imgRotate = useTransform(mouseX, [-1, 1], [-3, 3]);

  // Stagger controls for sections
  const controls = useAnimation();

  // State for count-up animation
  const [hasAnimated, setHasAnimated] = useState(false);

  // Start count animation after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasAnimated(true);
    }, 1000); // 2 seconds delay

    return () => clearTimeout(timer);
  }, []);

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
      <section className="pt-1 bg-gradient-to-br from-primary/5 to-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mt-2">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="text-center p-6 bg-gradient-to-br from-card to-muted rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <motion.div
                  className="flex justify-center mb-3"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Award className="w-8 h-8 text-accent" />
                </motion.div>
                <h3 className="text-3xl font-bold text-accent mb-2" data-testid="stat-weddings">
                  {hasAnimated ? (
                    <CountUp
                      start={0}
                      end={100}
                      duration={2.5}
                      separator=""
                      suffix="+"
                      useEasing={true}
                    />
                  ) : "0+"}
                </h3>
                <p className="text-muted-foreground">Events Captured</p>
              </div>

              <motion.div
                className="text-center p-6 bg-gradient-to-br from-card to-muted rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                whileHover={{ scale: 1.04, rotateY: 6 }}
                transition={{ type: "spring", stiffness: 220 }}
              >
                <div className="flex justify-center mb-3">
                  <Camera className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-3xl font-bold text-accent mb-2" data-testid="stat-experience">
                  {hasAnimated ? (
                    <CountUp
                      start={0}
                      end={4}
                      duration={2}
                      separator=""
                      suffix="+"
                      useEasing={true}
                      decimals={0}
                    />
                  ) : "0+"}
                </h3>
                <p className="text-muted-foreground">Years Experience</p>
              </motion.div>

              <motion.div
                className="text-center p-6 bg-gradient-to-br from-card to-muted rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                whileHover={{ scale: 1.04, rotateY: -6 }}
                transition={{ type: "spring", stiffness: 220 }}
              >
                <div className="flex justify-center mb-3">
                  <Users className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-3xl font-bold text-accent mb-2" data-testid="stat-clients">
                  {hasAnimated ? (
                    <CountUp
                      start={0}
                      end={100}
                      duration={2.5}
                      separator=""
                      suffix="+"
                      useEasing={true}
                    />
                  ) : "0+"}
                </h3>
                <p className="text-muted-foreground">Happy Clients</p>
              </motion.div>
            </motion.div>
          </div>
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
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
              className="flex flex-col justify-center"
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
      <section className="py-16 relative overflow-hidden">

        {/* Overlay gradient */}
        <div className="absolute inset-0 via-background/90 to-background/80 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-blue-400" style={{ fontFamily: 'Cinzel, serif' }}>
              Our Signature Styles
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              Discover our unique approach to wedding storytelling - where luxury meets artistry to create timeless memories.
            </p>
          </motion.div>


          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">  {/* 4 कॉलम में बदला */}
            {[...PHOTOGRAPHER_INFO.specialties, "Mehndi Photography"].map((specialty, index) => {
              let backgroundImage = WEDDING_BG;

              if (specialty === "Wedding Photography") {
                backgroundImage = WEDDING_BG;
              } else if (specialty === "Pre-Wedding Shoots") {
                backgroundImage = PREWEDDING_BG;
              } else if (specialty === "Event Photography") {
                backgroundImage = FAMILY_BG;
              } else if (specialty === "Mehndi Photography") {
                backgroundImage = MEHNDI_BG;
              }

              return (
                <motion.div
                  key={specialty}
                  className="relative p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden h-96"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{
                    y: -10,
                    scale: 1.05,
                    rotateY: 5,
                    transition: { duration: 0.4, ease: "easeOut" }
                  }}
                  data-testid={`specialty-${index}`}
                >
                  {/* बैकग्राउंड इमेज */}
                  <div className="absolute inset-0 z-0 overflow-hidden">
                    <motion.img
                      src={backgroundImage}
                      alt={specialty}
                      className="w-full h-full object-cover filter blur-[2px]"
                      initial={{ scale: 1.0 }}
                      animate={{
                        scale: [1, 1.08, 1],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 15,
                        ease: "easeInOut"
                      }}
                      whileHover={{
                        filter: "blur(0px)",
                        scale: 1.15,
                        transition: { duration: 0.5 }
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-primary/70"></div>
                  </div>

                  {/* कंटेंट */}
                  <div className="relative z-10 h-full flex flex-col justify-between">
                    <div>
                      <motion.div
                        className="flex items-center justify-center w-16 h-16 bg-accent rounded-xl mb-6 relative overflow-hidden mx-auto"
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary to-accent opacity-50"></div>
                        <Camera className="w-8 h-8 text-accent-foreground" />
                      </motion.div>
                      <motion.h3
                        className="text-xl font-bold mb-3 text-center text-white drop-shadow-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        whileHover={{ scale: 1.05, textShadow: "0 0 8px rgba(255,255,255,0.8)" }}
                      >
                        {specialty}
                      </motion.h3>
                    </div>
                    <motion.p
                      className="text-sm text-white text-center drop-shadow-md font-medium"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      whileHover={{ y: -3 }}
                    >
                      Professional {specialty.toLowerCase()} services with attention to detail and creative storytelling.
                    </motion.p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}