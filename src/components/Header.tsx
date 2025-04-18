
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  NavigationMenu, 
  NavigationMenuList, 
  NavigationMenuItem, 
  NavigationMenuLink,
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

const Header = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Handle scroll effects
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

  const navItemVariants = {
    initial: { y: -20, opacity: 0 },
    animate: (custom: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.1 * custom,
        duration: 0.3,
        ease: "easeOut"
      }
    }),
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    }
  };

  // Navigation items - simplified to reduce complexity
  const navItems = [
    { path: "/", label: "Home", index: 0 },
    { path: "/bennett", label: "Bennett", index: 1 },
    { path: "/faculties", label: "Faculties", index: 2 },
    { path: "/resources", label: "Resources", index: 3 },
    { path: "/events", label: "Events", index: 4 },
  ];

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(
        "sticky top-0 z-50 w-full backdrop-blur-lg bg-white/80 dark:bg-background/80 transition-colors duration-200",
        scrolled ? "shadow-md" : "border-b"
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <motion.div 
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center">
            <Link to="/" onClick={scrollToTop} aria-label="UnifyU Home" className="flex items-center">
              <motion.img 
                src="/logo-unifyu.png"
                alt="UnifyU"
                className="h-12 w-auto relative z-10 cursor-pointer dark:brightness-[0.85]" 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="ml-2 text-sm font-medium text-muted-foreground hidden sm:block"
              >
                Your Campus, Reimagined.
              </motion.span>
            </Link>
          </div>
        </motion.div>
        
        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="flex gap-2 lg:gap-4">
            {navItems.map((item) => (
              <NavigationMenuItem key={item.path}>
                <Link to={item.path} onClick={scrollToTop}>
                  <motion.div
                    custom={item.index}
                    variants={navItemVariants}
                    initial="initial"
                    animate="animate"
                    whileHover="hover"
                  >
                    <NavigationMenuLink
                      className={cn(
                        "group inline-flex h-9 w-max items-center justify-center rounded-md px-3 py-1 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground relative overflow-hidden border border-transparent hover:border-gray-200",
                        isActive(item.path) && "bg-accent text-accent-foreground border-gray-200 dark:border-gray-700 shadow-sm"
                      )}
                    >
                      <span className="relative z-10">{item.label}</span>
                      {isActive(item.path) && (
                        <motion.div 
                          className="absolute bottom-0 left-0 h-0.5 bg-primary w-full"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </NavigationMenuLink>
                  </motion.div>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        
        {/* Mobile Navigation */}
        <div className="md:hidden">
          <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="h-9 w-9">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px] bg-white dark:bg-gray-900 p-2 mr-2 shadow-lg">
              {navItems.map((item) => (
                <DropdownMenuItem key={item.path} className="p-0">
                  <Link 
                    to={item.path} 
                    className={`flex w-full px-3 py-2 rounded-md ${isActive(item.path) ? 'bg-accent text-accent-foreground' : ''}`} 
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem className="mt-2 p-0">
                <Link 
                  to="/auth" 
                  className="w-full bg-primary text-primary-foreground px-3 py-2 rounded-md flex justify-center" 
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login / Sign Up
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        {/* Auth Buttons and Dark Mode */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="flex items-center gap-2"
        >
          <DarkModeToggle />
          
          <Link to="/auth" className="hidden md:block">
            <Button 
              className="relative overflow-hidden group"
              variant="default"
              size="sm"
            >
              <span className="relative z-10 font-medium">Login / Sign Up</span>
            </Button>
          </Link>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;
