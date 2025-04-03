
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

function ScrollToTop() {
  const { pathname } = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  // Scroll to top when the pathname changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, [pathname]);

  // Show/hide scroll-to-top button based on scroll position
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <>
      {isVisible && (
        <Button
          className="fixed bottom-8 left-8 z-40 rounded-full h-12 w-12 bg-[#244855] hover:bg-[#244855]/90 text-white shadow-lg flex items-center justify-center dark:bg-[#90AEAD] dark:hover:bg-[#90AEAD]/90 transition-all duration-300"
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <ChevronUp className="h-6 w-6" />
        </Button>
      )}
    </>
  );
}

export default ScrollToTop;
