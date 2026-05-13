import { motion } from 'framer-motion';
import { Award, ExternalLink, BadgeCheck } from 'lucide-react';

// Replace these entries with your actual certificates
const certificates = [
  {
    title: 'Certified Personal Trainer',
    institution: 'National Academy of Sports Medicine (NASM)',
    year: '2017',
    description: 'Comprehensive certification in personal training, exercise science, and program design.',
    color: 'from-coral-100 to-peach-100',
    badgeColor: '#D4756A',
    image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    title: 'Licensed Physiotherapist',
    institution: 'University College of Health Sciences',
    year: '2016',
    description: 'Clinical degree in physiotherapy with specialization in musculoskeletal rehabilitation.',
    color: 'from-sage-100 to-sage-50',
    badgeColor: '#8A9E84',
    image: 'https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    title: 'Breastfeeding Specialist',
    institution: 'International Board of Lactation Consultant Examiners',
    year: '2019',
    description: 'Advanced certification in lactation support, breastfeeding management, and infant feeding.',
    color: 'from-cream-100 to-peach-50',
    badgeColor: '#C4605A',
    image: 'https://images.pexels.com/photos/3985163/pexels-photo-3985163.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    title: 'Postpartum Fitness Specialist',
    institution: 'Every Mother Institute',
    year: '2020',
    description: 'Specialized training in postpartum recovery, diastasis recti rehabilitation, and pelvic floor health.',
    color: 'from-peach-100 to-coral-50',
    badgeColor: '#D4756A',
    image: 'https://images.pexels.com/photos/6740521/pexels-photo-6740521.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    title: "Women's Health & Wellness",
    institution: 'American Council on Exercise (ACE)',
    year: '2021',
    description: "Advanced certification in women's health coaching, hormonal wellness, and lifecycle fitness.",
    color: 'from-sage-100 to-cream-50',
    badgeColor: '#748D6E',
    image: 'https://images.pexels.com/photos/3823488/pexels-photo-3823488.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

export default function Certificates() {
  return (
    <section
      id="certificates"
      className="py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #F4F6F3 0%, #FAF0EC 100%)' }}
    >
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] rounded-full blur-3xl opacity-15"
        style={{ background: 'linear-gradient(135deg, #D4756A, #8A9E84)' }}
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
            Qualifications
          </div>
          <h2
            className="text-4xl lg:text-5xl font-bold mb-5"
            style={{ fontFamily: 'Georgia, serif', color: '#4A3530' }}
          >
            Certifications &
            <span style={{ color: '#D4756A' }}> Credentials</span>
          </h2>
          <p className="text-sage-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Backed by rigorous training and internationally recognized qualifications, I bring
            expert-level knowledge to every session.
          </p>
        </motion.div>

        {/* Certificate grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className={`group relative bg-gradient-to-br ${cert.color} rounded-3xl overflow-hidden`}
              style={{
                border: '1.5px solid rgba(255,255,255,0.7)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.07)',
              }}
            >
              {/* Certificate image */}
              <div className="relative h-40 overflow-hidden">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(to bottom, transparent 40%, ${cert.badgeColor}33 100%)`,
                  }}
                />
                {/* Year badge */}
                <div
                  className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold text-white"
                  style={{ background: cert.badgeColor }}
                >
                  {cert.year}
                </div>
              </div>

              <div className="p-6">
                {/* Award icon + verified */}
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: `${cert.badgeColor}20` }}
                  >
                    <Award className="w-4.5 h-4.5" style={{ color: cert.badgeColor }} />
                  </div>
                  <BadgeCheck className="w-4.5 h-4.5" style={{ color: cert.badgeColor }} />
                  <span className="text-xs font-medium" style={{ color: cert.badgeColor }}>
                    Verified
                  </span>
                </div>

                <h3
                  className="text-lg font-bold mb-1 leading-tight"
                  style={{ color: '#4A3530', fontFamily: 'Georgia, serif' }}
                >
                  {cert.title}
                </h3>
                <p className="text-xs font-semibold text-sage-600 mb-2">{cert.institution}</p>
                <p className="text-xs text-sage-600/80 leading-relaxed mb-4">{cert.description}</p>

                {/* View certificate button */}
                <button
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full transition-all duration-200 hover:scale-105"
                  style={{
                    background: `${cert.badgeColor}15`,
                    color: cert.badgeColor,
                    border: `1px solid ${cert.badgeColor}30`,
                  }}
                >
                  <ExternalLink className="w-3 h-3" />
                  View Certificate
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
