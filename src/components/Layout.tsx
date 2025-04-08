
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";
import BenTime from "./BenTime";
import {
  Clock,
  BarChart3,
  MessageCircle,
  Calendar,
  ClipboardCheck,
  PlusSquare,
} from "lucide-react";

const studentPaths = [
  "/student-dashboard",
  "/attendance-records",
  "/performance-metrics",
  "/discussion-forums",
  "/create-forum",
  "/live-calendar",
  "/resources",
];

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isStudentPage = studentPaths.includes(location.pathname);

  const navigateTo = (path: string) => () => {
    navigate(path);
  };

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

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Header />
      <main className="flex-grow flex">
        {isStudentPage && (
          <aside className="hidden md:flex w-64 bg-sidebar text-sidebar-foreground flex-col p-4 space-y-4 shadow-lg">
            <div className="text-2xl font-bold mb-6 font-playfair">Dashboard</div>
            <button
              onClick={navigateTo("/attendance-records")}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-sidebar-accent/20 transition-colors"
            >
              <Clock size={18} /> <span className="font-medium">Attendance Records</span>
            </button>
            <button
              onClick={navigateTo("/performance-metrics")}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-sidebar-accent/20 transition-colors"
            >
              <BarChart3 size={18} /> <span className="font-medium">Performance Metrics</span>
            </button>
            <button
              onClick={navigateTo("/discussion-forums")}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-sidebar-accent/20 transition-colors"
            >
              <MessageCircle size={18} /> <span className="font-medium">Discussion Forums</span>
            </button>
            <button
              onClick={navigateTo("/create-forum")}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-sidebar-accent/20 transition-colors"
            >
              <PlusSquare size={18} /> <span className="font-medium">Create Forum</span>
            </button>
            <button
              onClick={navigateTo("/live-calendar")}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-sidebar-accent/20 transition-colors"
            >
              <Calendar size={18} /> <span className="font-medium">Live Calendar</span>
            </button>
            <button
              onClick={navigateTo("/resources")}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-sidebar-accent/20 transition-colors"
            >
              <ClipboardCheck size={18} /> <span className="font-medium">Resources</span>
            </button>
          </aside>
        )}

        {/* Mobile Sidebar for Student Pages */}
        {isStudentPage && (
          <div className="fixed bottom-0 left-0 right-0 bg-sidebar text-sidebar-foreground p-2 flex justify-around md:hidden z-50 shadow-[0_-2px_10px_rgba(0,0,0,0.1)]">
            <button
              onClick={navigateTo("/attendance-records")}
              className="flex flex-col items-center p-2"
            >
              <Clock size={20} />
              <span className="text-xs mt-1">Attendance</span>
            </button>
            <button
              onClick={navigateTo("/performance-metrics")}
              className="flex flex-col items-center p-2"
            >
              <BarChart3 size={20} />
              <span className="text-xs mt-1">Performance</span>
            </button>
            <button
              onClick={navigateTo("/discussion-forums")}
              className="flex flex-col items-center p-2"
            >
              <MessageCircle size={20} />
              <span className="text-xs mt-1">Forums</span>
            </button>
            <button
              onClick={navigateTo("/live-calendar")}
              className="flex flex-col items-center p-2"
            >
              <Calendar size={20} />
              <span className="text-xs mt-1">Calendar</span>
            </button>
          </div>
        )}

        {/* Page Content */}
        <section className={`flex-1 p-6 bg-background ${isStudentPage ? 'pb-20 md:pb-6' : ''}`}>
          <Outlet />
        </section>
      </main>
      <Footer />
      <BenTime />
    </div>
  );
};

export default Layout;
