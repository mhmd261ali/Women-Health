import { motion } from 'framer-motion';
import { Shield, Microscope, HeartHandshake, Leaf, Baby, GraduationCap } from 'lucide-react';

const reasons = [
  {
    icon: Shield,
    title: 'Personalized Care',
    description:
      'Every program is built specifically for your body, goals, and life stage — never a one-size-fits-all approach.',
    gradient: 'linear-gradient(135deg, #FAD9D5 0%, #F5B8B2 100%)',
    iconColor: '#D4756A',
  },
  {
    icon: Microscope,
    title: 'Evidence-Based Approach',
    description:
      "All recommendations are grounded in the latest clinical research in sports science, physiotherapy, and women's health.",
    gradient: 'linear-gradient(135deg, #E4E9E2 0%, #C8D3C5 100%)',
    iconColor: '#8A9E84',
  },
  {
    icon: HeartHandshake,
    title: 'Compassionate Guidance',
    description:
      'A judgment-free, warm environment where you feel heard, respected, and genuinely supported every step of the way.',
    gradient: 'linear-gradient(135deg, #FAD9D5 0%, #F2D4C8 100%)',
    iconColor: '#C4605A',
  },
  {
    icon: Leaf,
    title: 'Holistic Wellness',
    description:
      'I address the whole person — physical recovery, mental resilience, hormonal balance, and sustainable lifestyle habits.',
    gradient: 'linear-gradient(135deg, #E4E9E2 0%, #D8E4D5 100%)',
    iconColor: '#748D6E',
  },
  {
    icon: Baby,
    title: 'Safe Training for Mothers',
    description:
      'Specialized knowledge in prenatal and postnatal physiology ensures every session is safe, progressive, and effective.',
    gradient: 'linear-gradient(135deg, #FDE8E2 0%, #FAD1C6 100%)',
    iconColor: '#D4756A',
  },
  {
    icon: GraduationCap,
    title: 'Dual Medical & Fitness Expertise',
    description:
      'Holding both clinical physiotherapy and fitness certifications means you get the best of medical rehabilitation and training.',
    gradient: 'linear-gradient(135deg, #E4E9E2 0%, #C8D3C5 100%)',
    iconColor: '#5E7358',
  },
];

export default function WhyMe() {
  return (
    <section
      id="why-me"
      className="py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #FFF5F2 0%, #F4F6F3 100%)' }}
    >
      {/* Background decoration */}
      <motion.div
        className="absolute top-20 right-[-80px] w-64 h-64 rounded-full blur-3xl opacity-25"
        style={{ background: 'radial-gradient(circle, #D4756A, transparent)' }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-20 left-[-60px] w-56 h-56 rounded-full blur-3xl opacity-20"
        style={{ background: 'radial-gradient(circle, #8A9E84, transparent)' }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
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
            className="inline-block px-4 py-1.5 rounded-full text-sm font-medium text-sage-600 mb-6"
            style={{
              background: 'rgba(138,158,132,0.1)',
              border: '1px solid rgba(138,158,132,0.25)',
            }}
          >
            Why Choose Me
          </div>
          <h2
            className="text-4xl lg:text-5xl font-bold mb-5"
            style={{ fontFamily: 'Georgia, serif', color: '#4A3530' }}
          >
            Your Wellness Deserves
            <span style={{ color: '#8A9E84' }}> the Best</span>
          </h2>
          <p className="text-sage-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Here's what makes working with me a truly transformative experience for women at
            every stage of life.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map(({ icon: Icon, title, description, gradient, iconColor }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -5 }}
              className="group relative rounded-3xl p-7 overflow-hidden"
              style={{
                background: gradient,
                border: `1.5px solid rgba(255,255,255,0.7)`,
                boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
              }}
            >
              {/* Glass overlay on hover */}
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/20 transition-all duration-300 rounded-3xl" />

              <div
                className="relative w-14 h-14 rounded-2xl flex items-center justify-center mb-5 shadow-sm"
                style={{ background: 'rgba(255,255,255,0.7)' }}
              >
                <Icon className="w-7 h-7" style={{ color: iconColor }} />
              </div>

              <h3
                className="relative text-xl font-bold mb-3"
                style={{ color: '#4A3530', fontFamily: 'Georgia, serif' }}
              >
                {title}
              </h3>
              <p className="relative text-sage-700/75 text-sm leading-relaxed">{description}</p>
            </motion.div>
          ))}
        </div>

        {/* Centered call-to-action strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 rounded-3xl p-10 text-center relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #D4756A 0%, #8A9E84 100%)',
          }}
        >
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 50%, white 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
          <h3
            className="relative text-3xl font-bold text-white mb-4"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Ready to Begin Your Transformation?
          </h3>
          <p className="relative text-white/80 text-lg mb-8 max-w-xl mx-auto">
            Let's work together to build the healthiest, strongest version of you.
          </p>
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-10 py-4 rounded-full bg-white font-semibold text-base hover:shadow-lg hover:scale-105 transition-all duration-300"
            style={{ color: '#D4756A' }}
          >
            Start Your Journey Today
          </button>
        </motion.div>
      </div>
    </section>
  );
}
