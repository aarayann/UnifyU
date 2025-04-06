
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const Bennett = () => {
  const videoRef1 = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    // Initialize IntersectionObserver for lazy loading videos
    const options = {
      root: null,
      rootMargin: '0px',
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

  return (
    <div className="min-h-screen">
      {/* Hero Section with Bennett Logo */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#244855]/80 to-transparent dark:from-[#1A3641]/90 dark:to-transparent z-10"></div>
        <div className="relative h-[50vh] md:h-[70vh] overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop" 
            alt="Bennett University Campus" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
            <motion.div 
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="flex flex-col items-center"
            >
              <img 
                src="https://www.bennett.edu.in/wp-content/uploads/2025/01/NAAC-Logo-2025-webp-1.webp" 
                alt="Bennett University Logo" 
                className="h-20 md:h-32 mb-4 drop-shadow-lg"
              />
              {/* <h1 className="text-4xl md:text-6xl font-bold text-white text-center drop-shadow-lg mb-2">
                Bennett University
              </h1> */}
              <p className="text-xl font-bold text-white text-center max-w-2xl px-4 drop-shadow-md">
              Ecosystem for Academic and Research Excellence through Innovations, Incubation and Entrepreneurship
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Video Gallery Section */}
      <section className="py-16 bg-[#FBE9D0]/20 dark:bg-[#1E3A47]/20">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold text-[#244855] dark:text-white mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Experience Our Campus
          </motion.h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Local Video 1 */}
            <motion.div 
              className="rounded-lg overflow-hidden shadow-lg"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <AspectRatio ratio={16 / 9}>
                <video
                  ref={videoRef1}
                  data-src="https://assets.mixkit.co/videos/preview/mixkit-students-walking-in-a-university-campus-4519-large.mp4"
                  controls
                  poster="https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  className="w-full h-full object-cover"
                >
                  Your browser does not support the video tag.
                </video>
              </AspectRatio>
              <div className="p-4 bg-white dark:bg-[#1E3A47]">
                <h3 className="text-xl font-bold text-[#244855] dark:text-white">Campus Tour</h3>
                <p className="text-gray-600 dark:text-gray-300">Explore our state-of-the-art facilities and vibrant campus life.</p>
              </div>
            </motion.div>
            
            {/* Local Video 2 */}
            <motion.div 
              className="rounded-lg overflow-hidden shadow-lg"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <AspectRatio ratio={16 / 9}>
                <video
                  ref={videoRef2}
                  data-src="https://assets.mixkit.co/videos/preview/mixkit-teacher-giving-a-lecture-to-her-students-9512-large.mp4"
                  controls
                  poster="https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  className="w-full h-full object-cover"
                >
                  Your browser does not support the video tag.
                </video>
              </AspectRatio>
              <div className="p-4 bg-white dark:bg-[#1E3A47]">
                <h3 className="text-xl font-bold text-[#244855] dark:text-white">Academic Excellence</h3>
                <p className="text-gray-600 dark:text-gray-300">Learn from industry experts and distinguished faculty.</p>
              </div>
            </motion.div>
          </div>
          
          {/* YouTube Video */}
          <motion.div 
            className="rounded-lg overflow-hidden shadow-lg mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-[#244855] dark:text-white mb-4 text-center">
              The Bennett Library
            </h3>
            <AspectRatio ratio={16 / 9}>
              <iframe 
                src="https://www.youtube.com/watch?v=qdB9mTBZsxQ" 
                title="Bennett University Library Tour" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="w-full h-full border-0"
              ></iframe>
            </AspectRatio>
            <div className="p-4 bg-white dark:bg-[#1E3A47]">
              <p className="text-gray-600 dark:text-gray-300">Explore our extensive library collection and modern study spaces designed for collaborative learning.</p>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* University Events Section */}
      <section className="py-16 bg-[#244855] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <h2 className="text-3xl font-bold mb-4">University Events</h2>
              <p className="text-lg text-[#FBE9D0]">
                Stay updated with the latest happenings and upcoming events at Bennett University. From academic conferences to cultural festivals, there's always something exciting happening on campus.
              </p>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <Calendar className="mr-3 text-[#E64833]" />
                  <h3 className="text-xl font-bold">Upcoming Events</h3>
                </div>
                <ul className="space-y-3 text-left">
                  <li className="flex items-start">
                    <span className="inline-block w-24 text-[#E64833] font-medium">May 15</span>
                    <span>Technology Summit 2025</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-24 text-[#E64833] font-medium">June 2</span>
                    <span>Annual Sports Meet</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-24 text-[#E64833] font-medium">June 20</span>
                    <span>Graduation Ceremony</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <Calendar className="mr-3 text-[#E64833]" />
                  <h3 className="text-xl font-bold">Recent Events</h3>
                </div>
                <ul className="space-y-3 text-left">
                  <li className="flex items-start">
                    <span className="inline-block w-24 text-[#E64833] font-medium">April 10</span>
                    <span>International Conference on AI</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-24 text-[#E64833] font-medium">March 25</span>
                    <span>Bennett Cultural Festival</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-24 text-[#E64833] font-medium">March 3</span>
                    <span>Industry Expert Talk Series</span>
                  </li>
                </ul>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link to="/events">
                <Button className="bg-[#E64833] hover:bg-[#D6402D] text-white group">
                  <span>View All Events</span>
                  <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Bennett;
