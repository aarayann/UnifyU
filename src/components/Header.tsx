
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  NavigationMenu, 
  NavigationMenuList, 
  NavigationMenuItem, 
  NavigationMenuLink,
  NavigationMenuContent,
  NavigationMenuTrigger
} from "@/components/ui/navigation-menu";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import DarkModeToggle from "./DarkModeToggle";
import { FileText, Download, BookOpen } from "lucide-react";

const Header = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const openVirtualTour = () => {
    // Create shimmer effect before opening
    document.body.style.overflow = "hidden";
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "#244855";
    overlay.style.opacity = "0";
    overlay.style.zIndex = "100";
    overlay.style.transition = "opacity 0.5s ease";
    document.body.appendChild(overlay);

    setTimeout(() => {
      overlay.style.opacity = "0.8";
    }, 10);

    setTimeout(() => {
      overlay.style.opacity = "0";
      setTimeout(() => {
        document.body.removeChild(overlay);
        document.body.style.overflow = "";
        window.open("https://www.bennett.edu.in/campus-tour/", "_blank");
      }, 500);
    }, 1000);
  };

  // Function to download syllabus
  const downloadSyllabus = () => {
    // Create an anchor element to trigger download
    const link = document.createElement('a');
    link.href = '/BTechSyllabus.pdf'; // Path to your PDF in the public folder
    link.download = 'BTechSyllabus.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const navItemVariants = {
    initial: { y: -20, opacity: 0 },
    animate: (custom: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.1 * custom,
        duration: 0.5,
        ease: "easeOut"
      }
    }),
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  return (
    <>
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={cn(
          "sticky top-0 z-50 w-full backdrop-blur-lg bg-white/80 dark:bg-background/80 supports-[backdrop-filter]:bg-background/60 transition-colors duration-300",
          scrolled ? "shadow-md" : "border-b"
        )}
      >
        <div className="container flex h-16 items-center justify-between">
          <motion.div 
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Logo with glow effect on hover - now clickable */}
            <div className="flex items-center group relative">
              <Link to="/" onClick={scrollToTop} aria-label="UnifyU Home">
                <motion.img 
                  whileHover={{ 
                    scale: 1.05,
                    filter: "drop-shadow(0px 0px 8px rgba(36, 72, 85, 0.6))" 
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  src="public/logo-unifyu.png" 
                  alt="UnifyU" 
                  className="h-10 w-auto relative z-10 cursor-pointer" 
                />
              </Link>
              <motion.span 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="ml-2 text-sm font-medium text-muted-foreground relative z-10 dark:text-gray-300 transition-colors duration-300"
              >
                Your Campus, Reimagined.
              </motion.span>
              <div className="absolute inset-0 bg-blue-400/0 rounded-full filter blur-xl group-hover:bg-blue-400/20 transition-all duration-500"></div>
            </div>
          </motion.div>
          
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="flex gap-6">
              {/* Home Link */}
              <NavigationMenuItem>
                <div onClick={scrollToTop}>
                  <Link to="/">
                    <motion.div
                      custom={0}
                      variants={navItemVariants}
                      initial="initial"
                      animate="animate"
                      whileHover="hover"
                    >
                      <NavigationMenuLink
                        className={cn(
                          "group inline-flex h-10 w-max items-center justify-center rounded-md backdrop-blur-md bg-white/10 dark:bg-white/5 px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 relative overflow-hidden border border-transparent hover:border-gray-200 dark:hover:border-gray-700",
                          isActive("/") && "bg-accent text-accent-foreground border-gray-200 dark:border-gray-700 shadow-sm"
                        )}
                      >
                        <span className="relative z-10">Home</span>
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-r from-[#244855] to-[#90AEAD] transition-opacity duration-300"></div>
                        {isActive("/") && (
                          <motion.div 
                            className="absolute bottom-0 left-0 h-0.5 bg-[#244855]"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.3 }}
                          />
                        )}
                      </NavigationMenuLink>
                    </motion.div>
                  </Link>
                </div>
              </NavigationMenuItem>
              
              {/* Bennett Link */}
              <NavigationMenuItem>
                <Link to="/bennett">
                  <motion.div
                    custom={1}
                    variants={navItemVariants}
                    initial="initial"
                    animate="animate"
                    whileHover="hover"
                  >
                    <NavigationMenuLink
                      className={cn(
                        "group inline-flex h-10 w-max items-center justify-center rounded-md backdrop-blur-md bg-white/10 dark:bg-white/5 px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 relative overflow-hidden border border-transparent hover:border-gray-200 dark:hover:border-gray-700",
                        isActive("/bennett") && "bg-accent text-accent-foreground border-gray-200 dark:border-gray-700 shadow-sm"
                      )}
                    >
                      <span className="relative z-10">Bennett</span>
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-r from-[#90AEAD] to-[#874F41] transition-opacity duration-300"></div>
                      {isActive("/bennett") && (
                        <motion.div 
                          className="absolute bottom-0 left-0 h-0.5 bg-[#90AEAD] w-full"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </NavigationMenuLink>
                  </motion.div>
                </Link>
              </NavigationMenuItem>
              
              {/* Faculties Link */}
              <NavigationMenuItem>
                <Link to="/faculties">
                  <motion.div
                    custom={2}
                    variants={navItemVariants}
                    initial="initial"
                    animate="animate"
                    whileHover="hover"
                  >
                    <NavigationMenuLink
                      className={cn(
                        "group inline-flex h-10 w-max items-center justify-center rounded-md backdrop-blur-md bg-white/10 dark:bg-white/5 px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 relative overflow-hidden border border-transparent hover:border-gray-200 dark:hover:border-gray-700",
                        isActive("/faculties") && "bg-accent text-accent-foreground border-gray-200 dark:border-gray-700 shadow-sm"
                      )}
                    >
                      <span className="relative z-10">Faculties</span>
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-r from-[#874F41] to-[#E64833] transition-opacity duration-300"></div>
                      {isActive("/faculties") && (
                        <motion.div 
                          className="absolute bottom-0 left-0 h-0.5 bg-[#874F41] w-full"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </NavigationMenuLink>
                  </motion.div>
                </Link>
              </NavigationMenuItem>
              
              {/* Resources Dropdown (replaced Syllabus) - Improved styling */}
              <NavigationMenuItem className="relative">
                <NavigationMenuTrigger
                  className={cn(
                    "group inline-flex h-10 w-max items-center justify-center rounded-md backdrop-blur-md bg-white/10 dark:bg-white/5 px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 relative overflow-hidden border border-transparent hover:border-gray-200 dark:hover:border-gray-700",
                  )}
                  aria-label="Resources Dropdown"
                >
                  <motion.div
                    custom={3}
                    variants={navItemVariants}
                    initial="initial"
                    animate="animate"
                  >
                    <span className="relative z-10">Resources</span>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-r from-[#E64833] to-[#244855] transition-opacity duration-300"></div>
                  </motion.div>
                </NavigationMenuTrigger>
                <NavigationMenuContent className="absolute left-0 top-[100%] min-w-[220px] bg-white dark:bg-[#1E3A47] p-2 rounded-md shadow-lg border border-gray-200 dark:border-gray-700">
                  <ul className="grid gap-1">
                    <li>
                      <a 
                        href="http://10.6.0.121/gdroombooking/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-[#142A35] transition-colors"
                        aria-label="GD Room Booking"
                      >
                        <FileText size={18} className="text-[#244855] dark:text-[#A8C0BF]" />
                        <span>GD Room Booking</span>
                      </a>
                    </li>
                    <li>
                      <a 
                        href="#" 
                        onClick={(e) => {
                          e.preventDefault();
                          downloadSyllabus();
                        }}
                        className="flex items-center gap-2 p-2 rounded-md bg-[#E64833]/10 dark:bg-[#D6402D]/10 hover:bg-[#E64833]/20 dark:hover:bg-[#D6402D]/20 text-[#E64833] dark:text-[#D6402D] font-medium transition-colors"
                        aria-label="Download B.Tech Syllabus"
                      >
                        <Download size={18} />
                        <span>B. Tech Syllabus</span>
                      </a>
                    </li>
                    <li>
                      <a 
                        href="https://bennett.refread.com/#/home" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-[#142A35] transition-colors"
                        aria-label="E-Library (PYQs)"
                      >
                        <BookOpen size={18} className="text-[#244855] dark:text-[#A8C0BF]" />
                        <span>E-Library (PYQs)</span>
                      </a>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              {/* Events Link */}
              <NavigationMenuItem>
                <Link to="/events">
                  <motion.div
                    custom={4}
                    variants={navItemVariants}
                    initial="initial"
                    animate="animate"
                    whileHover="hover"
                  >
                    <NavigationMenuLink
                      className={cn(
                        "group inline-flex h-10 w-max items-center justify-center rounded-md backdrop-blur-md bg-white/10 dark:bg-white/5 px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 relative overflow-hidden border border-transparent hover:border-gray-200 dark:hover:border-gray-700",
                        isActive("/events") && "bg-accent text-accent-foreground border-gray-200 dark:border-gray-700 shadow-sm"
                      )}
                    >
                      <span className="relative z-10">Events</span>
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-r from-[#244855] to-[#874F41] transition-opacity duration-300"></div>
                      {isActive("/events") && (
                        <motion.div 
                          className="absolute bottom-0 left-0 h-0.5 bg-[#244855] w-full"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </NavigationMenuLink>
                  </motion.div>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-2"
          >
            {/* Dark Mode Toggle */}
            <DarkModeToggle />
            
            <Link to="/auth">
              <Button 
                className="relative overflow-hidden group"
                variant="default"
              >
                <span className="relative z-10 text-white font-bold">Login / Sign Up</span>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-[#244855] to-[#1e3941] dark:from-[#90AEAD] dark:to-[#768e8d] transition-colors duration-300" 
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-[#1e3941] to-[#244855] dark:from-[#768e8d] dark:to-[#90AEAD] transition-all duration-300"
                  initial={{ scale: 1.1 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.header>
    </>
  );
};

export default Header;
