import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/images/logo3.png";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About Me", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Films", href: "/videos" },
  { label: "Contact", href: "/contact" },
];

export default function Navigation() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/90 backdrop-blur-xl border-b border-white/8 shadow-lg"
          : "bg-transparent border-b border-transparent"
      }`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center group">
              <motion.img
                src={logo}
                alt="Himanshu Photography"
                className="h-12 sm:h-10 bg-white/5 backdrop-blur-sm rounded"
                whileHover={{ scale: 1.04, filter: "brightness(1.15)" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item, i) => {
              const isActive = location === item.href;
              return (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
                >
                  <Link href={item.href}>
                    <span
                      className="relative px-4 py-2 text-sm font-medium cursor-pointer group block"
                      data-testid={`nav-${item.label.toLowerCase()}`}
                    >
                      {/* Text */}
                      <span
                        className={`transition-colors duration-300 ${
                          isActive
                            ? "text-[hsl(38,92%,58%)]"
                            : "text-white/80 group-hover:text-white"
                        }`}
                      >
                        {item.label}
                      </span>

                      {/* Gold underline */}
                      <span
                        className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-gradient-to-r from-[hsl(38,92%,58%)] to-[hsl(45,100%,72%)] rounded-full transition-all duration-300 ${
                          isActive ? "w-full" : "w-0 group-hover:w-4/5"
                        }`}
                      />

                      {/* Active dot */}
                      {isActive && (
                        <motion.span
                          layoutId="nav-dot"
                          className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[hsl(38,92%,58%)]"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                    </span>
                  </Link>
                </motion.div>
              );
            })}

            {/* Book Now CTA */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="ml-4"
            >
              <Link href="/contact">
                <motion.span
                  className="btn-gold px-5 py-2 rounded-full text-sm font-semibold cursor-pointer inline-block"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Book Now
                </motion.span>
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <motion.button
                  className="text-white p-2 rounded-lg glass"
                  whileTap={{ scale: 0.92 }}
                  data-testid="button-mobile-menu"
                >
                  <AnimatePresence mode="wait">
                    {isOpen ? (
                      <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                        <X className="h-6 w-6" />
                      </motion.span>
                    ) : (
                      <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                        <Menu className="h-6 w-6" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[280px] bg-black/95 backdrop-blur-2xl border-l border-white/10 p-0"
              >
                {/* Mobile header */}
                <div className="p-6 border-b border-white/10">
                  <img src={logo} alt="Logo" className="h-10 bg-white/5 rounded" />
                </div>
                <div className="flex flex-col p-4 mt-2">
                  {navItems.map((item, i) => {
                    const isActive = location === item.href;
                    return (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.07, duration: 0.35 }}
                      >
                        <Link href={item.href} onClick={() => setIsOpen(false)}>
                          <span
                            className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-medium cursor-pointer transition-all duration-200 mb-1 ${
                              isActive
                                ? "bg-[hsl(38,92%,58%)]/15 text-[hsl(38,92%,58%)] border border-[hsl(38,92%,58%)]/30"
                                : "text-white/70 hover:text-white hover:bg-white/5"
                            }`}
                            data-testid={`mobile-nav-${item.label.toLowerCase()}`}
                          >
                            {isActive && (
                              <span className="w-1.5 h-1.5 rounded-full bg-[hsl(38,92%,58%)] flex-shrink-0" />
                            )}
                            {item.label}
                          </span>
                        </Link>
                      </motion.div>
                    );
                  })}

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45, duration: 0.35 }}
                    className="mt-4 px-4"
                  >
                    <Link href="/contact" onClick={() => setIsOpen(false)}>
                      <span className="btn-gold w-full py-3 rounded-xl text-sm font-semibold text-center cursor-pointer block">
                        Book a Session
                      </span>
                    </Link>
                  </motion.div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
