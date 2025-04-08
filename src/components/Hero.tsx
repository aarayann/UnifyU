
import { motion, useScroll, useTransform } from "framer-motion";
import { Laptop, GraduationCap, Users, Brain } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const { scrollY } = useScroll();
  const [typingComplete, setTypingComplete] = useState(false);
  const [visibleText, setVisibleText] = useState("");
  const fullText =
    "UnifyU combines AI-powered learning, seamless ERP integration, and collaborative tools to revolutionize your academic journey. From smart study recommendations and instant AI assistance to attendance tracking, assignments, and peer discussions, everything you need is in one place.";

  const textOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const textY = useTransform(scrollY, [0, 300], [0, 100]);

  const iconsOpacity = useTransform(scrollY, [0, 150, 300], [0, 1, 0]);
  const iconsScale = useTransform(scrollY, [0, 150, 300], [0.8, 1, 0.8]);

  // Typewriter effect
  useEffect(() => {
    if (visibleText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setVisibleText(fullText.substring(0, visibleText.length + 1));
      }, 20);
      return () => clearTimeout(timeout);
    } else {
      setTypingComplete(true);
    }
  }, [visibleText, fullText]);

  // Floating particles
  const ParticleComponent = () => {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary dark:bg-accent opacity-10"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 0.5 + 0.1,
            }}
            animate={{
              x: [
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth,
              ],
              y: [
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight,
              ],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 15 + Math.random() * 20,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              width: 5 + Math.random() * 10,
              height: 5 + Math.random() * 10,
            }}
          />
        ))}
      </div>
    );
  };

  // Shooting Stars Component
  const ShootingStars = () => {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px w-20 bg-gradient-to-r from-transparent via-secondary to-transparent"
            initial={{
              x: -100,
              y: Math.random() * 300,
              opacity: 0,
              rotate: 25 + Math.random() * 15,
            }}
            animate={{
              x: window.innerWidth + 200,
              y: Math.random() * 300 + 200,
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 4,
              repeat: Infinity,
              repeatDelay: 5 + Math.random() * 10,
              ease: "easeInOut",
              delay: i * 2,
            }}
          />
        ))}
      </div>
    );
  };

  // New component: Animated Background Gradient
  const AnimatedBackground = () => {
    return (
      <motion.div 
        className="absolute inset-0 pointer-events-none z-0 opacity-20"
        initial={{ backgroundPosition: "0% 0%" }}
        animate={{ 
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"]
        }}
        transition={{ 
          duration: 20,
          ease: "linear",
          repeat: Infinity
        }}
        style={{
          background: "radial-gradient(circle at center, var(--color-primary), transparent 60%), radial-gradient(circle at top right, var(--color-secondary), transparent 60%)",
          "--color-primary": "#244855",
          "--color-secondary": "#E64833"
        } as any}
      />
    );
  };

  // New component: Floating Icon Bubbles
  const FloatingIconBubbles = () => {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { Icon: GraduationCap, delay: 0, color: "#244855", size: 40 },
          { Icon: Laptop, delay: 2, color: "#E64833", size: 35 },
          { Icon: Users, delay: 4, color: "#244855", size: 30 },
          { Icon: Brain, delay: 6, color: "#E64833", size: 45 },
        ].map((item, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full flex items-center justify-center"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0,
              scale: 0,
            }}
            animate={{
              opacity: [0, 0.7, 0.5, 0.7, 0],
              scale: [0, 1, 0.9, 1, 0],
              x: [
                Math.random() * window.innerWidth * 0.8,
                Math.random() * window.innerWidth * 0.8,
              ],
              y: [
                Math.random() * window.innerHeight * 0.8,
                Math.random() * window.innerHeight * 0.8 - 100,
              ],
            }}
            transition={{
              duration: 15,
              delay: item.delay,
              repeat: Infinity,
              repeatDelay: 5,
            }}
            style={{
              width: item.size,
              height: item.size,
              backgroundColor: `${item.color}20`,
              border: `1px solid ${item.color}40`,
            }}
          >
            <item.Icon size={item.size * 0.6} color={item.color} />
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <section
      ref={containerRef}
      className="container mx-auto py-16 px-4 md:px-6 relative overflow-hidden min-h-[80vh] flex items-center"
    >
      <AnimatedBackground />
      <ParticleComponent />
      <ShootingStars />
      <FloatingIconBubbles />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.h1
          ref={textRef}
          className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ opacity: textOpacity, y: textY }}
        >
          <motion.span 
            className="inline-block bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text"
            animate={{ 
              backgroundPosition: ['0% center', '100% center', '0% center'] 
            }}
            transition={{ 
              duration: 8, 
              ease: 'linear', 
              repeat: Infinity 
            }}
            style={{ 
              backgroundSize: '200% 100%'
            }}
          >
            UnifyU
          </motion.span>
          <motion.span className="inline-block">
            {" "}
            – Your Ultimate College Companion{" "}
          </motion.span>
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.5, type: "spring" }}
            className="inline-block ml-2 relative"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear'
              }}
            >
              🚀
            </motion.div>
            <motion.div
              className="absolute -top-1 -right-1 text-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 4,
              }}
            >
              ✨
            </motion.div>
          </motion.span>
        </motion.h1>

        {/* Typewriter text - Proper center alignment */}
        <motion.div
          className="text-lg md:text-xl text-gray-700 dark:text-[#E0E0E0] mb-8 leading-relaxed mx-auto max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          style={{ opacity: textOpacity }}
        >
          <p className="text-center mx-auto max-w-2xl">{visibleText}</p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-2xl mx-auto mb-12"
          style={{
            opacity: iconsOpacity,
            scale: iconsScale,
          }}
        >
          {[
            {
              icon: GraduationCap,
              color: "#244855",
              darkColor: "#E64833",
              text: "🎓 Learn smarter",
              subtext: "with AI-driven insights",
            },
            {
              icon: Laptop,
              color: "#E64833",
              darkColor: "#244855",
              text: "📚 Stay organized",
              subtext: "with a powerful LMS & ERP",
            },
            {
              icon: Users,
              color: "#244855",
              darkColor: "#E64833",
              text: "🤝 Collaborate",
              subtext: "effortlessly with mentors & peers",
            },
            {
              icon: Brain,
              color: "#E64833",
              darkColor: "#244855",
              text: "🏆 Stay motivated",
              subtext: "with leaderboards & rewards",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="flex items-start gap-3"
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{
                opacity: typingComplete ? 1 : 0,
                x: typingComplete ? 0 : index % 2 === 0 ? -20 : 20,
              }}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              whileHover={{
                scale: 1.03,
                transition: { duration: 0.2 },
              }}
            >
              <motion.div
                className="rounded-full p-2 text-white dark:text-white"
                style={{ 
                  backgroundColor: item.color,
                }}
                whileHover={{
                  scale: 1.1,
                  boxShadow: `0 0 12px ${item.color}80`,
                }}
                initial={{ rotate: 0 }}
                animate={{ rotate: [0, 10, 0, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                  delay: index * 0.5,
                }}
              >
                <item.icon size={24} />
              </motion.div>
              <p className="text-gray-700 dark:text-gray-300">
                <motion.span
                  className="font-medium"
                  initial={{ color: "#000" }}
                  whileHover={{ color: item.color }}
                  transition={{ duration: 0.3 }}
                >
                  {item.text}
                </motion.span>{" "}
                {item.subtext}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Centered tagline - Proper center alignment */}
        <motion.p
          className="text-lg font-medium text-primary dark:text-primary text-center mx-auto max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: typingComplete ? 1 : 0,
            y: typingComplete ? 0 : 20,
          }}
          transition={{ duration: 0.5, delay: 1.3 }}
          whileHover={{ scale: 1.05 }}
        >
          Simplify, engage, and excel with UnifyU. Your college life, redefined! 🚀
        </motion.p>
      </div>

      {/* Floating elements with enhanced animations */}
      <motion.div
        className="absolute top-20 -left-16 opacity-15 hidden lg:block"
        animate={{
          y: [0, 15, 0],
          rotate: [0, 5, 0],
          filter: [
            "drop-shadow(0px 0px 0px rgba(36, 72, 85, 0))",
            "drop-shadow(0px 0px 10px rgba(36, 72, 85, 0.5))",
            "drop-shadow(0px 0px 0px rgba(36, 72, 85, 0))",
          ],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: "mirror",
        }}
      >
        <Laptop size={100} className="text-primary" />
      </motion.div>

      <motion.div
        className="absolute top-40 -right-10 opacity-15 hidden lg:block"
        animate={{
          y: [0, 20, 0],
          rotate: [0, -5, 0],
          filter: [
            "drop-shadow(0px 0px 0px rgba(230, 72, 51, 0))",
            "drop-shadow(0px 0px 10px rgba(230, 72, 51, 0.5))",
            "drop-shadow(0px 0px 0px rgba(230, 72, 51, 0))",
          ],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          repeatType: "mirror",
          delay: 1,
        }}
      >
        <GraduationCap size={120} className="text-secondary" />
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-16 opacity-15 hidden lg:block"
        animate={{
          y: [0, 15, 0],
          rotate: [0, 3, 0],
          filter: [
            "drop-shadow(0px 0px 0px rgba(36, 72, 85, 0))",
            "drop-shadow(0px 0px 10px rgba(36, 72, 85, 0.5))",
            "drop-shadow(0px 0px 0px rgba(36, 72, 85, 0))",
          ],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "mirror",
          delay: 0.5,
        }}
      >
        <Users size={80} className="text-primary" />
      </motion.div>

      <motion.div
        className="absolute bottom-32 right-20 opacity-15 hidden lg:block"
        animate={{
          y: [0, 20, 0],
          rotate: [0, -3, 0],
          filter: [
            "drop-shadow(0px 0px 0px rgba(230, 72, 51, 0))",
            "drop-shadow(0px 0px 10px rgba(230, 72, 51, 0.5))",
            "drop-shadow(0px 0px 0px rgba(230, 72, 51, 0))",
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "mirror",
          delay: 1.5,
        }}
      >
        <Brain size={90} className="text-secondary" />
      </motion.div>
    </section>
  );
};

export default Hero;
