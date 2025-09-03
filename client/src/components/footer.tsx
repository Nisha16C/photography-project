import { Link } from "wouter";
import { Instagram, Youtube, Phone, Mail, MapPin } from "lucide-react";
import { PHOTOGRAPHER_INFO } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-playfair font-semibold mb-4" data-testid="footer-title">
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
