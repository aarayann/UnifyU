
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";
import BenTime from "./BenTime";

const Layout = () => {
  // Monitor resize events for responsive layouts
  useEffect(() => {
    // Add animation to elements with the animate-on-scroll class
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll:not(.visible)');
      elements.forEach(element => {
        // Check if element is in viewport
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        if (rect.top <= windowHeight * 0.85) {
          element.classList.add('visible');
        }
      });
    };

    // Run once on load
    animateOnScroll();
    
    // Listen for scroll events
    window.addEventListener('scroll', animateOnScroll);
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', animateOnScroll);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <BenTime />
    </div>
  );
};

export default Layout;
