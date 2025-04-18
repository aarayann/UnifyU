import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import HeaderWithAuth from "./HeaderWithAuth";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";
import BenTime from "./BenTime";
import { useAuth } from "@/context/AuthContext";
import { useMediaQuery } from "@/hooks/use-mobile";
import { Clock, BarChart3, MessageCircle, ClipboardCheck, PlusSquare, Video, BookOpen, Archive } from "lucide-react";

const studentNav = [
  { path: "/attendance-records", label: "Attendance Records", icon: <ClipboardCheck /> },
  { path: "/performance-metrics", label: "Performance Metrics", icon: <BarChart3 /> },
  { path: "/discussion-forums", label: "Discussion Forums", icon: <MessageCircle /> },
  { path: "/archived-forums", label: "Archived Forums", icon: <Archive /> },
  { path: "/create-forum", label: "Create Forum", icon: <PlusSquare /> },
  { path: "/upcoming-classes", label: "Upcoming Classes", icon: <Clock /> },
  { path: "/meet-setup", label: "Meet Setup", icon: <Video /> },
  { path: "/resources", label: "Resources", icon: <BookOpen /> },
];

const facultyNav = [
  { path: "/faculty-dashboard", label: "Dashboard", icon: <ClipboardCheck /> },
  { path: "/attendance-records", label: "Attendance Records", icon: <ClipboardCheck /> },
  { path: "/grade-assignments", label: "Grade Assignments", icon: <BarChart3 /> },
  { path: "/performance-metrics", label: "Performance Metrics", icon: <BarChart3 /> },
  { path: "/discussion-forums", label: "Discussion Forums", icon: <MessageCircle /> },
  { path: "/archived-forums", label: "Archived Forums", icon: <Archive /> },
  { path: "/upcoming-classes", label: "Upcoming Classes", icon: <Clock /> },
  { path: "/meet-setup", label: "Meet Setup", icon: <Video /> },
  { path: "/resources", label: "Resources", icon: <BookOpen /> },
];

const Layout = () => {
  const { userType } = useAuth();
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Effects for scroll animations and BenTime styling
  useEffect(() => {
    const animateOnScroll = () => {
      const elements = document.querySelectorAll(".animate-on-scroll:not(.visible)");
      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        if (rect.top <= windowHeight * 0.85) {
          element.classList.add("visible");
        }
      });
    };
    animateOnScroll();
    window.addEventListener("scroll", animateOnScroll);
    return () => {
      window.removeEventListener("scroll", animateOnScroll);
    };
  }, []);

  useEffect(() => {
    const styleObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
          const benTimeElement = document.querySelector("#bentime-widget");
          if (benTimeElement) {
            const benTimeHeader = benTimeElement.querySelector(".bentime-header");
            if (benTimeHeader) {
              benTimeHeader.setAttribute(
                "style",
                "color: var(--secondary) !important; font-weight: bold !important; text-shadow: 0 0 2px rgba(0,0,0,0.3)"
              );
            }
            const benTimeAvatar = document.querySelector(".bentime-avatar");
            if (benTimeAvatar) {
              benTimeAvatar.setAttribute("style", "background-color: var(--secondary) !important; animation: none !important");
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

  // Choose nav items based on userType
  let navItems = [];
  if (userType === "student") {
    navItems = studentNav;
  } else if (userType === "faculty") {
    navItems = facultyNav;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <HeaderWithAuth />
      <div className="flex flex-1">
        {userType && !isMobile && (
          <nav className="hidden md:block w-64 bg-gray-100 p-4 border-r">
            {/* Sidebar navigation only shows on desktop when user is logged in */}
            <div className="space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  className="flex items-center w-full py-2 px-3 rounded hover:bg-gray-200"
                  onClick={() => navigate(item.path)}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>
          </nav>
        )}
        <main className={`flex-1 p-4 md:p-8 ${!userType || isMobile ? 'w-full' : ''}`}>
          <ScrollToTop />
          <BenTime />
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
