import { motion } from "framer-motion";
import { Instagram, Facebook, Youtube, Mail, Phone, Heart } from "lucide-react";
import LogoIcon from "./LogoIcon";

const navLinks = [
  { label: "حول", href: "#about" },
  { label: "الخدمات", href: "#services" },
  { label: "لماذا أنا", href: "#why-me" },
  { label: "الشهادات", href: "#certificates" },
  { label: "اتصل", href: "#contact" },
];

const socials = [
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
];

export default function Footer() {
  const scrollTo = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer
      className="relative overflow-hidden pt-16 pb-8"
      style={{
        background:
          "linear-gradient(135deg, #4A3530 0%, #3A2A26 50%, #2E3A2C 100%)",
      }}
    >
      {/* Top wave */}
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{
          background: "linear-gradient(90deg, #D4756A, #8A9E84, #D4756A)",
        }}
      />

      {/* Decorative blobs */}
      <div
        className="absolute bottom-0 right-0 w-72 h-72 rounded-full blur-3xl opacity-10"
        style={{ background: "radial-gradient(circle, #D4756A, transparent)" }}
      />
      <div
        className="absolute top-0 left-0 w-56 h-56 rounded-full blur-3xl opacity-8"
        style={{ background: "radial-gradient(circle, #8A9E84, transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10" dir="rtl">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span
                className="text-xl font-bold text-white"
                style={{ fontFamily: "Georgia, serif" }}
              >
                د. سارة الصحة والعافية
              </span>
              <div className="w-9 h-9 flex items-center justify-center">
                <LogoIcon className="w-9 h-9" />
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs mb-6">
              ملتزمة بمساعدة النساء على الشعور بقوة أكبر وصحة أفضل وثقة أعمق من
              خلال التدريب الشخصي والعلاج الفيزيائي والرعاية الشاملة.
            </p>
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -2 }}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200"
                  style={{ background: "rgba(255,255,255,0.1)" }}
                  aria-label={label}
                >
                  <Icon className="w-4.5 h-4.5 text-white/80" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5 tracking-wide">
              الروابط السريعة
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-white/60 hover:text-coral-300 text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5 tracking-wide">
              اتصل
            </h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(212,117,106,0.2)" }}
                >
                  <Mail className="w-3.5 h-3.5 text-coral-400" />
                </div>
                {/* Replace with your email */}
                <span className="text-white/60 text-sm">hello@drsarah.com</span>
              </li>
              <li className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(138,158,132,0.2)" }}
                >
                  <Phone className="w-3.5 h-3.5 text-sage-400" />
                </div>
                {/* Replace with your phone */}
                <span className="text-white/60 text-sm">+1 (555) 234-5678</span>
              </li>
            </ul>

            {/* CTA */}
            <button
              onClick={() => scrollTo("#contact")}
              className="mt-6 w-full py-3 rounded-xl text-white text-sm font-semibold hover:opacity-90 hover:scale-105 transition-all duration-200"
              style={{
                background: "linear-gradient(135deg, #E8776F, #D4756A)",
              }}
            >
              Book a Session
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-white/40 text-xs"
          style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
        >
          <span>
            {/* Replace with your name and year */}© {new Date().getFullYear()}{" "}
            Dr. Sarah Wellness. All rights reserved.
          </span>
          <span className="flex items-center gap-1">
            Made with{" "}
            <Heart className="w-3 h-3 text-coral-400 fill-coral-400 inline mx-0.5" />{" "}
            for women's health
          </span>
        </div>
      </div>
    </footer>
  );
}
