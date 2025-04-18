
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
import ProfileMenu from "./ProfileMenu";
import { supabase } from "@/lib/supabaseClient";

const HeaderWithAuth = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState<"student" | "faculty" | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
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

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        setIsAuthenticated(true);
        
        // Check user type
        const { data } = await supabase
          .from("login_users")
          .select("user_type")
          .eq("uid", session.user.id)
          .single();
          
        if (data && (data.user_type === "student" || data.user_type === "faculty")) {
          setUserType(data.user_type);
        }
      } else {
        setIsAuthenticated(false);
        setUserType(null);
      }
    };
    
    checkAuth();
    
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        setIsAuthenticated(true);
        
        // Check user type
        const { data } = await supabase
          .from("login_users")
          .select("user_type")
          .eq("uid", session.user.id)
          .single();
          
        if (data && (data.user_type === "student" || data.user_type === "faculty")) {
          setUserType(data.user_type);
        }
      } else if (event === 'SIGNED_OUT') {
        setIsAuthenticated(false);
        setUserType(null);
      }
    });

    return () => {
      if (authListener && authListener.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);
  
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
            <div className="flex items-center group relative">
              <Link to="/" onClick={scrollToTop} aria-label="UnifyU Home">
                <motion.img 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ 
                    scale: 1.08,
                    rotate: 2,
                    filter: "drop-shadow(0px 0px 12px rgba(36, 72, 85, 0.7))",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  src="/logo-unifyu.png"
                  alt="UnifyU"
                  className="h-16 md:h-20 lg:h-24 w-auto relative z-10 cursor-pointer dark:brightness-[0.85] dark:contrast-125" 
                  draggable={false}
                  loading="eager"
                  decoding="async"
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
              
              <NavigationMenuItem>
                <Link to="/bennett">
                  <motion.div custom={1} variants={navItemVariants} initial="initial" animate="animate" whileHover="hover">
                    <NavigationMenuLink
                      className={cn(
                        "group inline-flex h-10 w-max items-center justify-center rounded-md backdrop-blur-md bg-white/10 dark:bg-white/5 px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 relative overflow-hidden border border-transparent hover:border-gray-200 dark:hover:border-gray-700",
                        isActive("/bennett") && "bg-accent text-accent-foreground border-gray-200 dark:border-gray-700 shadow-sm"
                      )}
                    >
                      <span className="relative z-10">Bennett</span>
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-r from-[#90AEAD] to-[#874F41] transition-opacity duration-300"></div>
                      {isActive("/bennett") && (
                        <motion.div className="absolute bottom-0 left-0 h-0.5 bg-[#90AEAD] w-full" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.3 }} />
                      )}
                    </NavigationMenuLink>
                  </motion.div>
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link to="/faculties">
                  <motion.div custom={2} variants={navItemVariants} initial="initial" animate="animate" whileHover="hover">
                    <NavigationMenuLink
                      className={cn(
                        "group inline-flex h-10 w-max items-center justify-center rounded-md backdrop-blur-md bg-white/10 dark:bg-white/5 px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 relative overflow-hidden border border-transparent hover:border-gray-200 dark:hover:border-gray-700",
                        isActive("/faculties") && "bg-accent text-accent-foreground border-gray-200 dark:border-gray-700 shadow-sm"
                      )}
                    >
                      <span className="relative z-10">Faculties</span>
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-r from-[#874F41] to-[#E64833] transition-opacity duration-300"></div>
                      {isActive("/faculties") && (
                        <motion.div className="absolute bottom-0 left-0 h-0.5 bg-[#874F41] w-full" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.3 }} />
                      )}
                    </NavigationMenuLink>
                  </motion.div>
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link to="/resources">
                  <motion.div custom={3} variants={navItemVariants} initial="initial" animate="animate" whileHover="hover">
                    <NavigationMenuLink
                      className={cn(
                        "group inline-flex h-10 w-max items-center justify-center rounded-md backdrop-blur-md bg-white/10 dark:bg-white/5 px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 relative overflow-hidden border border-transparent hover:border-gray-200 dark:hover:border-gray-700",
                        isActive("/resources") && "bg-accent text-accent-foreground border-gray-200 dark:border-gray-700 shadow-sm"
                      )}
                    >
                      <span className="relative z-10">Resources</span>
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-r from-[#E64833] to-[#244855] transition-opacity duration-300"></div>
                      {isActive("/resources") && (
                        <motion.div className="absolute bottom-0 left-0 h-0.5 bg-[#E64833] w-full" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.3 }} />
                      )}
                    </NavigationMenuLink>
                  </motion.div>
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link to="/events">
                  <motion.div custom={4} variants={navItemVariants} initial="initial" animate="animate" whileHover="hover">
                    <NavigationMenuLink
                      className={cn(
                        "group inline-flex h-10 w-max items-center justify-center rounded-md backdrop-blur-md bg-white/10 dark:bg-white/5 px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 relative overflow-hidden border border-transparent hover:border-gray-200 dark:hover:border-gray-700",
                        isActive("/events") && "bg-accent text-accent-foreground border-gray-200 dark:border-gray-700 shadow-sm"
                      )}
                    >
                      <span className="relative z-10">Events</span>
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-r from-[#244855] to-[#874F41] transition-opacity duration-300"></div>
                      {isActive("/events") && (
                        <motion.div className="absolute bottom-0 left-0 h-0.5 bg-[#244855] w-full" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.3 }} />
                      )}
                    </NavigationMenuLink>
                  </motion.div>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          <div className="md:hidden">
            <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="h-10 w-10">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-[1.2rem] w-[1.2rem]">
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                  </svg>
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px] bg-white dark:bg-[#1E3A47] p-2">
                <DropdownMenuItem>
                  <Link to="/" className="flex w-full" onClick={() => setIsMenuOpen(false)}>Home</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/bennett" className="flex w-full" onClick={() => setIsMenuOpen(false)}>Bennett</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/faculties" className="flex w-full" onClick={() => setIsMenuOpen(false)}>Faculties</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/resources" className="flex w-full" onClick={() => setIsMenuOpen(false)}>Resources</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/events" className="flex w-full" onClick={() => setIsMenuOpen(false)}>Events</Link>
                </DropdownMenuItem>
                {!isAuthenticated && (
                  <DropdownMenuItem className="mt-2">
                    <Link 
                      to="/auth" 
                      className="flex w-full bg-[#244855] text-white px-3 py-2 rounded-md font-medium text-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login / Sign Up
                    </Link>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-2"
          >
            <DarkModeToggle />
            
            {isAuthenticated ? (
              <div className="hidden md:block">
                {userType && <ProfileMenu userType={userType} />}
              </div>
            ) : (
              <Link to="/auth" className="hidden md:block">
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
            )}
          </motion.div>
        </div>
      </motion.header>
    </>
  );
};

export default HeaderWithAuth;
