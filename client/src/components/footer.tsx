import { Link } from "wouter";
import { Instagram, Youtube, Phone, Mail, MapPin, Camera, Heart } from "lucide-react";
import { PHOTOGRAPHER_INFO } from "@/lib/constants";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white py-16 relative overflow-hidden border-t border-blue-500/20">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-blue-600 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold mb-4 flex items-center text-blue-400" style={{ fontFamily: "'Great Vibes', cursive" }} data-testid="footer-title">
              <Camera className="w-8 h-8 mr-3 text-blue-400" />
              {PHOTOGRAPHER_INFO.name}
            </h3>
            <p className="text-white/70 mb-6 leading-relaxed" style={{ fontFamily: "'Cormorant Garamond', serif" }} data-testid="footer-description">
              Crafting timeless wedding films and capturing life's most precious moments with artistic vision and cinematic excellence.
            </p>
            <div className="flex space-x-4">
              <a
                href={PHOTOGRAPHER_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-blue-500 text-white p-3 rounded-full transition-all hover:scale-110 backdrop-blur-sm border border-white/20"
                data-testid="link-instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>

              <a
                href={PHOTOGRAPHER_INFO.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-blue-500 text-white p-3 rounded-full transition-all hover:scale-110 backdrop-blur-sm border border-white/20"
                data-testid="link-youtube"
              >
                <Youtube className="w-5 h-5" />
              </a>

              <a
                href={PHOTOGRAPHER_INFO.whatsapp || `https://wa.me/91${PHOTOGRAPHER_INFO.phone.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-blue-500 text-white p-3 rounded-full transition-all hover:scale-110 backdrop-blur-sm border border-white/20"
                aria-label="Chat on WhatsApp"
                data-testid="link-whatsapp"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M20.52 3.48A11.88 11.88 0 0012 .75 11.97 11.97 0 001.8 10.2c0 2.11.55 4.14 1.6 5.95L.3 23.25l6.3-2.05A11.96 11.96 0 0012 21.75c6.63 0 11.92-5.37 11.92-12 0-1.99-.51-3.86-1.4-5.27zM12 19.5c-1.5 0-2.98-.4-4.28-1.15l-.3-.18-3.75 1.2 1.2-3.66-.18-.3A8.01 8.01 0 013 10.2 8.94 8.94 0 0112 3.75c4.96 0 9 4.16 9 9.25S16.96 19.5 12 19.5z" />
                  <path d="M17.1 14.1c-.3-.15-1.8-.9-2.06-1-.27-.12-.47-.15-.67.15s-.77 1-.95 1.2c-.18.24-.36.27-.67.09-.3-.18-1.27-.47-2.42-1.5-.9-.8-1.5-1.8-1.66-2.1-.17-.3 0-.47.12-.62.12-.12.3-.3.45-.45.15-.15.2-.27.3-.45.1-.18.04-.34-.02-.5-.06-.15-.67-1.62-.92-2.22-.24-.6-.49-.52-.67-.52-.18 0-.37-.02-.57-.02-.2 0-.5.07-.76.34-.27.27-1.01 1-1.01 2.46 0 1.47 1.03 2.9 1.17 3.1.15.2 2.03 3.1 4.92 4.32 2.9 1.2 2.9.8 3.42.75.52-.05 1.68-.66 1.92-1.3.24-.65.24-1.2.17-1.3-.07-.1-.27-.15-.57-.3z" fill="#fff" />
                </svg>
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-2xl font-bold mb-6 text-blue-400" style={{ fontFamily: "'Tangerine', cursive", fontWeight: 700 }} data-testid="footer-quick-links-title">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link href="/"><span className="text-white/70 hover:text-blue-400 transition-colors cursor-pointer flex items-center group" data-testid="footer-link-home"><Heart className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />Home</span></Link></li>
              <li><Link href="/about"><span className="text-white/70 hover:text-blue-400 transition-colors cursor-pointer flex items-center group" data-testid="footer-link-about"><Heart className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />About</span></Link></li>
              <li><Link href="/portfolio"><span className="text-white/70 hover:text-blue-400 transition-colors cursor-pointer flex items-center group" data-testid="footer-link-portfolio"><Heart className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />Portfolio</span></Link></li>
              <li><Link href="/videos"><span className="text-white/70 hover:text-blue-400 transition-colors cursor-pointer flex items-center group" data-testid="footer-link-services"><Heart className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />Films</span></Link></li>
              <li><Link href="/contact"><span className="text-white/70 hover:text-blue-400 transition-colors cursor-pointer flex items-center group" data-testid="footer-link-contact"><Heart className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />Contact</span></Link></li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h4 className="text-2xl font-bold mb-6 text-blue-400" style={{ fontFamily: "'Tangerine', cursive", fontWeight: 700 }} data-testid="footer-contact-info-title">Contact Info</h4>
            <div className="space-y-4 text-white/70">
              <div className="flex items-center group hover:text-blue-400 transition-colors">
                <div className="bg-blue-500/20 p-2 rounded-lg mr-3 group-hover:bg-blue-500/40 transition-colors">
                  <Phone className="w-4 h-4 text-blue-400" />
                </div>
                <span data-testid="footer-phone">{PHOTOGRAPHER_INFO.phone}</span>
              </div>
              <div className="flex items-center group hover:text-blue-400 transition-colors">
                <div className="bg-blue-500/20 p-2 rounded-lg mr-3 group-hover:bg-blue-500/40 transition-colors">
                  <Mail className="w-4 h-4 text-blue-400" />
                </div>
                <span data-testid="footer-email" className="break-all">{PHOTOGRAPHER_INFO.email}</span>
              </div>
              <div className="flex items-start group hover:text-blue-400 transition-colors">
                <div className="bg-blue-500/20 p-2 rounded-lg mr-3 flex-shrink-0 group-hover:bg-blue-500/40 transition-colors">
                  <MapPin className="w-4 h-4 text-blue-400" />
                </div>
                <span data-testid="footer-address">{PHOTOGRAPHER_INFO.address}</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/50 text-sm" data-testid="footer-copyright">
              © 2024 {PHOTOGRAPHER_INFO.name} Photography. All rights reserved.
            </p>
            <p className="text-white/50 text-sm flex items-center gap-2">
              <Heart className="w-4 h-4 text-blue-400 fill-blue-400" />
              <span style={{ fontFamily: "'Cormorant Garamond', serif" }}>Crafted with passion for timeless memories</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
