import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import WhyMe from './components/WhyMe';
import Certificates from './components/Certificates';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="antialiased" style={{ fontFamily: 'system-ui, sans-serif' }} dir="rtl">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <WhyMe />
      <Certificates />
      <Gallery />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}
