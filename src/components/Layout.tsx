
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

  useEffect(() => {
    // Override BenTime styling when it appears
    const styleObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          const benTimeElement = document.querySelector('#bentime-widget');
          if (benTimeElement) {
            // Target the header of BenTime to change color
            const benTimeHeader = benTimeElement.querySelector('.bentime-header');
            if (benTimeHeader) {
              benTimeHeader.setAttribute('style', 'color: #E64833 !important; font-weight: bold !important; text-shadow: 0 0 2px rgba(0,0,0,0.3)');
            }
            
            // Target the avatar/icon to change from teal to orange
            const benTimeAvatar = document.querySelector('.bentime-avatar');
            if (benTimeAvatar) {
              benTimeAvatar.setAttribute('style', 'background-color: #E64833 !important; animation: none !important');
            }
          }
        }
      });
    });

    styleObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      styleObserver.disconnect();
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
