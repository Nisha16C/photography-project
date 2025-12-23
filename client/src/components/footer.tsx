import { Link } from "wouter";
import { Instagram, Youtube, Phone, Mail, MapPin, Camera, Heart, ArrowRight } from "lucide-react";
import { PHOTOGRAPHER_INFO } from "@/lib/constants";
import { motion } from "framer-motion";

export default function Footer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <footer className="bg-black text-white relative overflow-hidden border-t border-white/10">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_transparent_0%,_#000000_100%)] opacity-80" />
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1542038784456-1ea0e93ca370?q=80&w=2070')] bg-cover bg-center opacity-10 blur-sm mix-blend-overlay" />

        {/* Animated Orbs */}
        <motion.div
          animate={{ x: [0, 50, 0], y: [0, 30, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-20 w-72 h-72 bg-blue-600/20 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{ x: [0, -50, 0], y: [0, -30, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 right-20 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <Link href="/">
              <a className="inline-block group cursor-pointer">
                <h3 className="text-4xl font-bold mb-4 flex items-center text-white group-hover:text-blue-400 transition-colors duration-300" style={{ fontFamily: "'Great Vibes', cursive" }}>
                  <Camera className="w-8 h-8 mr-3 text-blue-500 group-hover:rotate-12 transition-transform duration-300" />
                  {PHOTOGRAPHER_INFO.name}
                </h3>
              </a>
            </Link>
            <p className="text-gray-400 mb-8 leading-relaxed font-light text-sm tracking-wide">
              Crafting timeless visual narratives that capture the essence of your most cherished moments. Where artistry meets emotion.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: Instagram, href: PHOTOGRAPHER_INFO.instagram, label: "Instagram" },
                { icon: Youtube, href: PHOTOGRAPHER_INFO.youtube, label: "YouTube" },
                {
                  icon: (props: any) => (
                    <svg {...props} viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.52 3.48A11.88 11.88 0 0012 .75 11.97 11.97 0 001.8 10.2c0 2.11.55 4.14 1.6 5.95L.3 23.25l6.3-2.05A11.96 11.96 0 0012 21.75c6.63 0 11.92-5.37 11.92-12 0-1.99-.51-3.86-1.4-5.27zM12 19.5c-1.5 0-2.98-.4-4.28-1.15l-.3-.18-3.75 1.2 1.2-3.66-.18-.3A8.01 8.01 0 013 10.2 8.94 8.94 0 0112 3.75c4.96 0 9 4.16 9 9.25S16.96 19.5 12 19.5z" />
                      <path d="M17.1 14.1c-.3-.15-1.8-.9-2.06-1-.27-.12-.47-.15-.67.15s-.77 1-.95 1.2c-.18.24-.36.27-.67.09-.3-.18-1.27-.47-2.42-1.5-.9-.8-1.5-1.8-1.66-2.1-.17-.3 0-.47.12-.62.12-.12.3-.3.45-.45.15-.15.2-.27.3-.45.1-.18.04-.34-.02-.5-.06-.15-.67-1.62-.92-2.22-.24-.6-.49-.52-.67-.52-.18 0-.37-.02-.57-.02-.2 0-.5.07-.76.34-.27.27-1.01 1-1.01 2.46 0 1.47 1.03 2.9 1.17 3.1.15.2 2.03 3.1 4.92 4.32 2.9 1.2 2.9.8 3.42.75.52-.05 1.68-.66 1.92-1.3.24-.65.24-1.2.17-1.3-.07-.1-.27-.15-.57-.3z" />
                    </svg>
                  ),
                  href: PHOTOGRAPHER_INFO.whatsapp || `https://wa.me/91${PHOTOGRAPHER_INFO.phone.replace(/\D/g, "")}`,
                  label: "WhatsApp"
                }
              ].map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/5 hover:bg-blue-600 text-white p-3 rounded-full transition-all duration-300 border border-white/10 hover:border-transparent group/icon relative overflow-hidden"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent translate-y-full group-hover/icon:-translate-y-full transition-transform duration-500 ease-in-out" />
                  <social.icon className="w-5 h-5 relative z-10" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Navigation Links */}
          <motion.div variants={itemVariants} className="lg:col-span-1 lg:pl-8">
            <h4 className="text-xl font-bold mb-8 text-white relative inline-block">
              Explore
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-blue-500 rounded-full" />
            </h4>
            <ul className="space-y-4">
              {[
                { name: "Home", path: "/" },
                { name: "About", path: "/about" },
                { name: "Portfolio", path: "/portfolio" },
                { name: "Films", path: "/videos" },
                { name: "Contact", path: "/contact" }
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.path}>
                    <a className="text-gray-400 hover:text-blue-400 transition-all duration-300 flex items-center group w-fit">
                      <ArrowRight className="w-3 h-3 mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-blue-500" />
                      <span className="group-hover:translate-x-1 transition-transform duration-300">{item.name}</span>
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Information */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <h4 className="text-xl font-bold mb-8 text-white relative inline-block">
              Get in Touch
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-blue-500 rounded-full" />
            </h4>
            <div className="space-y-6">
              {[
                { icon: Phone, text: PHOTOGRAPHER_INFO.phone, label: "Call us" },
                { icon: Mail, text: PHOTOGRAPHER_INFO.email, label: "Email us" },
                { icon: MapPin, text: PHOTOGRAPHER_INFO.address, label: "Visit us" }
              ].map((item, idx) => (
                <div key={idx} className="flex group items-start">
                  <div className="bg-white/5 p-3 rounded-lg mr-4 group-hover:bg-blue-600/20 group-hover:text-blue-400 transition-colors duration-300 border border-white/5">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs text-gray-500 uppercase tracking-widest mb-1 font-semibold">{item.label}</span>
                    <span className="text-gray-300 group-hover:text-white transition-colors duration-300 text-sm leading-relaxed block max-w-[200px]">{item.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Newsletter / CTA */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <div className="bg-gradient-to-br from-blue-900/40 to-black p-6 rounded-2xl border border-blue-500/20 backdrop-blur-md relative overflow-hidden group">
              <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <h4 className="text-lg font-bold mb-3 text-white relative z-10">Ready for your shoot?</h4>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed relative z-10">
                Let's create something extraordinary together. Book your session now.
              </p>
              <Link href="/contact">
                <a className="inline-flex w-full items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-blue-600/50 relative z-10 font-medium text-sm">
                  Book Consultation <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Link>
            </div>
          </motion.div>
        </motion.div>

        {/* Footer Bottom */}
        <motion.div
          className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} {PHOTOGRAPHER_INFO.name}. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm flex items-center gap-2 group cursor-default">
            Made with <Heart className="w-4 h-4 text-red-500 fill-red-500 group-hover:animate-ping" /> for creators
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
