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
                "color: #E64833 !important; font-weight: bold !important; text-shadow: 0 0 2px rgba(0,0,0,0.3)"
              );
            }

            const benTimeAvatar = document.querySelector(".bentime-avatar");
            if (benTimeAvatar) {
              benTimeAvatar.setAttribute("style", "background-color: #E64833 !important; animation: none !important");
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
          <aside className="w-64 bg-[#244855] text-white flex flex-col p-4 space-y-4">
            <div className="text-2xl font-bold mb-6">Dashboard</div>
            <button
              onClick={navigateTo("/attendance-records")}
              className="flex items-center gap-2 p-2 rounded hover:bg-[#1f3a44]"
            >
              <Clock size={18} /> Attendance Records
            </button>
            <button
              onClick={navigateTo("/performance-metrics")}
              className="flex items-center gap-2 p-2 rounded hover:bg-[#1f3a44]"
            >
              <BarChart3 size={18} /> Performance Metrics
            </button>
            <button
              onClick={navigateTo("/discussion-forums")}
              className="flex items-center gap-2 p-2 rounded hover:bg-[#1f3a44]"
            >
              <MessageCircle size={18} /> Discussion Forums
            </button>
            <button
              onClick={navigateTo("/create-forum")}
              className="flex items-center gap-2 p-2 rounded hover:bg-[#1f3a44]"
            >
              <PlusSquare size={18} /> Create Forum
            </button>
            <button
              onClick={navigateTo("/live-calendar")}
              className="flex items-center gap-2 p-2 rounded hover:bg-[#1f3a44]"
            >
              <Calendar size={18} /> Live Calendar
            </button>
            <button
              onClick={navigateTo("/resources")}
              className="flex items-center gap-2 p-2 rounded hover:bg-[#1f3a44]"
            >
              <ClipboardCheck size={18} /> Resources
            </button>
          </aside>
        )}

        {/* Page Content */}
        <section className="flex-1 p-6 bg-gray-50">
          <Outlet />
        </section>
      </main>
      <Footer />
      <BenTime />
    </div>
  );
};

export default Layout;
