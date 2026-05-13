import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import logo from "../images/Logo.png";

export default function BlogNavbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
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
        {/* Logo and Home */}
        <div className="flex items-center gap-2 group">
          <a href="/" className="flex items-center gap-2 group">
            <img src={logo} alt="Logo" className="w-20 h-20 object-contain" />
          </a>
        </div>

        {/* Home Link */}
        <a
          href="/"
          className="text-gray-700 hover:text-coral-600 transition-colors font-medium text-sm"
        >
          الصفحة الرئيسية
        </a>
      </div>
    </motion.nav>
  );
}
