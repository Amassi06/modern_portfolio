import { useState, useEffect } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Nav from './components/Nav';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import AnimatedGradient from './components/AnimatedGradient';
import LoadingScreen from './components/LoadingScreen';
import { useSmoothScroll } from './hooks/useSmoothScroll';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);

  // Active le smooth scroll Lenis
  useSmoothScroll();

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Loading Screen */}
      <LoadingScreen onComplete={() => setShowContent(true)} />

      {/* Animated Gradient Background */}
      <AnimatedGradient />

      {showContent && (
        <>
          <ScrollProgress />
          <Nav />

          <main className={`transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <Hero />
            <About />
            <Experience />
            <Projects />
            <Contact />
          </main>

          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
