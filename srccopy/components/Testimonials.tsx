import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

// Replace with your actual client testimonials
const testimonials = [
  {
    name: 'Amira Hassan',
    role: 'Postpartum Recovery Client',
    text: "Her guidance helped me recover safely after pregnancy. I went from barely being able to walk up the stairs to running a 5K. She truly understands women's bodies.",
    stars: 5,
    avatar: 'https://images.pexels.com/photos/3992656/pexels-photo-3992656.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    name: 'Sara Al-Mansoori',
    role: 'Personal Training Client',
    text: 'The best combination of fitness, physiotherapy, and emotional support I have ever experienced. She helped me not just physically but also gave me confidence in my own body.',
    stars: 5,
    avatar: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    name: 'Layla Karimi',
    role: 'Breastfeeding Consultation',
    text: 'Professional, kind, and truly empowering. Her breastfeeding consultation saved my nursing journey. She was patient, knowledgeable, and always available when I needed help.',
    stars: 5,
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    name: 'Nour Khalil',
    role: 'Rehabilitation Client',
    text: "After my back injury I was afraid I'd never train again. She designed a program that not only helped me heal but made me stronger than before. Forever grateful.",
    stars: 5,
    avatar: 'https://images.pexels.com/photos/3586798/pexels-photo-3586798.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    name: 'Maya Benali',
    role: "Women's Health Coaching",
    text: "A truly holistic approach to women's health. She helped me understand my hormonal cycle, improve my nutrition habits, and build a sustainable fitness routine that I love.",
    stars: 5,
    avatar: 'https://images.pexels.com/photos/2773977/pexels-photo-2773977.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    name: 'Dina Fawzy',
    role: 'Postpartum & Breastfeeding',
    text: 'Having one person who understands both postpartum recovery and breastfeeding is invaluable. She made the transition into motherhood so much smoother and healthier.',
    stars: 5,
    avatar: 'https://images.pexels.com/photos/4100420/pexels-photo-4100420.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-current" style={{ color: '#D4756A' }} />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #F4F6F3 0%, #FFF5F2 100%)' }}
    >
      {/* Decorative blobs */}
      <div
        className="absolute -top-10 left-1/3 w-80 h-80 rounded-full blur-3xl opacity-15"
        style={{ background: 'radial-gradient(circle, #D4756A, transparent)' }}
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
            Client Stories
          </div>
          <h2
            className="text-4xl lg:text-5xl font-bold mb-5"
            style={{ fontFamily: 'Georgia, serif', color: '#4A3530' }}
          >
            Voices of
            <span style={{ color: '#D4756A' }}> Transformation</span>
          </h2>
          <p className="text-sage-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Real stories from women who have experienced the difference of personalized,
            compassionate care.
          </p>
        </motion.div>

        {/* Testimonial cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map(({ name, role, text, stars, avatar }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -5 }}
              className="relative bg-white/70 backdrop-blur-sm rounded-3xl p-7 group"
              style={{
                border: '1.5px solid rgba(212,117,106,0.12)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
              }}
            >
              {/* Quote icon */}
              <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote className="w-12 h-12" style={{ color: '#D4756A' }} />
              </div>

              {/* Stars */}
              <StarRating count={stars} />

              {/* Text */}
              <p className="text-sage-700/80 text-sm leading-relaxed mt-4 mb-6 italic">
                "{text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-coral-200 flex-shrink-0">
                  <img
                    src={avatar}
                    alt={name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-bold text-sm" style={{ color: '#4A3530' }}>{name}</div>
                  <div className="text-xs text-sage-500">{role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
