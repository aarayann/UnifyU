
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

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

  const downloadSyllabus = () => {
    // This will be implemented when PDF is provided
    alert("Syllabus download will be available soon");
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
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "sticky top-0 z-50 w-full backdrop-blur-lg bg-white/80 dark:bg-background/80 supports-[backdrop-filter]:bg-background/60",
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
          {/* Logo with glow effect on hover */}
          <div className="flex items-center group relative">
            <motion.img 
              whileHover={{ 
                scale: 1.05,
                filter: "drop-shadow(0px 0px 8px rgba(36, 72, 85, 0.6))" 
              }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              src="public/logo-unifyu.png" 
              alt="UnifyU" 
              className="h-10 w-auto relative z-10" 
            />
            <motion.span 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="ml-2 text-sm font-medium text-muted-foreground relative z-10"
            >
              Your Campus, Reimagined.
            </motion.span>
            <div className="absolute inset-0 bg-blue-400/0 rounded-full filter blur-xl group-hover:bg-blue-400/20 transition-all duration-500"></div>
          </div>
        </motion.div>
        
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="flex gap-6">
            {["Home", "Your Campus", "Faculties", "Syllabus"].map((item, index) => (
              <NavigationMenuItem key={item}>
                {item === "Home" ? (
                  <Link to="/">
                    <motion.div
                      custom={index}
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
                            className="absolute bottom-0 left-0 h-0.5 bg-[#244855] w-full"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.3 }}
                          />
                        )}
                      </NavigationMenuLink>
                    </motion.div>
                  </Link>
                ) : item === "Your Campus" ? (
                  <motion.button
                    custom={index}
                    variants={navItemVariants}
                    initial="initial"
                    animate="animate"
                    whileHover="hover"
                    onClick={openVirtualTour}
                    className="group inline-flex h-10 w-max items-center justify-center rounded-md backdrop-blur-md bg-white/10 dark:bg-white/5 px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
                  >
                    <span className="relative z-10">Your Campus</span>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-r from-[#90AEAD] to-[#874F41] transition-opacity duration-300"></div>
                  </motion.button>
                ) : item === "Faculties" ? (
                  <Link to="/faculties">
                    <motion.div
                      custom={index}
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
                ) : (
                  <motion.button
                    custom={index}
                    variants={navItemVariants}
                    initial="initial"
                    animate="animate"
                    whileHover="hover"
                    onClick={downloadSyllabus}
                    className="group inline-flex h-10 w-max items-center justify-center rounded-md backdrop-blur-md bg-white/10 dark:bg-white/5 px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
                  >
                    <span className="relative z-10">Syllabus</span>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-r from-[#E64833] to-[#244855] transition-opacity duration-300"></div>
                  </motion.button>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link to="/auth">
            <Button 
              className="relative overflow-hidden group"
              variant="default"
            >
              <span className="relative z-10 text-white">Login / Sign Up</span>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-[#244855] to-[#1e3941]" 
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-[#1e3941] to-[#244855] transition-opacity"
                initial={{ scale: 1.1 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              />
            </Button>
          </Link>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;
