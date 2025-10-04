import Navigation from './components/Navigation';
import Hero from './components/Hero';
import FeaturedWork from './components/FeaturedWork';
import WorksCaseStudies from './components/WorksCaseStudies';
import LocationFocus from './components/LocationFocus';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import Team from './components/Team';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SmoothScroll from './components/SmoothScroll';
import PartnersSection from './components/PartnersSection';

function App() {
  return (
    <div className="min-h-screen bg-white text-black">
      <SmoothScroll />
      <Navigation />
      <main>
        <Hero />
        <PartnersSection />
        <WorksCaseStudies />
        <LocationFocus />
        <FeaturedWork />
        <Services />
        <Testimonials />
        <Team />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;