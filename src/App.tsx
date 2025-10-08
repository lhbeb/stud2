import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
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
import WhatsAppButton from './components/WhatsAppButton';
import SkeletonLoader from './components/SkeletonLoader';

// Lazy load non-critical components
const ProjectDetail = lazy(() => import('./components/ProjectDetail'));
const BookCallPage = lazy(() => import('./components/BookCallPage'));
const SimpleAboutPage = lazy(() => import('./components/SimpleAboutPage'));
const CareersPage = lazy(() => import('./components/CareersPage'));
const EmailPage = lazy(() => import('./components/EmailPage'));

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white text-black">
        <SmoothScroll />
        <Navigation />
        <WhatsAppButton />
        <Routes>
          <Route path="/" element={
            <main>
              <Hero />
              <PartnersSection />
              <WorksCaseStudies />
              <Testimonials />
              <Services />
              <FeaturedWork />
              <Team />
              <Contact />
            </main>
          } />
          <Route path="/projects/:slug" element={
            <Suspense fallback={
              <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                  <SkeletonLoader variant="image" className="w-64 h-64 mx-auto mb-4" />
                  <SkeletonLoader variant="text" lines={3} className="w-64 mx-auto" />
                </div>
              </div>
            }>
              <ProjectDetail />
            </Suspense>
          } />
          <Route path="/book-call" element={
            <Suspense fallback={
              <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                  <SkeletonLoader variant="image" className="w-64 h-64 mx-auto mb-4" />
                  <SkeletonLoader variant="text" lines={3} className="w-64 mx-auto" />
                </div>
              </div>
            }>
              <BookCallPage />
            </Suspense>
          } />
          <Route path="/about" element={
            <Suspense fallback={
              <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                  <SkeletonLoader variant="image" className="w-64 h-64 mx-auto mb-4" />
                  <SkeletonLoader variant="text" lines={3} className="w-64 mx-auto" />
                </div>
              </div>
            }>
              <SimpleAboutPage />
            </Suspense>
          } />
          <Route path="/careers" element={
            <Suspense fallback={
              <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                  <SkeletonLoader variant="image" className="w-64 h-64 mx-auto mb-4" />
                  <SkeletonLoader variant="text" lines={3} className="w-64 mx-auto" />
                </div>
              </div>
            }>
              <CareersPage />
            </Suspense>
          } />
          <Route path="/email" element={
            <Suspense fallback={
              <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                  <SkeletonLoader variant="image" className="w-64 h-64 mx-auto mb-4" />
                  <SkeletonLoader variant="text" lines={3} className="w-64 mx-auto" />
                </div>
              </div>
            }>
              <EmailPage />
            </Suspense>
          } />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;