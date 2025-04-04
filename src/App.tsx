
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import Auth from "./pages/Auth";
import Faculties from "./pages/Faculties";
import StudentDashboard from "./pages/StudentDashboard";
import FacultyDashboard from "./pages/FacultyDashboard";
import { initializeTheme, addThemeInitScript } from "./lib/theme-utils";

const queryClient = new QueryClient();

const App = () => {
  // Initialize theme on app start
  useEffect(() => {
    // Add theme initialization script to prevent flash of wrong theme
    addThemeInitScript();
    
    // Initialize theme based on user preference for current session only
    initializeTheme();
    
    // Clear theme preference when the page is about to unload/refresh
    const handleBeforeUnload = () => {
      localStorage.removeItem("theme");
    };
    
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Index />} />
              <Route path="/faculties" element={<Faculties />} />
              <Route path="/auth" element={<Auth />} />
            </Route>
            <Route path="/student-dashboard" element={<StudentDashboard />} />
            <Route path="/faculty-dashboard" element={<FacultyDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
