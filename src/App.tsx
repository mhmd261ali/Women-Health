import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import WhyMe from './components/WhyMe';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { FadeIn } from './components/motion/FadeIn';

export default function App() {
  return (
    <div className="antialiased" style={{ fontFamily: 'system-ui, sans-serif' }} dir="rtl">
      <Navbar />
      <FadeIn y={24} delay={0.05}>
        <Hero />
      </FadeIn>
      <About />
      <Services />
      <FadeIn y={36}>
        <WhyMe />
      </FadeIn>
      <FadeIn y={36}>
        <Contact />
      </FadeIn>
      <FadeIn y={24}>
        <Footer />
      </FadeIn>
    </div>
  );
}
