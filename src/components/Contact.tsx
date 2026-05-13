import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  MessageCircle,
  Send,
  CheckCircle,
} from "lucide-react";

const services = [
  "التدريب الشخصي",
  "العلاج الطبيعي وإعادة التأهيل",
  "التعافي بعد الولادة",
  "استشارة الرضاعة الطبيعية",
  "إرشاد صحة المرأة",
  "تحسين الحركة وإدارة الألم",
];

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // استبدلي هذا بمنطق إرسال النموذج الحقيقي
    await new Promise((r) => setTimeout(r, 1200));

    setLoading(false);
    setSubmitted(true);
  };

  const inputClass =
    "w-full px-5 py-3.5 rounded-2xl bg-white/70 backdrop-blur-sm border border-cream-300 text-sage-800 placeholder-sage-400 text-sm focus:outline-none focus:border-coral-400 focus:ring-2 focus:ring-coral-200 transition-all duration-200 text-right";

  return (
    <section
      id="contact"
      dir="rtl"
      className="py-24 relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #FFF5F2 0%, #F4F6F3 100%)",
      }}
    >
      {/* Background decoration */}
      <div
        className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-20"
        style={{ background: "radial-gradient(circle, #D4756A, transparent)" }}
      />
      <div
        className="absolute top-0 right-0 w-72 h-72 rounded-full blur-3xl opacity-15"
        style={{ background: "radial-gradient(circle, #8A9E84, transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div
            className="inline-block px-4 py-1.5 rounded-full text-sm font-medium text-coral-600 mb-6"
            style={{
              background: "rgba(212,117,106,0.1)",
              border: "1px solid rgba(212,117,106,0.25)",
            }}
          >
            تواصلي معي
          </div>

          <h2
            className="text-4xl lg:text-5xl font-bold mb-5"
            style={{ fontFamily: "Georgia, serif", color: "#4A3530" }}
          >
            هل أنتِ مستعدة لبدء
            <span style={{ color: "#D4756A" }}>
              {" "}
              رحلتكِ نحو الصحة والرفاهية؟
            </span>
          </h2>

          <p className="text-sage-600 text-lg max-w-2xl mx-auto leading-relaxed">
            تواصلي معي اليوم لحجز استشارة أو لمعرفة المزيد حول كيفية دعم أهدافكِ
            الصحية بطريقة تناسب احتياجاتكِ الخاصة.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Contact info sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2 space-y-5"
          >
            {/* Info cards */}
            {[
              {
                icon: Mail,
                label: "البريد الإلكتروني",
                // Replace with your email
                value: "hello@drsarah.com",
                href: "mailto:hello@drsarah.com",
                color: "#D4756A",
                bg: "rgba(212,117,106,0.1)",
              },
              {
                icon: Phone,
                label: "رقم الهاتف",
                // Replace with your phone number
                value: "+1 (555) 234-5678",
                href: "tel:+15552345678",
                color: "#8A9E84",
                bg: "rgba(138,158,132,0.1)",
              },
              {
                icon: MapPin,
                label: "الموقع",
                // Replace with your city/location
                value: "دبي، الإمارات العربية المتحدة",
                href: "#",
                color: "#C4605A",
                bg: "rgba(196,96,90,0.1)",
              },
              {
                icon: Instagram,
                label: "إنستغرام",
                // Replace with your Instagram handle
                value: "@drsarah.wellness",
                href: "https://instagram.com",
                color: "#D4756A",
                bg: "rgba(212,117,106,0.1)",
              },
            ].map(({ icon: Icon, label, value, href, color, bg }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 rounded-2xl bg-white/70 backdrop-blur-sm hover:bg-white transition-all duration-200 group text-right"
                style={{
                  border: "1.5px solid rgba(212,117,106,0.1)",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                  style={{ background: bg }}
                >
                  <Icon className="w-5 h-5" style={{ color }} />
                </div>

                <div>
                  <div className="text-xs text-sage-500 font-medium">
                    {label}
                  </div>
                  <div
                    className="text-sm font-semibold"
                    style={{ color: "#4A3530" }}
                  >
                    {value}
                  </div>
                </div>
              </a>
            ))}

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/15552345678" // Replace with your WhatsApp number
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl text-white font-semibold text-sm shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, #25D366, #128C7E)",
              }}
            >
              <MessageCircle className="w-5 h-5" />
              تواصلي عبر واتساب
            </a>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div
              className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 lg:p-10"
              style={{
                border: "1.5px solid rgba(212,117,106,0.12)",
                boxShadow: "0 8px 40px rgba(212,117,106,0.1)",
              }}
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                    style={{
                      background: "linear-gradient(135deg, #FAD9D5, #E4E9E2)",
                    }}
                  >
                    <CheckCircle className="w-10 h-10 text-coral-500" />
                  </div>

                  <h3
                    className="text-2xl font-bold mb-3"
                    style={{ fontFamily: "Georgia, serif", color: "#4A3530" }}
                  >
                    تم إرسال الرسالة بنجاح!
                  </h3>

                  <p className="text-sage-600 mb-6">
                    شكرًا لتواصلكِ معي. سأرد عليكِ خلال 24 ساعة.
                  </p>

                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({
                        name: "",
                        email: "",
                        phone: "",
                        service: "",
                        message: "",
                      });
                    }}
                    className="px-8 py-3 rounded-full text-white font-medium text-sm"
                    style={{
                      background: "linear-gradient(135deg, #E8776F, #D4756A)",
                    }}
                  >
                    إرسال رسالة أخرى
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 text-right">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-sage-600 mb-2 mr-1">
                        الاسم الكامل *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="اكتبي اسمكِ الكامل"
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-sage-600 mb-2 mr-1">
                        البريد الإلكتروني *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        className={inputClass}
                        dir="ltr"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-sage-600 mb-2 mr-1">
                        رقم الهاتف
                      </label>
                      <input
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={form.phone}
                        onChange={(e) =>
                          setForm({ ...form, phone: e.target.value })
                        }
                        className={inputClass}
                        dir="ltr"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-sage-600 mb-2 mr-1">
                        الخدمة المطلوبة *
                      </label>
                      <select
                        required
                        value={form.service}
                        onChange={(e) =>
                          setForm({ ...form, service: e.target.value })
                        }
                        className={inputClass}
                      >
                        <option value="">اختاري الخدمة...</option>
                        {services.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-sage-600 mb-2 mr-1">
                      الرسالة *
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="اكتبي أهدافكِ الصحية أو نوع الدعم الذي تحتاجينه..."
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-2xl text-white font-semibold text-base flex items-center justify-center gap-2 shadow-lg hover:shadow-[0_8px_30px_rgba(212,117,106,0.4)] hover:scale-[1.02] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                    style={{
                      background:
                        "linear-gradient(135deg, #E8776F 0%, #D4756A 100%)",
                    }}
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        إرسال الرسالة
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
