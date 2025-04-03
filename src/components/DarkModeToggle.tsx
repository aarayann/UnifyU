
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { toast } = useToast();

  // Initialize theme based on localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      toast({
        title: "Light mode activated",
        description: "The interface is now in light mode",
        duration: 2000,
      });
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      toast({
        title: "Dark mode activated",
        description: "The interface is now in dark mode",
        duration: 2000,
      });
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleDarkMode}
      className="w-9 h-9 rounded-full"
      aria-label="Toggle dark mode"
    >
      {isDarkMode ? (
        <Moon className="h-5 w-5 text-gray-200 hover:text-white transition-colors" />
      ) : (
        <Sun className="h-5 w-5 text-gray-700 hover:text-gray-900 transition-colors" />
      )}
    </Button>
  );
};

export default DarkModeToggle;
