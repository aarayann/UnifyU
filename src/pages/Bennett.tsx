import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, ExternalLink, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent } from "@/components/ui/card";

const Bennett = () => {
  const videoRef1 = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const fadeIn = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  
  useEffect(() => {
    // Initialize IntersectionObserver for lazy loading videos
    const options = {
      root: null,
      rootMargin: '100px',
      threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const video = entry.target as HTMLVideoElement;
          if (video.dataset.src) {
            video.src = video.dataset.src;
            video.load();
            observer.unobserve(video);
          }
        }
      });
    }, options);
    
    // Observe videos
    if (videoRef1.current) observer.observe(videoRef1.current);
    if (videoRef2.current) observer.observe(videoRef2.current);
    
    return () => {
      if (videoRef1.current) observer.unobserve(videoRef1.current);
      if (videoRef2.current) observer.unobserve(videoRef2.current);
    };
  }, []);

  const downloadCalendar = () => {
    const link = document.createElement('a');
    
    // Correct the path for the file to be relative to the public folder
    link.href = '/AcademicCalender.pdf';  // Path to your PDF in the public folder (assuming it is placed in the root of the public folder)
    
    // Name the file as it will be downloaded
    link.download = 'AcademicCalender.pdf'; // File will be named when downloaded
    
    // Append link to body, simulate click to trigger download, then remove the link
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  

  return (
    <div className="min-h-screen" ref={containerRef}>
      {/* Hero Section with Bennett Logo and Parallax Effect */}
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y: backgroundY }}
        >
          <img 
            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop" 
            alt="Bennett University Campus" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#244855]/80 to-transparent dark:from-[#1A3641]/90 dark:to-transparent"></div>
        </motion.div>

        <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
          <motion.div 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="flex flex-col items-center"
          >
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-3xl md:text-5xl font-bold text-white mb-4 text-center drop-shadow-lg"
            >
              {/* Bennett University */}
            </motion.h1>
            <motion.img 
              whileHover={{ scale: 1.05, rotateY: 5, rotateX: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
              src="https://www.bennett.edu.in/wp-content/uploads/2025/01/NAAC-Logo-2025-webp-1.webp" 
              alt="Bennett University Logo" 
              className="h-24 md:h-32 mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]"
            />
            <motion.p 
              className="text-xl md:text-2xl font-bold text-white text-center max-w-2xl px-4 drop-shadow-md bg-black/30 backdrop-blur-sm p-4 rounded-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Ecosystem for Academic and Research Excellence through Innovations, Incubation and Entrepreneurship
            </motion.p>
          </motion.div>
        </div>

        {/* Animated scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white"
          animate={{ 
            y: [0, 10, 0],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 2,
          }}
        >
          <span className="text-sm font-medium mb-2">Scroll to explore</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5L12 19M12 19L19 12M12 19L5 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </section>
      
      {/* Gallery Section with Creative Layout */}
      <section className="py-16 bg-[#FBE9D0]/20 dark:bg-[#1E3A47]/20">
        <div className="container mx-auto">
          <motion.h2 
            className="text-3xl font-bold text-[#244855] dark:text-white mb-8 md:mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Experience Our Campus
          </motion.h2>
          
          {/* Video Gallery - Updated Modern Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16">
            {/* Video Cards: Now placed side by side on wider screens with aspect ratio preservation */}
            <motion.div 
              className="lg:col-span-6 rounded-lg overflow-hidden shadow-lg h-full"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
            >
              <Card className="h-full overflow-hidden border-none shadow-lg dark:shadow-[0_4px_12px_-2px_rgba(0,0,0,0.3)] dark:bg-[#1E3A47] bg-white">
              <AspectRatio ratio={16 / 9} className="relative overflow-hidden">
              <video
              ref={videoRef1}
              autoPlay
              loop
              muted
              playsInline
              controls
              className="w-full h-full object-cover"
              >
              <source src="/Ben1.mp4" type="video/mp4" />
              Your browser does not support the video tag.
              </video>
              </AspectRatio>


                  {/* <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-xl font-bold mb-1">Campus Tour</h3>
                      <p className="text-sm">Discover our beautiful campus</p>
                    </div> */}
                <CardContent className="p-4 bg-white dark:bg-[#1E3A47]">
                  <h3 className="text-xl font-bold text-[#244855] dark:text-white">Campus Tour</h3>
                  <p className="text-gray-600 dark:text-gray-300">Explore our state-of-the-art facilities and vibrant campus life.</p>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Secondary Video */}
            <motion.div 
              className="lg:col-span-6 rounded-lg overflow-hidden shadow-lg"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
            >
              <Card className="h-full overflow-hidden border-none shadow-lg dark:shadow-[0_4px_12px_-2px_rgba(0,0,0,0.3)] dark:bg-[#1E3A47] bg-white">
              <AspectRatio ratio={16 / 9} className="relative overflow-hidden">
              <video
              ref={videoRef2}
              autoPlay
              loop
              muted
              playsInline
              controls
              className="w-full h-full object-cover"
              >
              <source src="/Ben2.mp4" type="video/mp4" />
              Your browser does not support the video tag.
              </video>
              </AspectRatio>

                <CardContent className="p-4 bg-white dark:bg-[#1E3A47]">
                  <h3 className="text-xl font-bold text-[#244855] dark:text-white">Academic Excellence</h3>
                  <p className="text-gray-600 dark:text-gray-300">Learn from industry experts and distinguished faculty.</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
          
          {/* YouTube Video - Updated Styling */}
          <motion.div 
            className="rounded-lg overflow-hidden shadow-xl mb-8 md:mb-12 relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            whileHover={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#244855]/10 to-[#E64833]/10 dark:from-[#244855]/20 dark:to-[#E64833]/20 z-10 pointer-events-none"></div>
            <div className="p-6 bg-white dark:bg-[#1E3A47] text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 inline-block">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#244855] to-[#E64833] dark:from-[#90AEAD] dark:to-[#E64833]">
                  The Bennett Library
                </span>
              </h3>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
                Explore our extensive library collection and modern study spaces designed for collaborative learning.
              </p>
            </div>
            <AspectRatio ratio={16 / 9} className="w-full">
              <iframe 
                src="https://www.youtube.com/embed/qdB9mTBZsxQ" 
                title="Bennett University Library Tour" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="w-full h-full border-0"
              ></iframe>
            </AspectRatio>
          </motion.div>
        </div>
      </section>
      
      {/* University Events Section - Updated Design */}
      <section className="py-16 relative">
        <div className="absolute inset-0 bg-[#244855]"></div>
        <div className="absolute inset-0 opacity-15 bg-[url('https://images.unsplash.com/photo-1517971071642-34a2d3ecc9cd?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat mix-blend-overlay"></div>
        
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-8 md:mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">University Events</h2>
              <p className="text-lg text-[#FBE9D0] max-w-2xl mx-auto">
                Stay updated with the latest happenings and upcoming events at Bennett University. From academic conferences to cultural festivals, there's always something exciting happening on campus.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <motion.div 
                className="backdrop-blur-md bg-white/10 p-6 rounded-lg border border-white/20 shadow-lg"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
              >
                <div className="flex items-center mb-4">
                  <Calendar className="mr-3 text-[#E64833]" />
                  <h3 className="text-xl font-bold text-white">Upcoming Events</h3>
                </div>
                <ul className="space-y-4 text-left">
                  <li className="flex items-start">
                    <span className="inline-block w-24 text-[#E64833] font-medium">May 15</span>
                    <span className="text-white">Technology Summit 2025</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-24 text-[#E66833] font-medium">June 2</span>
                    <span className="text-white">Annual Sports Meet</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-24 text-[#E64833] font-medium">June 20</span>
                    <span className="text-white">Graduation Ceremony</span>
                  </li>
                </ul>
              </motion.div>
              
              <motion.div 
                className="backdrop-blur-md bg-white/10 p-6 rounded-lg border border-white/20 shadow-lg"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
              >
                <div className="flex items-center mb-4">
                  <Calendar className="mr-3 text-[#E64833]" />
                  <h3 className="text-xl font-bold text-white">Recent Events</h3>
                </div>
                <ul className="space-y-4 text-left">
                  <li className="flex items-start">
                    <span className="inline-block w-24 text-[#E64833] font-medium">April 10</span>
                    <span className="text-white">International Conference on AI</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-24 text-[#E64833] font-medium">March 25</span>
                    <span className="text-white">Bennett Cultural Festival</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-24 text-[#E64833] font-medium">March 3</span>
                    <span className="text-white">Industry Expert Talk Series</span>
                  </li>
                </ul>
              </motion.div>
            </div>
            
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Link to="/events">
                <Button size="lg" className="bg-[#E64833] hover:bg-[#D6402D] text-white group">
                  <span>View All Events</span>
                  <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              
              <Button 
              size="lg" 
              className="bg-white text-black hover:bg-gray-200"
              onClick={downloadCalendar}
              > 
              <Download className="mr-2 h-4 w-4" />
              <span>Download Academic Calendar</span>
              </Button>

            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Campus Facilities Showcase - Updated Layout */}
      <section className="py-16 bg-[#FBE9D0]/20 dark:bg-[#1E3A47]/20">
        <div className="container mx-auto">
          <motion.h2 
            className="text-3xl font-bold text-center mb-8 md:mb-12 text-[#244855] dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            World-Class Facilities
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Facility 1 */}
            <motion.div
              className="rounded-lg overflow-hidden shadow-lg h-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <div className="relative h-48">
                <img 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
                  alt="Modern Classrooms" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-xl font-bold text-white">Modern Classrooms</h3>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-white dark:bg-[#1E3A47] h-full">
                <p className="text-gray-600 dark:text-gray-300">
                  Technology-enabled learning spaces designed for interactive education and collaborative learning experiences.
                </p>
              </div>
            </motion.div>
            
            {/* Facility 2 */}
            <motion.div
              className="rounded-lg overflow-hidden shadow-lg h-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <div className="relative h-48">
                <img 
                  src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=2193&auto=format&fit=crop"
                  alt="Research Labs" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-xl font-bold text-white">Research Labs</h3>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-white dark:bg-[#1E3A47] h-full">
                <p className="text-gray-600 dark:text-gray-300">
                  State-of-the-art facilities for innovation, experimentation, and advanced learning across disciplines.
                </p>
              </div>
            </motion.div>
            
            {/* Facility 3 */}
            <motion.div
              className="rounded-lg overflow-hidden shadow-lg h-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <div className="relative h-48">
                <img 
                  src="https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=2070&auto=format&fit=crop"
                  alt="Sports Complex" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-xl font-bold text-white">Sports Complex</h3>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-white dark:bg-[#1E3A47] h-full">
                <p className="text-gray-600 dark:text-gray-300">
                  Comprehensive facilities for sports and physical activities, including indoor and outdoor sporting venues.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-[#244855] to-[#1A3641] text-white">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white drop-shadow-lg">
              Join Bennett University
            </h2>

            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Be part of our vibrant community and experience world-class education with cutting-edge facilities.
            </p>
            <Button 
              size="lg" 
              className="bg-[#E64833] hover:bg-[#D6402D] text-white py-6 px-8 text-lg"
              onClick={() => window.open("https://www.bennett.edu.in/admission/", "_blank")}
            >
              Apply Now
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Bennett;
