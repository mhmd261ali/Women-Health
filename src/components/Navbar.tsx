import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import logo from "../images/Logo.png";

const navLinks = [
  { label: "حول", href: "#about" },
  { label: "الخدمات", href: "#services" },
  { label: "لماذا أنا", href: "#why-me" },
  // { label: "الشهادات", href: "#certificates" },
  { label: "المدونة", href: "/blog" },
  { label: "اتصل", href: "#contact" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("/")) {
      navigate(href);
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/90 backdrop-blur-md shadow-[0_4px_24px_rgba(212,117,106,0.12)]"
            : "bg-transparent"
        }`}
        dir="rtl"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNav("/")}
            className="flex items-center gap-2 group"
          >
            <img src={logo} alt="Logo" className="w-20 h-20 object-contain" />
          </button>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className={`text-sm font-medium transition-colors duration-200 hover:text-coral-500 ${
                  scrolled ? "text-sage-700" : "text-sage-600"
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleNav("#contact")}
              className="px-5 py-2 rounded-full bg-coral-gradient text-white text-sm font-medium shadow-md hover:shadow-[0_4px_20px_rgba(212,117,106,0.4)] hover:scale-105 transition-all duration-200"
            >
              احجز الآن
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-full hover:bg-coral-100 transition-colors"
          >
            {mobileOpen ? (
              <X className="w-5 h-5 text-coral-600" />
            ) : (
              <Menu className="w-5 h-5 text-coral-600" />
            )}
          </button>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-black/30 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <div
              className="absolute right-0 top-0 bottom-0 w-72 bg-white shadow-2xl flex flex-col pt-20 px-8 gap-2"
              dir="rtl"
            >
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className="text-right py-3 text-sage-700 font-medium border-b border-cream-200 hover:text-coral-500 transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => handleNav("#contact")}
                className="mt-6 px-5 py-3 rounded-full bg-coral-gradient text-white font-medium text-center shadow-md"
              >
                احجز استشارة
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
