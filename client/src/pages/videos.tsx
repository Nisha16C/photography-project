import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Sparkles, Heart, Camera, Film, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

// Import a wedding image for the background
import WEDDING_BG from "@/assets/images/portfolio/weddings-Img/indian-bride-and-groom-at-amazing-hindu-wedding-ceremony-photo.jpeg";

const VIDEOS = [
  {
    id: "video-1",
    url: "https://youtu.be/v7_41JK2i-Q?si=GSY3ptGGmohhEUn-",
    embedUrl: "https://www.youtube.com/embed/v7_41JK2i-Q?autoplay=1&mute=1",
    thumbnail: "https://img.youtube.com/vi/v7_41JK2i-Q/maxresdefault.jpg",
  },
  {
    id: "video-2",
    url: "https://youtu.be/oEKYlPXY6Tw?si=HxggS-umWi9JenKH",
    embedUrl: "https://www.youtube.com/embed/oEKYlPXY6Tw?autoplay=1&mute=1",
    thumbnail: "https://img.youtube.com/vi/oEKYlPXY6Tw/maxresdefault.jpg",
  },
  {
    id: "video-3",
    url: "https://youtu.be/jtt1drDuzmU?si=s1sTKrnDBdpQBafH",
    embedUrl: "https://www.youtube.com/embed/jtt1drDuzmU?autoplay=1&mute=1",
    thumbnail: "https://img.youtube.com/vi/jtt1drDuzmU/maxresdefault.jpg",
  },
  {
    id: "video-4",
    url: "https://youtu.be/4AAiNMxD_Hs?si=wYElwnNSo8Rsp8Rx",
    embedUrl: "https://www.youtube.com/embed/4AAiNMxD_Hs?autoplay=1&mute=1",
    thumbnail: "https://img.youtube.com/vi/4AAiNMxD_Hs/maxresdefault.jpg",
  },
  {
    id: "video-5",
    url: "https://youtu.be/iLYfR3aH5XU?si=MLgt7yW7M1eNTwt1",
    embedUrl: "https://www.youtube.com/embed/iLYfR3aH5XU?autoplay=1&mute=1",
    thumbnail: "https://img.youtube.com/vi/iLYfR3aH5XU/maxresdefault.jpg",
  },
  {
    id: "video-6",
    url: "https://youtu.be/-4rmg3bP8Qk?si=qnkOG1wolYg75xD1",
    embedUrl: "https://www.youtube.com/embed/-4rmg3bP8Qk?autoplay=1&mute=1",
    thumbnail: "https://img.youtube.com/vi/-4rmg3bP8Qk/maxresdefault.jpg",
  },
  {
    id: "video-7",
    url: "https://youtu.be/Q6cz7D6AOrc?si=bvZv1G_pPUGXB1yU",
    embedUrl: "https://www.youtube.com/embed/Q6cz7D6AOrc?autoplay=1&mute=1",
    thumbnail: "https://img.youtube.com/vi/Q6cz7D6AOrc/maxresdefault.jpg",
  },
  {
    id: "video-8",
    url: "https://youtu.be/Y0yGVjZqaAc?si=FQ13fFd-_qW5xDuk",
    embedUrl: "https://www.youtube.com/embed/Y0yGVjZqaAc?autoplay=1&mute=1",
    thumbnail: "https://img.youtube.com/vi/Y0yGVjZqaAc/maxresdefault.jpg",
  },
  {
    id: "video-9",
    url: "https://youtu.be/Yz6W4Db_5AU?si=TWK9Cr7C8csyUn-8",
    embedUrl: "https://www.youtube.com/embed/Yz6W4Db_5AU?autoplay=1&mute=1",
    thumbnail: "https://img.youtube.com/vi/Yz6W4Db_5AU/maxresdefault.jpg",
  },
  {
    id: "video-10",
    url: "https://youtu.be/4RkWMYpN9gE?si=yhOvO2xuVIZM8kCi",
    embedUrl: "https://www.youtube.com/embed/4RkWMYpN9gE?autoplay=1&mute=1",
    thumbnail: "https://img.youtube.com/vi/4RkWMYpN9gE/maxresdefault.jpg",
  },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const floatingAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

export default function Videos() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [hoveredVideo, setHoveredVideo] = useState<string | null>(null);
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);

  const closeModal = () => {
    setSelectedVideo(null);
  };

  const handleMouseEnter = (videoId: string) => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
    }
    
    hoverTimerRef.current = setTimeout(() => {
      setHoveredVideo(videoId);
    }, 800);
  };

  const handleMouseLeave = () => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
    
    setHoveredVideo(null);
  };

  return (
    <div className="pt-16 relative min-h-screen overflow-hidden">
      {/* Animated Background with Particles */}
      <div className="fixed inset-0 -z-10">
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${WEDDING_BG})`,
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.3) blur(3px)'
          }}
        />
        
        {/* Animated particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 10 + 2}px`,
              height: `${Math.random() * 10 + 2}px`,
              backgroundColor: i % 3 === 0 ? '#fecdd3' : i % 3 === 1 ? '#fde68a' : '#ddd6fe',
              opacity: Math.random() * 0.5 + 0.1,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, Math.random() * 20 - 10, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      
      {/* Hero Section with Enhanced Animation */}
      <div className="relative z-10 h-[60vh] flex flex-col items-center justify-center overflow-hidden">
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Floating decorative elements */}
          <motion.div 
            className="absolute top-1/4 left-1/4 text-accent/30"
            animate={floatingAnimation}
          >
            <Heart size={48} />
          </motion.div>
          <motion.div 
            className="absolute top-1/3 right-1/4 text-accent/30"
            animate={{
              ...floatingAnimation,
              transition: { ...floatingAnimation.transition, delay: 1 }
            }}
          >
            <Sparkles size={48} />
          </motion.div>
          <motion.div 
            className="absolute bottom-1/4 left-1/3 text-accent/30"
            animate={{
              ...floatingAnimation,
              transition: { ...floatingAnimation.transition, delay: 2 }
            }}
          >
            <Camera size={48} />
          </motion.div>
          <motion.div 
            className="absolute bottom-1/3 right-1/3 text-accent/30"
            animate={{
              ...floatingAnimation,
              transition: { ...floatingAnimation.transition, delay: 1.5 }
            }}
          >
            <Film size={48} />
          </motion.div>
        </motion.div>
        
        <motion.h1 
          className="text-6xl md:text-8xl font-playfair font-bold text-white tracking-wider text-center mb-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          CINEMATOGRAPHY
        </motion.h1>
        
        <motion.div
          className="flex gap-4 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {[1, 2, 3, 4, 5].map((star) => (
            <motion.div
              key={star}
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 15, 0]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                delay: star * 0.2
              }}
            >
              <Star className="w-8 h-8 fill-accent text-accent" />
            </motion.div>
          ))}
        </motion.div>
        
        <motion.p 
          className="text-xl text-white/80 mt-6 max-w-2xl text-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          Capturing your most precious moments with artistry and emotion
        </motion.p>
      </div>

      {/* Videos Section */}
      <section className="relative z-10 py-16 bg-gradient-to-b from-black/80 to-black/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-4xl sm:text-5xl font-playfair font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
            >
              Wedding Cinematography – Your Story, Beautifully Told
            </motion.h2>
            <motion.p 
              className="text-white text-xl max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
            >
              We transform real weddings into cinematic experiences. With years of legacy in wedding cinematography, 
              we specialize in visually rich, emotionally compelling wedding films.
            </motion.p>
          </motion.div>
          
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {VIDEOS.map((video, index) => (
              <motion.div
                key={video.id}
                variants={itemVariants}
                className="group cursor-pointer relative overflow-hidden rounded-2xl shadow-2xl hover:shadow-2xl transition-all duration-500 bg-black/30 backdrop-blur-sm border border-white/10"
                whileHover={{ 
                  scale: 1.03, 
                  y: -8,
                  boxShadow: "0 25px 50px -12px rgba(255, 255, 255, 0.25)"
                }}
                onClick={() => setSelectedVideo(video.embedUrl)}
                onMouseEnter={() => handleMouseEnter(video.id)}
                onMouseLeave={handleMouseLeave}
              >
                <motion.div 
                  className="relative aspect-video overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  {hoveredVideo === video.id ? (
                    <iframe
                      src={video.embedUrl}
                      title={video.title}
                      className="w-full h-full object-cover"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <>
                      <img 
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-center justify-center"
                        initial={{ opacity: 0.6 }}
                        whileHover={{ opacity: 0.9 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.div 
                          className="bg-accent/90 p-5 rounded-full backdrop-blur-sm border-2 border-white/20"
                          whileHover={{ 
                            scale: 1.2, 
                            rotate: 15,
                            backgroundColor: "rgba(var(--accent), 1)"
                          }}
                          transition={{ 
                            type: "spring", 
                            stiffness: 300,
                            damping: 10
                          }}
                        >
                          <Play className="w-10 h-10 text-white fill-current" />
                        </motion.div>
                      </motion.div>
                      
                      {/* Hover overlay effect */}
                      <motion.div 
                        className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        initial={false}
                      />
                    </>
                  )}
                </motion.div>
                
                {/* Subtle title appear on hover */}
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                >
                  <h3 className="text-white font-semibold text-lg text-center">
                    {video.title}
                  </h3>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <motion.section 
        className="relative z-10 py-16 bg-black/50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {[
              { number: "500+", label: "Weddings Captured" },
              { number: "4+", label: "Years Experience" },
              { number: "100%", label: "Client Satisfaction" },
              // { number: "24", label: "Awards Won" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center p-6 bg-black/30 rounded-2xl border border-white/10 backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: "rgba(255, 255, 255, 0.05)"
                }}
              >
                <motion.div 
                  className="text-4xl md:text-5xl font-bold text-accent mb-2"
                  initial={{ scale: 0.8 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                  viewport={{ once: true }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-white/80 text-sm md:text-base">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-6 right-6 z-10 text-white hover:text-accent hover:bg-white/10 rounded-full p-2"
              onClick={closeModal}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-8 h-8" />
            </Button>

            <motion.div
              className="w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl relative z-20"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={selectedVideo}
                title="YouTube video player"
                className="w-full h-full rounded-2xl"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}