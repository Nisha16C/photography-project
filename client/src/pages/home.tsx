import HeroSlideshow from "@/components/hero-slideshow";
import FeaturedWork from "@/components/featured-work";
import WhyChooseUs from "@/components/why-choose-us";
import Testimonials from "@/components/testimonials";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LOCAL_IMAGES } from "@/lib/constants";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";



// Services data for the services section
const servicesData = [
  {
    id: "photography",
    title: "PHOTOGRAPHY",
    description: "Candid photography (focusing on natural candid shots of the bride-groom and main family) & traditional photography (coverage of the entire event)."
  },
  {
    id: "wedding-films",
    title: "WEDDING FILMS",
    description: "Cinematic wedding films (artistic storytelling focused on the bride-groom and main family with their priceless candid moments) & traditional coverage (complete documentation of your entire event)."
  },
  {
    id: "photobooks",
    title: "PHOTOBOOKS & ALBUMS",
    description: "Handcrafted custom designed wedding photo books and albums to cater to every taste and preference."
  },
  {
    id: "post-production",
    title: "LUXURY WEDDING FILMS",
    description: "Premium editing services including cinematic teasers, short films, and traditional videos with a luxury touch."
  }
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [userReviews, setUserReviews] = useState<Array<{
    initial: string;
    name: string;
    time: string;
    rating: number;
    text: string;
    date?: Date;
  }>>([]);
  const [newReview, setNewReview] = useState({
    name: "",
    rating: 5,
    text: ""
  });


  // Update review times periodically
  useEffect(() => {
    if (userReviews.length === 0) return;

    const updateTimes = () => {
      setUserReviews(prevReviews =>
        prevReviews.map((review: { initial: string; name: string; time: string; rating: number; text: string; date?: Date }) => ({
          ...review,
          time: review.date ? formatTimeAgo(review.date) : review.time
        }))
      );
    };

    // Update times every minute
    const timeUpdateInterval = setInterval(updateTimes, 60000);

    return () => clearInterval(timeUpdateInterval);
  }, [userReviews.length]);



  // State for success message
  const [showSuccess, setShowSuccess] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Format time function
  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "Just now";

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;

    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) return `${diffInMonths} ${diffInMonths === 1 ? 'month' : 'months'} ago`;

    const diffInYears = Math.floor(diffInMonths / 12);
    return `${diffInYears} ${diffInYears === 1 ? 'year' : 'years'} ago`;
  };

  // Handle review submission
  const handleReviewSubmit = () => {
    if (newReview.name.trim() === "" || newReview.text.trim() === "") {
      return; // Don't submit empty reviews
    }

    const currentDate = new Date();
    const timeString = formatTimeAgo(currentDate);

    const newUserReview = {
      initial: newReview.name.charAt(0).toUpperCase(),
      name: newReview.name,
      time: timeString,
      rating: newReview.rating,
      text: newReview.text,
      date: currentDate // Store the actual date for future formatting
    };

    setUserReviews(prev => [newUserReview, ...prev]);
    setNewReview({
      name: "",
      rating: 5,
      text: ""
    });

    // Show success message and close dialog
    setShowSuccess(true);
    setDialogOpen(false);

    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };


  // Animation for the moving background text
  const backgroundTextVariants = {
    animate: {
      x: ["-100%", "0%"],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 20,
          ease: "linear",
        },
      },
    },
  };

  return (
    <div className="pt-16">
      <HeroSlideshow />

      {/* Services Section with Moving Background Text */}
      <section className="py-16 relative overflow-hidden bg-black">
        {/* Moving background text */}
        <div className="absolute inset-0 overflow-hidden opacity-5 select-none pointer-events-none">
          <motion.div
            className="whitespace-nowrap text-[20rem] font-bold text-white"
            variants={backgroundTextVariants}
            animate="animate"
          >
            SERVICES SERVICES SERVICES SERVICES SERVICES SERVICES
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-white">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-4 text-blue-400" style={{ fontFamily: "'Tangerine', cursive", fontWeight: 700 }} data-testid="services-title">
              OUR SERVICES
            </h2>
            <div className="w-24 h-1 bg-blue-400 mx-auto mt-6 mb-8"></div>
            <p className="text-white/80 text-lg max-w-3xl mx-auto" data-testid="services-subtitle">
              We offer a comprehensive range of photography and luxury wedding films services to capture your special moments
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {servicesData.map((service: { id: string; title: string; description: string }, index: number) => (
              <motion.div
                key={service.id}
                className="bg-gradient-to-b from-black/80 to-black/40 backdrop-blur-sm p-8 rounded-lg border border-white/10 hover:border-accent/30 transition-all group hover:bg-black/60"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                data-testid={`service-card-${index}`}
              >
                <h3 className="text-xl font-playfair font-semibold mb-4 text-white group-hover:text-accent transition-colors" data-testid={`service-title-${index}`}>
                  {service.title}
                </h3>
                <div className="w-12 h-0.5 bg-accent mb-4 transition-all group-hover:w-16"></div>
                <p className="text-white/70 group-hover:text-white/90 transition-colors" data-testid={`service-description-${index}`}>
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* View All Services Button */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <a href="/services">
              <motion.button
                className="px-10 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(59, 130, 246, 0.5)" }}
                whileTap={{ scale: 0.95 }}
              >
                View All Services & Packages
              </motion.button>
            </a>
          </motion.div>
        </div>
      </section>

      <FeaturedWork />
      <WhyChooseUs />
      <Testimonials />



    </div>
  );
}
