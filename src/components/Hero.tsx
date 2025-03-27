
import { motion } from "framer-motion";
import { Laptop, GraduationCap, Users, Brain } from "lucide-react";

const Hero = () => {
  return (
    <section className="container mx-auto py-16 px-4 md:px-6 relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-[#244855]">
          UnifyU – Your Ultimate College Companion 🚀
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
          UnifyU combines AI-powered learning, seamless ERP integration, and collaborative tools to revolutionize your academic journey. From smart study recommendations and instant AI assistance to attendance tracking, assignments, and peer discussions, everything you need is in one place.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-2xl mx-auto mb-12">
          <div className="flex items-start gap-3">
            <div className="bg-[#90AEAD] rounded-full p-2 text-white">
              <GraduationCap size={24} />
            </div>
            <p className="text-gray-700"><span className="font-medium">🎓 Learn smarter</span> with AI-driven insights</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-[#E64833] rounded-full p-2 text-white">
              <Laptop size={24} />
            </div>
            <p className="text-gray-700"><span className="font-medium">📚 Stay organized</span> with a powerful LMS & ERP</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-[#874F41] rounded-full p-2 text-white">
              <Users size={24} />
            </div>
            <p className="text-gray-700"><span className="font-medium">🤝 Collaborate</span> effortlessly with mentors & peers</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-[#244855] rounded-full p-2 text-white">
              <Brain size={24} />
            </div>
            <p className="text-gray-700"><span className="font-medium">🏆 Stay motivated</span> with leaderboards & rewards</p>
          </div>
        </div>
        
        <p className="text-lg font-medium text-[#244855]">
          Simplify, engage, and excel with UnifyU. Your college life, redefined! 🚀
        </p>
      </div>
      
      {/* Floating elements */}
      <motion.div 
        className="absolute top-20 -left-16 opacity-15 hidden md:block"
        animate={{ 
          y: [0, 15, 0], 
          rotate: [0, 5, 0]
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          repeatType: "mirror"
        }}
      >
        <Laptop size={100} className="text-[#244855]" />
      </motion.div>
      
      <motion.div 
        className="absolute top-40 -right-10 opacity-15 hidden md:block"
        animate={{ 
          y: [0, 20, 0],
          rotate: [0, -5, 0]
        }}
        transition={{ 
          duration: 7,
          repeat: Infinity,
          repeatType: "mirror",
          delay: 1
        }}
      >
        <GraduationCap size={120} className="text-[#E64833]" />
      </motion.div>
      
      <motion.div 
        className="absolute bottom-10 left-16 opacity-15 hidden md:block"
        animate={{ 
          y: [0, 15, 0],
          rotate: [0, 3, 0]
        }}
        transition={{ 
          duration: 5,
          repeat: Infinity,
          repeatType: "mirror",
          delay: 0.5
        }}
      >
        <Users size={80} className="text-[#874F41]" />
      </motion.div>
      
      <motion.div 
        className="absolute bottom-32 right-20 opacity-15 hidden md:block"
        animate={{ 
          y: [0, 20, 0],
          rotate: [0, -3, 0]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          repeatType: "mirror",
          delay: 1.5
        }}
      >
        <Brain size={90} className="text-[#90AEAD]" />
      </motion.div>
    </section>
  );
};

export default Hero;
