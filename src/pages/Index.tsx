
import { useEffect, useRef } from "react";
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { GraduationCap, Laptop, Brain, MessageSquare, ExternalLink } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Index = () => {
  const location = useLocation();
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to top when the page loads or when the hash is "#top"
    if (location.hash === "#top" && topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  const openVirtualTour = () => {
    window.open("https://www.bennett.edu.in/campus-tour/", "_blank");
  };

  return (
    <div className="flex flex-col min-h-screen" ref={topRef}>
      <Hero />
      
      {/* Features Section */}
      <section className="py-16 bg-muted/30 dark:bg-muted/10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary dark:text-primary-foreground">Powerful Features That Make a Difference</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="premium-card hover-card overflow-hidden">
              <CardContent className="pt-6 p-6">
                <div className="rounded-full bg-primary/10 p-4 w-16 h-16 flex items-center justify-center mb-4 mx-auto">
                  <GraduationCap className="text-primary" size={28} />
                </div>
                <h3 className="text-xl font-bold mb-2 text-primary dark:text-primary-foreground text-center">Smart Learning</h3>
                <p className="text-gray-600 dark:text-gray-300 text-center">AI-powered study recommendations based on your progress, strengths, and areas for improvement.</p>
              </CardContent>
            </Card>
            
            <Card className="premium-card hover-card overflow-hidden">
              <CardContent className="pt-6 p-6">
                <div className="rounded-full bg-secondary/10 p-4 w-16 h-16 flex items-center justify-center mb-4 mx-auto">
                  <Laptop className="text-secondary" size={28} />
                </div>
                <h3 className="text-xl font-bold mb-2 text-primary dark:text-primary-foreground text-center">Unified Dashboard</h3>
                <p className="text-gray-600 dark:text-gray-300 text-center">All your academic info in one place: schedule, assignments, grades, and administrative tasks.</p>
              </CardContent>
            </Card>
            
            <Card className="premium-card hover-card overflow-hidden">
              <CardContent className="pt-6 p-6">
                <div className="rounded-full bg-accent/10 p-4 w-16 h-16 flex items-center justify-center mb-4 mx-auto">
                  <Brain className="text-accent" size={28} />
                </div>
                <h3 className="text-xl font-bold mb-2 text-primary dark:text-primary-foreground text-center">AI Assistant</h3>
                <p className="text-gray-600 dark:text-gray-300 text-center">Get instant help with course concepts, assignment clarification, and study resources.</p>
              </CardContent>
            </Card>
            
            <Card className="premium-card hover-card overflow-hidden">
              <CardContent className="pt-6 p-6">
                <div className="rounded-full bg-primary/10 p-4 w-16 h-16 flex items-center justify-center mb-4 mx-auto">
                  <MessageSquare className="text-primary" size={28} />
                </div>
                <h3 className="text-xl font-bold mb-2 text-primary dark:text-primary-foreground text-center">Collaboration Tools</h3>
                <p className="text-gray-600 dark:text-gray-300 text-center">Connect with peers and professors through integrated discussion forums and group spaces.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Campus Tour Call-to-Action - Updated style and layout */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-primary rounded-2xl overflow-hidden shadow-xl relative">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8 md:p-12 flex flex-col justify-center relative z-10">
                <span className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-secondary/20 filter blur-3xl"></span>
                <h2 className="text-3xl font-bold mb-4 text-white font-playfair">Explore Our Campus</h2>
                <p className="text-white/90 mb-6">
                  Discover state-of-the-art facilities, vibrant student spaces, and the innovative environment where your academic journey will unfold.
                </p>
                <div>
                  <Button
                    onClick={openVirtualTour}
                    className="inline-flex items-center justify-center rounded-md bg-white text-primary px-6 py-3 text-sm font-semibold shadow hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 btn-glow group"
                  >
                    <span>Take a Virtual Tour</span>
                    <ExternalLink size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
              <div className="relative h-64 md:h-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/30 mix-blend-multiply z-10"></div>
                <AspectRatio ratio={16 / 9} className="h-full">
                  <img 
                    src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop" 
                    alt="Campus" 
                    className="object-cover object-center w-full h-full"
                  />
                </AspectRatio>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action - Updated design */}
      <section className="py-16 bg-muted/30 dark:bg-muted/10 relative overflow-hidden">
        <div className="absolute w-64 h-64 rounded-full bg-primary/10 -top-32 -left-32 filter blur-3xl"></div>
        <div className="absolute w-64 h-64 rounded-full bg-secondary/10 -bottom-32 -right-32 filter blur-3xl"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl font-bold mb-4 text-primary dark:text-primary-foreground font-playfair">Ready to Transform Your College Experience?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of students and faculty members already using UnifyU to enhance their academic journey.
          </p>
          <Link to="/auth">
            <Button className="bg-secondary hover:bg-secondary/90 text-white px-8 py-6 text-lg rounded-lg shadow-lg btn-glow">
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
