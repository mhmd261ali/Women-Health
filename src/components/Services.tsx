import { motion } from 'framer-motion';
import { Dumbbell, Activity, Baby, Heart, Users, Zap } from 'lucide-react';

const services = [
  {
    icon: Dumbbell,
    title: 'Personal Training',
    description:
      'Custom fitness programs designed for your goals — building strength, endurance, and confidence safely and sustainably.',
    color: 'from-coral-100 to-peach-100',
    accent: '#D4756A',
    border: 'rgba(212,117,106,0.2)',
  },
  {
    icon: Activity,
    title: 'Physiotherapy & Rehabilitation',
    description:
      'Evidence-based rehabilitation for injury recovery, pain management, and restoring optimal movement patterns.',
    color: 'from-sage-100 to-sage-50',
    accent: '#8A9E84',
    border: 'rgba(138,158,132,0.2)',
  },
  {
    icon: Baby,
    title: 'Postpartum Recovery',
    description:
      'Gentle, progressive recovery programs that help new mothers rebuild strength, heal diastasis recti, and regain vitality.',
    color: 'from-cream-100 to-peach-50',
    accent: '#C4605A',
    border: 'rgba(196,96,90,0.2)',
  },
  {
    icon: Heart,
    title: 'Breastfeeding Consultation',
    description:
      'Compassionate specialist support for latching, milk supply, positioning, and navigating breastfeeding challenges.',
    color: 'from-peach-100 to-coral-50',
    accent: '#D4756A',
    border: 'rgba(212,117,106,0.2)',
  },
  {
    icon: Users,
    title: "Women's Health Coaching",
    description:
      'Holistic coaching that addresses hormones, cycle wellness, nutrition mindset, stress, and lifelong female health.',
    color: 'from-sage-100 to-cream-100',
    accent: '#8A9E84',
    border: 'rgba(138,158,132,0.2)',
  },
  {
    icon: Zap,
    title: 'Mobility & Pain Management',
    description:
      'Targeted mobility work, manual therapy, and corrective exercise to eliminate chronic pain and improve daily function.',
    color: 'from-cream-100 to-sage-50',
    accent: '#748D6E',
    border: 'rgba(116,141,110,0.2)',
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #F4F6F3 0%, #FFF5F2 100%)' }}
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-10"
        style={{ background: 'radial-gradient(circle, #D4756A, #8A9E84)' }}
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
              background: 'rgba(212,117,106,0.1)',
              border: '1px solid rgba(212,117,106,0.25)',
            }}
          >
            What I Offer
          </div>
          <h2
            className="text-4xl lg:text-5xl font-bold mb-5"
            style={{ fontFamily: 'Georgia, serif', color: '#4A3530' }}
          >
            Services Tailored
            <span style={{ color: '#D4756A' }}> for You</span>
          </h2>
          <p className="text-sage-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Every service is delivered with expert knowledge, genuine care, and a deeply personal
            approach to your unique journey.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(({ icon: Icon, title, description, color, accent, border }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className={`group relative bg-gradient-to-br ${color} rounded-3xl p-7 cursor-pointer transition-shadow duration-300`}
              style={{
                border: `1.5px solid ${border}`,
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = `0 16px 48px ${border}`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(0,0,0,0.05)';
              }}
            >
              {/* Icon */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 shadow-md transition-transform duration-300 group-hover:scale-110"
                style={{ background: `linear-gradient(135deg, ${accent}22, ${accent}44)` }}
              >
                <Icon className="w-7 h-7" style={{ color: accent }} />
              </div>

              <h3
                className="text-xl font-bold mb-3"
                style={{ color: '#4A3530', fontFamily: 'Georgia, serif' }}
              >
                {title}
              </h3>
              <p className="text-sage-700/75 text-sm leading-relaxed mb-5">{description}</p>

              {/* CTA link */}
              <div
                className="inline-flex items-center gap-1.5 text-sm font-semibold transition-gap duration-200"
                style={{ color: accent }}
              >
                Learn more
                <motion.span
                  className="inline-block"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  →
                </motion.span>
              </div>

              {/* Hover glow */}
              <div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 50% 0%, ${accent}15, transparent 70%)`,
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-14"
        >
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-10 py-4 rounded-full text-white font-semibold text-base shadow-lg hover:shadow-[0_8px_30px_rgba(212,117,106,0.4)] hover:scale-105 transition-all duration-300"
            style={{ background: 'linear-gradient(135deg, #E8776F 0%, #D4756A 100%)' }}
          >
            Book Your First Session
          </button>
        </motion.div>
      </div>
    </section>
  );
}
