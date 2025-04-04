
import { useEffect, useRef } from "react";
import Hero from "@/components/Hero";
import FacultyHeader from "@/components/FacultyHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { GraduationCap, Laptop, Brain, MessageSquare } from "lucide-react";
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

  return (
    <div className="flex flex-col min-h-screen" ref={topRef}>
      <Hero />
      
      {/* Features Section */}
      <section className="py-16 bg-[#FBE9D0]/30 dark:bg-[#1E3A47]/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#244855] dark:text-white">Powerful Features That Make a Difference</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 dark:bg-[#1E3A47]">
              <CardContent className="pt-6">
                <div className="rounded-full bg-[#E64833]/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <GraduationCap className="text-[#E64833] dark:text-[#D6402D]" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2 text-[#244855] dark:text-white">Smart Learning</h3>
                <p className="text-gray-600 dark:text-gray-300">AI-powered study recommendations based on your progress, strengths, and areas for improvement.</p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 dark:bg-[#1E3A47]">
              <CardContent className="pt-6">
                <div className="rounded-full bg-[#244855]/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Laptop className="text-[#244855] dark:text-[#A8C0BF]" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2 text-[#244855] dark:text-white">Unified Dashboard</h3>
                <p className="text-gray-600 dark:text-gray-300">All your academic info in one place: schedule, assignments, grades, and administrative tasks.</p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 dark:bg-[#1E3A47]">
              <CardContent className="pt-6">
                <div className="rounded-full bg-[#874F41]/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Brain className="text-[#874F41]" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2 text-[#244855] dark:text-white">AI Assistant</h3>
                <p className="text-gray-600 dark:text-gray-300">Get instant help with course concepts, assignment clarification, and study resources.</p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 dark:bg-[#1E3A47]">
              <CardContent className="pt-6">
                <div className="rounded-full bg-[#90AEAD]/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <MessageSquare className="text-[#90AEAD]" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2 text-[#244855] dark:text-white">Collaboration Tools</h3>
                <p className="text-gray-600 dark:text-gray-300">Connect with peers and professors through integrated discussion forums and group spaces.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Faculty Header Section */}
      <FacultyHeader />
      
      {/* Campus Tour Call-to-Action */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-[#244855] rounded-2xl overflow-hidden shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <h2 className="text-3xl font-bold mb-4 text-white">Explore Our Campus</h2>
                <p className="text-[#FBE9D0] mb-6">
                  Discover state-of-the-art facilities, vibrant student spaces, and the innovative environment where your academic journey will unfold.
                </p>
                <div>
                  <Link
                    to="/bennett"
                    className="inline-flex items-center justify-center rounded-md bg-[#E64833] px-5 py-2.5 text-sm font-medium text-white shadow hover:bg-[#d13e2b] focus:outline-none focus:ring-2 focus:ring-[#E64833] focus:ring-offset-2"
                  >
                    Explore Bennett
                  </Link>
                </div>
              </div>
              <div className="relative h-64 md:h-auto">
                <AspectRatio ratio={16 / 9} className="h-full">
                  <img 
                    src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop" 
                    alt="Campus" 
                    className="object-cover object-center w-full h-full"
                  />
                  <div className="absolute inset-0 bg-black/20"></div>
                </AspectRatio>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-[#90AEAD]/10 dark:bg-[#1A3641]/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-[#244855] dark:text-white">Ready to Transform Your College Experience?</h2>
          <p className="text-xl text-gray-600 dark:text-[#E0E0E0] mb-8 max-w-2xl mx-auto">
            Join thousands of students and faculty members already using UnifyU to enhance their academic journey.
          </p>
          <Link to="/auth">
            <Button className="bg-[#E64833] hover:bg-[#d13e2b] text-white px-8 py-6 text-lg">
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
