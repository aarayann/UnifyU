
import { useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { toast } = useToast();

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
      className="w-12 h-12 rounded-full flex items-center justify-center transition-colors"
      aria-label="Toggle dark mode"
    >
      {isDarkMode ? (
        <Moon className="h-6 w-6 text-[#A8C0BF] hover:text-white transition-colors" />
      ) : (
        <Sun className="h-6 w-6 text-[#244855] hover:text-[#1A3641] transition-colors" />
      )}
    </Button>
  );
};

export default DarkModeToggle;
