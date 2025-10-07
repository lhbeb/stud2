import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import FeaturedWork from './components/FeaturedWork';
import WorksCaseStudies from './components/WorksCaseStudies';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import Team from './components/Team';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SmoothScroll from './components/SmoothScroll';
import PartnersSection from './components/PartnersSection';
import ProjectDetail from './components/ProjectDetail';
import BookCallPage from './components/BookCallPage';
import AboutPage from './components/AboutPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white text-black">
        <SmoothScroll />
        <Navigation />
        <Routes>
          <Route path="/" element={
      <main>
        <Hero />
        <PartnersSection />
        <WorksCaseStudies />
        <FeaturedWork />
        <Services />
        <Testimonials />
        <Team />
        <Contact />
      </main>
          } />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/book-call" element={<BookCallPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;