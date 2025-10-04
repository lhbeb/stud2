import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import ProjectDetail from './components/ProjectDetail';

function HomePage() {
  return (
    <>
      <Hero />
      <PartnersSection />
      <WorksCaseStudies />
      <FeaturedWork />
      <LocationFocus />
      <Services />
      <Testimonials />
      <Team />
      <Contact />
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white text-black">
        <SmoothScroll />
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/project/:slug" element={<ProjectDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;