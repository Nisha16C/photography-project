import { motion, useMotionValue, useTransform, useAnimation } from "framer-motion";
import { Mail, Phone, MapPin, Camera, Award, Users } from "lucide-react";
import { PHOTOGRAPHER_INFO, LOCAL_IMAGES } from "@/lib/constants";
import PROFILE_IMG from "@/assets/images/profile/shared-image.jpg";
import { useEffect, useState } from "react";
import CountUp from "react-countup";


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
                className="text-3xl sm:text-4xl pb-2 py-2 lg:text-5xl font-playfair font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
                data-testid="about-title"
                variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.6 }}
                style={{ fontFamily: "'Great Vibes', cursive" }}
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
      <section className="py-24 relative overflow-hidden bg-black">
        {/* Animated Blue Background Grid */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e3a8a15_1px,transparent_1px),linear-gradient(to_bottom,#1e3a8a15_1px,transparent_1px)] bg-[size:4rem_4rem]" />

          {/* Glowing Blue Orbs */}
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
          <motion.div
            className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.1, 0.25, 0.1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 pb-2  bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent"
              style={{ fontFamily: "'Playfair Display', serif" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Our Signature Styles
            </motion.h2>
            <motion.p
              className="text-blue-200/80 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed"
              style={{ fontFamily: "'Inter', sans-serif" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Discover our unique approach to wedding storytelling - where luxury meets artistry to create timeless memories.
            </motion.p>
          </motion.div>

          {/* Diagonal Timeline Layout */}
          <div className="relative">
            {/* Central Connecting Line */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-blue-500/50 to-transparent transform -translate-x-1/2" />

            <div className="space-y-16 lg:space-y-24">
              {PHOTOGRAPHER_INFO.specialties.map((specialty, index) => {
                const isEven = index % 2 === 0;

                return (
                  <motion.div
                    key={specialty}
                    className={`relative flex flex-col lg:flex-row items-center gap-8 ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                    initial={{ opacity: 0, x: isEven ? -100 : 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    data-testid={`specialty-${index}`}
                  >
                    {/* Content Side */}
                    <div className={`flex-1 ${isEven ? 'lg:text-right lg:pr-12' : 'lg:text-left lg:pl-12'}`}>
                      <motion.div
                        className="group relative inline-block"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.h3
                          className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-white relative inline-block"
                          style={{ fontFamily: "'Playfair Display', serif" }}
                          whileHover={{
                            textShadow: "0 0 20px rgba(59, 130, 246, 0.5)",
                          }}
                        >
                          {specialty}
                          <motion.span
                            className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-400"
                            initial={{ width: 0 }}
                            whileInView={{ width: "100%" }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            viewport={{ once: true }}
                          />
                        </motion.h3>

                        <motion.p
                          className="text-blue-200/70 text-base sm:text-lg leading-relaxed max-w-md mx-auto lg:mx-0"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ duration: 0.6, delay: 0.4 }}
                          viewport={{ once: true }}
                        >
                          Professional {specialty.toLowerCase()} services with attention to detail and creative storytelling that captures every precious moment.
                        </motion.p>
                      </motion.div>
                    </div>

                    {/* Center Icon */}
                    <div className="relative flex-shrink-0">
                      <motion.div
                        className="relative w-24 h-24 lg:w-32 lg:h-32"
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      >
                        {/* Outer Glow Ring */}
                        <motion.div
                          className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 opacity-20 blur-xl"
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.2, 0.4, 0.2],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />

                        {/* Middle Ring */}
                        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 p-[2px]">
                          <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                            {/* Inner Icon Circle */}
                            <motion.div
                              className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center"
                              whileHover={{ scale: 1.1 }}
                            >
                              <Camera className="w-8 h-8 lg:w-10 lg:h-10 text-black" strokeWidth={2.5} />
                            </motion.div>
                          </div>
                        </div>

                        {/* Rotating Border */}
                        <motion.div
                          className="absolute inset-0 rounded-full"
                          style={{
                            background: "conic-gradient(from 0deg, transparent, #3b82f6, transparent)",
                          }}
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                        />
                      </motion.div>

                      {/* Connecting Line to Center */}
                      <motion.div
                        className={`hidden lg:block absolute top-1/2 ${isEven ? 'left-full' : 'right-full'} w-12 h-0.5 bg-gradient-to-r ${isEven ? 'from-blue-500/50 to-transparent' : 'from-transparent to-blue-500/50'}`}
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        viewport={{ once: true }}
                      />
                    </div>

                    {/* Number Badge */}
                    <div className={`flex-1 ${isEven ? 'lg:text-left lg:pl-12' : 'lg:text-right lg:pr-12'}`}>
                      <motion.div
                        className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-600/20 to-cyan-500/20 border-2 border-blue-500/30"
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          delay: 0.6
                        }}
                        viewport={{ once: true }}
                        whileHover={{
                          scale: 1.2,
                          borderColor: "rgba(59, 130, 246, 0.8)",
                          boxShadow: "0 0 20px rgba(59, 130, 246, 0.4)"
                        }}
                      >
                        <span className="text-2xl font-bold bg-gradient-to-br from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}