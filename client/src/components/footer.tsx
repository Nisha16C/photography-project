import { Link } from "wouter";
import { Instagram, Youtube, Phone, Mail, MapPin, Camera } from "lucide-react";
import { PHOTOGRAPHER_INFO } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-playfair font-semibold mb-4 flex items-center" data-testid="footer-title">
              <Camera className="w-6 h-6 mr-2 text-primary-foreground" />
              {PHOTOGRAPHER_INFO.name}
            </h3>
            <p className="text-primary-foreground/80 mb-4" data-testid="footer-description">
              Professional photographer specializing in weddings, events, and family photography across Madhya Pradesh.
            </p>
            <div className="flex space-x-4">
              <a 
                href={PHOTOGRAPHER_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-foreground/80 hover:text-accent transition-colors"
                data-testid="link-instagram"
              >
                <Instagram className="w-6 h-6" />
              </a>

              <a 
                href={PHOTOGRAPHER_INFO.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-foreground/80 hover:text-accent transition-colors"
                data-testid="link-youtube"
              >
                <Youtube className="w-6 h-6" />
              </a>

              <a
                href={PHOTOGRAPHER_INFO.whatsapp || `https://wa.me/91${PHOTOGRAPHER_INFO.phone.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-foreground/80 hover:text-accent transition-colors"
                aria-label="Chat on WhatsApp"
                data-testid="link-whatsapp"
              >
                {/* WhatsApp SVG or icon component */}
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M20.52 3.48A11.88 11.88 0 0012 .75 11.97 11.97 0 001.8 10.2c0 2.11.55 4.14 1.6 5.95L.3 23.25l6.3-2.05A11.96 11.96 0 0012 21.75c6.63 0 11.92-5.37 11.92-12 0-1.99-.51-3.86-1.4-5.27zM12 19.5c-1.5 0-2.98-.4-4.28-1.15l-.3-.18-3.75 1.2 1.2-3.66-.18-.3A8.01 8.01 0 013 10.2 8.94 8.94 0 0112 3.75c4.96 0 9 4.16 9 9.25S16.96 19.5 12 19.5z" />
                  <path d="M17.1 14.1c-.3-.15-1.8-.9-2.06-1-.27-.12-.47-.15-.67.15s-.77 1-.95 1.2c-.18.24-.36.27-.67.09-.3-.18-1.27-.47-2.42-1.5-.9-.8-1.5-1.8-1.66-2.1-.17-.3 0-.47.12-.62.12-.12.3-.3.45-.45.15-.15.2-.27.3-.45.1-.18.04-.34-.02-.5-.06-.15-.67-1.62-.92-2.22-.24-.6-.49-.52-.67-.52-.18 0-.37-.02-.57-.02-.2 0-.5.07-.76.34-.27.27-1.01 1-1.01 2.46 0 1.47 1.03 2.9 1.17 3.1.15.2 2.03 3.1 4.92 4.32 2.9 1.2 2.9.8 3.42.75.52-.05 1.68-.66 1.92-1.3.24-.65.24-1.2.17-1.3-.07-.1-.27-.15-.57-.3z" fill="#fff" />
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4" data-testid="footer-quick-links-title">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/"><span className="text-primary-foreground/80 hover:text-accent transition-colors cursor-pointer" data-testid="footer-link-home">Home</span></Link></li>
              <li><Link href="/about"><span className="text-primary-foreground/80 hover:text-accent transition-colors cursor-pointer" data-testid="footer-link-about">About</span></Link></li>
              <li><Link href="/portfolio"><span className="text-primary-foreground/80 hover:text-accent transition-colors cursor-pointer" data-testid="footer-link-portfolio">Portfolio</span></Link></li>
              <li><Link href="/services"><span className="text-primary-foreground/80 hover:text-accent transition-colors cursor-pointer" data-testid="footer-link-services">Services</span></Link></li>
              <li><Link href="/contact"><span className="text-primary-foreground/80 hover:text-accent transition-colors cursor-pointer" data-testid="footer-link-contact">Contact</span></Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4" data-testid="footer-contact-info-title">Contact Info</h4>
            <div className="space-y-3 text-primary-foreground/80">
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                <span data-testid="footer-phone">{PHOTOGRAPHER_INFO.phone}</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                <span data-testid="footer-email">{PHOTOGRAPHER_INFO.email}</span>
              </div>
              <div className="flex items-start">
                <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                <span data-testid="footer-address">{PHOTOGRAPHER_INFO.address}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/60">
          <p data-testid="footer-copyright">
            &copy; 2024 {PHOTOGRAPHER_INFO.name} Photography. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
