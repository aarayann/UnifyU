
import { useEffect, useRef } from "react";
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { GraduationCap, Laptop, Brain, MessageSquare, ExternalLink } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const Index = () => {
  const location = useLocation();
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to top when the page loads or when the hash is "#top"
    if (location.hash === "#top" && topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  // Initialize IntersectionObserver to trigger animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));

    return () => {
      animatedElements.forEach(el => observer.unobserve(el));
    };
  }, []);

  const openVirtualTour = () => {
    window.open("https://www.bennett.edu.in/campus-tour/", "_blank");
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };
  
  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <div className="flex flex-col min-h-screen" ref={topRef}>
      <Hero />
      
      {/* Features Section with Enhanced Animations */}
      <section className="py-16 bg-muted/30 dark:bg-muted/10 relative overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 z-0">
          <motion.div 
            className="absolute top-0 left-0 right-0 h-40 opacity-20"
            style={{ 
              backgroundImage: `radial-gradient(circle, var(--primary-color) 1px, transparent 1px)`,
              backgroundSize: '20px 20px',
              '--primary-color': '#244855'
            } as any}
            animate={{ 
              y: [0, 20, 0],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ 
              repeat: Infinity,
              duration: 8,
              ease: "easeInOut"
            }}
          />
        </div>
      
        <div className="container mx-auto px-4 relative z-10">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12 text-primary dark:text-primary-foreground animate-on-scroll"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="relative">
              Powerful Features That Make a Difference
              <motion.div 
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-secondary"
                initial={{ width: 0 }}
                whileInView={{ width: "80%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </span>
          </motion.h2>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                icon: GraduationCap,
                colorClass: "bg-primary/10 text-primary",
                title: "Smart Learning",
                description: "AI-powered study recommendations based on your progress, strengths, and areas for improvement.",
              },
              {
                icon: Laptop,
                colorClass: "bg-secondary/10 text-secondary",
                title: "Unified Dashboard",
                description: "All your academic info in one place: schedule, assignments, grades, and administrative tasks.",
              },
              {
                icon: Brain,
                colorClass: "bg-accent/10 text-accent",
                title: "AI Assistant",
                description: "Get instant help with course concepts, assignment clarification, and study resources.",
              },
              {
                icon: MessageSquare,
                colorClass: "bg-primary/10 text-primary",
                title: "Collaboration Tools",
                description: "Connect with peers and professors through integrated discussion forums and group spaces.",
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="animate-on-scroll"
              >
                <Card className="premium-card overflow-hidden h-full premium-glass border-t-4 border-t-primary dark:border-t-secondary">
                  <CardContent className="pt-6 p-6 flex flex-col items-center">
                    <motion.div 
                      className={`rounded-full ${feature.colorClass} p-4 w-16 h-16 flex items-center justify-center mb-4 mx-auto`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <feature.icon className="" size={28} />
                    </motion.div>
                    <h3 className="text-xl font-bold mb-2 text-primary dark:text-primary-foreground text-center">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-center">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Campus Tour Call-to-Action - Updated with animations */}
      <motion.section 
        className="py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4">
          <motion.div 
            className="bg-primary rounded-2xl overflow-hidden shadow-xl relative animate-on-scroll"
            initial={{ y: 80, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ 
              type: "spring",
              stiffness: 70,
              damping: 20
            }}
            whileHover={{ 
              y: -5,
              boxShadow: "0 25px 50px -12px rgba(36, 72, 85, 0.25)"
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8 md:p-12 flex flex-col justify-center relative z-10">
                {/* Animated floating blob */}
                <motion.span 
                  className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-secondary/20 filter blur-3xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.3, 0.2],
                    rotate: [0, 90, 0]
                  }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.h2 
                  className="text-3xl font-bold mb-4 text-white font-playfair"
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  Explore Our Campus
                </motion.h2>
                <motion.p 
                  className="text-white/90 mb-6"
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  Discover state-of-the-art facilities, vibrant student spaces, and the innovative environment where your academic journey will unfold.
                </motion.p>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                >
                  <Button
                    onClick={openVirtualTour}
                    className="inline-flex items-center justify-center rounded-md bg-white text-primary px-6 py-3 text-sm font-semibold shadow hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 btn-glow group animate-pulse-soft"
                  >
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      Take a Virtual Tour
                    </motion.span>
                    <motion.div
                      className="ml-2"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}
                    >
                      <ExternalLink size={16} />
                    </motion.div>
                  </Button>
                </motion.div>
              </div>
              <div className="relative h-64 md:h-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/30 mix-blend-multiply z-10"></div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                >
                  <AspectRatio ratio={16 / 9} className="h-full">
                    <img 
                      src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop" 
                      alt="Campus" 
                      className="object-cover object-center w-full h-full"
                    />
                  </AspectRatio>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>
      
      {/* Call to Action - Updated design and animations */}
      <section className="py-16 bg-muted/30 dark:bg-muted/10 relative overflow-hidden">
        {/* Animated background elements */}
        <motion.div 
          className="absolute w-64 h-64 rounded-full bg-primary/10 -top-32 -left-32 filter blur-3xl"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div 
          className="absolute w-64 h-64 rounded-full bg-secondary/10 -bottom-32 -right-32 filter blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            repeatType: "reverse",
            delay: 2
          }}
        />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            className="animate-on-scroll"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ 
              type: "spring",
              stiffness: 50,
              damping: 15
            }}
          >
            <motion.h2 
              className="text-3xl font-bold mb-4 text-primary dark:text-primary-foreground font-playfair"
              initial={{ y: -20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Ready to Transform Your College Experience?
            </motion.h2>

            <motion.p 
              className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Join thousands of students and faculty members already using UnifyU to enhance their academic journey.
            </motion.p>
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ 
                type: "spring",
                stiffness: 100,
                delay: 0.4
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/auth">
                <Button className="bg-secondary hover:bg-secondary/90 text-white px-8 py-6 text-lg rounded-lg shadow-lg btn-glow relative overflow-hidden group">
                  <motion.span
                    className="absolute inset-0 w-full h-full bg-white opacity-0 group-hover:opacity-20"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 1 }}
                  />
                  Get Started Today
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
