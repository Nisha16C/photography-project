import { Link } from "wouter";
import { Instagram, Youtube, Phone, Mail, MapPin, Camera, Heart } from "lucide-react";
import { PHOTOGRAPHER_INFO } from "@/lib/constants";
import { motion } from "framer-motion";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Films", href: "/videos" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="relative bg-black text-white overflow-hidden">
      {/* Top border glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(38,92%,58%)]/60 to-transparent" />

      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-80 h-80 bg-[hsl(38,92%,58%)]/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[hsl(38,92%,58%)]/4 rounded-full blur-[100px]" />
        {/* Grain */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          {/* Brand section */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3
              className="text-4xl font-bold mb-2 gradient-text-gold flex items-center gap-3"
              style={{ fontFamily: "'Great Vibes', cursive" }}
              data-testid="footer-title"
            >
              <Camera className="w-7 h-7 text-[hsl(38,92%,58%)]" />
              {PHOTOGRAPHER_INFO.name}
            </h3>
            <div className="w-12 h-0.5 bg-gradient-to-r from-[hsl(38,92%,58%)] to-transparent mb-5" />
            <p
              className="text-white/50 mb-7 leading-relaxed text-sm"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
              data-testid="footer-description"
            >
              Crafting timeless wedding films and capturing life's most precious moments with artistic vision and cinematic excellence.
            </p>

            {/* Social icons */}
            <div className="flex space-x-3">
              {/* Instagram */}
              <motion.a
                href={PHOTOGRAPHER_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-10 h-10 rounded-full flex items-center justify-center glass border border-white/10 text-white/60 overflow-hidden group"
                whileHover={{ scale: 1.12, y: -2 }}
                whileTap={{ scale: 0.94 }}
                data-testid="link-instagram"
                aria-label="Instagram"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)" }}
                />
                <Instagram className="w-4 h-4 relative z-10 group-hover:text-white transition-colors" />
              </motion.a>

              {/* YouTube */}
              <motion.a
                href={PHOTOGRAPHER_INFO.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-10 h-10 rounded-full flex items-center justify-center glass border border-white/10 text-white/60 overflow-hidden group"
                whileHover={{ scale: 1.12, y: -2 }}
                whileTap={{ scale: 0.94 }}
                data-testid="link-youtube"
                aria-label="YouTube"
              >
                <div className="absolute inset-0 bg-[#FF0000] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Youtube className="w-4 h-4 relative z-10 group-hover:text-white transition-colors" />
              </motion.a>

              {/* WhatsApp */}
              <motion.a
                href={PHOTOGRAPHER_INFO.whatsapp || `https://wa.me/91${PHOTOGRAPHER_INFO.phone.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-10 h-10 rounded-full flex items-center justify-center glass border border-white/10 text-white/60 overflow-hidden group"
                whileHover={{ scale: 1.12, y: -2 }}
                whileTap={{ scale: 0.94 }}
                aria-label="Chat on WhatsApp"
                data-testid="link-whatsapp"
              >
                <div className="absolute inset-0 bg-[#25D366] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <svg className="w-4 h-4 relative z-10 group-hover:text-white transition-colors fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M20.52 3.48A11.88 11.88 0 0012 .75 11.97 11.97 0 001.8 10.2c0 2.11.55 4.14 1.6 5.95L.3 23.25l6.3-2.05A11.96 11.96 0 0012 21.75c6.63 0 11.92-5.37 11.92-12 0-1.99-.51-3.86-1.4-5.27zM12 19.5c-1.5 0-2.98-.4-4.28-1.15l-.3-.18-3.75 1.2 1.2-3.66-.18-.3A8.01 8.01 0 013 10.2 8.94 8.94 0 0112 3.75c4.96 0 9 4.16 9 9.25S16.96 19.5 12 19.5z" />
                  <path d="M17.1 14.1c-.3-.15-1.8-.9-2.06-1-.27-.12-.47-.15-.67.15s-.77 1-.95 1.2c-.18.24-.36.27-.67.09-.3-.18-1.27-.47-2.42-1.5-.9-.8-1.5-1.8-1.66-2.1-.17-.3 0-.47.12-.62.12-.12.3-.3.45-.45.15-.15.2-.27.3-.45.1-.18.04-.34-.02-.5-.06-.15-.67-1.62-.92-2.22-.24-.6-.49-.52-.67-.52-.18 0-.37-.02-.57-.02-.2 0-.5.07-.76.34-.27.27-1.01 1-1.01 2.46 0 1.47 1.03 2.9 1.17 3.1.15.2 2.03 3.1 4.92 4.32 2.9 1.2 2.9.8 3.42.75.52-.05 1.68-.66 1.92-1.3.24-.65.24-1.2.17-1.3-.07-.1-.27-.15-.57-.3z" />
                </svg>
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            viewport={{ once: true }}
          >
            <h4
              className="text-3xl font-bold mb-2 gradient-text-gold"
              style={{ fontFamily: "'Tangerine', cursive", fontWeight: 700 }}
              data-testid="footer-quick-links-title"
            >
              Quick Links
            </h4>
            <div className="w-12 h-0.5 bg-gradient-to-r from-[hsl(38,92%,58%)] to-transparent mb-6" />
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span
                      className="text-white/50 hover:text-[hsl(38,92%,58%)] transition-colors cursor-pointer flex items-center gap-2 group text-sm"
                      data-testid={`footer-link-${link.label.toLowerCase()}`}
                    >
                      <span className="w-0 group-hover:w-3 h-px bg-[hsl(38,92%,58%)] transition-all duration-300" />
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4
              className="text-3xl font-bold mb-2 gradient-text-gold"
              style={{ fontFamily: "'Tangerine', cursive", fontWeight: 700 }}
              data-testid="footer-contact-info-title"
            >
              Contact Info
            </h4>
            <div className="w-12 h-0.5 bg-gradient-to-r from-[hsl(38,92%,58%)] to-transparent mb-6" />
            <div className="space-y-4">
              {[
                { Icon: Phone, text: PHOTOGRAPHER_INFO.phone, testId: "footer-phone" },
                { Icon: Mail, text: PHOTOGRAPHER_INFO.email, testId: "footer-email", extra: "break-all" },
                { Icon: MapPin, text: PHOTOGRAPHER_INFO.address, testId: "footer-address" },
              ].map(({ Icon, text, testId, extra }) => (
                <div key={testId} className="flex items-start gap-3 group">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg glass-gold flex items-center justify-center border border-[hsl(38,92%,58%)]/20 group-hover:border-[hsl(38,92%,58%)]/50 transition-colors mt-0.5">
                    <Icon className="w-3.5 h-3.5 text-[hsl(38,92%,58%)]" />
                  </div>
                  <span className={`text-white/50 group-hover:text-white/80 transition-colors text-sm ${extra || ""}`} data-testid={testId}>
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Separator */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
          <div className="relative flex justify-center">
            <div className="bg-black px-4">
              <Heart className="w-4 h-4 text-[hsl(38,92%,58%)] fill-current animate-pulse" />
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-white/30 text-xs" data-testid="footer-copyright">
            © 2024 {PHOTOGRAPHER_INFO.name} Photography. All rights reserved.
          </p>
          <p className="text-white/30 text-xs flex items-center gap-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            <span className="gradient-text-gold">Crafted with passion</span>
            <span>for timeless memories</span>
          </p>
        </div>
      </div>
    </footer>
  );
}