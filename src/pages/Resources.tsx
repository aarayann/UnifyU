
import React, { useState, useRef, useEffect } from "react";
import { 
  BookOpen, 
  Download, 
  Clock, 
  Info, 
  FileText, 
  MousePointer,
  X
} from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { toast } from "sonner";

type ResourceType = {
  id: string;
  title: string;
  type: "book" | "syllabus" | "calendar" | "guide" | "notes";
  description: string;
  date: string;
  downloadUrl: string;
};

const Resources: React.FC = () => {
  const [filter, setFilter] = useState<string>("all");
  const [activeResource, setActiveResource] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const resources: ResourceType[] = [
    {
      id: "1",
      title: "Computer Science Fundamentals",
      type: "book",
      description: "Essential reading material covering data structures, algorithms, and computing principles.",
      date: "2023-09-10",
      downloadUrl: "#",
    },
    {
      id: "2",
      title: "B.Tech Computer Science Syllabus",
      type: "syllabus",
      description: "Complete semester-wise breakdown of courses, credit requirements, and learning objectives.",
      date: "2023-08-15",
      downloadUrl: "/BTechSyllabus.pdf",
    },
    {
      id: "3",
      title: "Academic Calendar 2023-24",
      type: "calendar",
      description: "Important dates including examination schedules, holidays, and course registration deadlines.",
      date: "2023-08-01",
      downloadUrl: "/AcademicCalender.pdf",
    },
    {
      id: "4",
      title: "Laboratory Safety Guidelines",
      type: "guide",
      description: "Procedures and protocols for safe laboratory practices in engineering experiments.",
      date: "2023-07-25",
      downloadUrl: "#",
    },
    {
      id: "5",
      title: "Machine Learning Lecture Notes",
      type: "notes",
      description: "Comprehensive notes covering neural networks, decision trees, and unsupervised learning algorithms.",
      date: "2023-09-20",
      downloadUrl: "#",
    },
    {
      id: "6",
      title: "Data Science Project Guide",
      type: "guide",
      description: "Step-by-step instructions for completing the semester data analysis project.",
      date: "2023-09-15",
      downloadUrl: "#",
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "book":
        return <BookOpen className="text-primary animate-pulse-soft" />;
      case "syllabus":
        return <FileText className="text-secondary animate-bounce-subtle" />;
      case "calendar":
        return <Clock className="text-accent animate-rotate-slow" />;
      case "guide":
        return <Info className="text-primary animate-pulse-soft" />;
      case "notes":
        return <FileText className="text-secondary animate-bounce-subtle" />;
      default:
        return <FileText className="text-primary animate-pulse-soft" />;
    }
  };

  const filteredResources = filter === "all" 
    ? resources 
    : resources.filter(resource => resource.type === filter);

  const handleDownload = (url: string, title: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = title.replace(/\s+/g, '_') + '.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success(`Downloading ${title}...`, {
      duration: 3000,
      position: "bottom-center"
    });
  };

  const handleInfoClick = (id: string) => {
    setActiveResource(prevId => prevId === id ? null : id);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        damping: 12
      }
    }
  };

  const filterVariants = {
    inactive: { scale: 1, boxShadow: "0 2px 5px rgba(0,0,0,0)" },
    active: { scale: 1.05, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }
  };
  
  const resourceHoverBoxRef = useRef<HTMLDivElement>(null);
  
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
  
  const updateHoverPosition = (e: React.MouseEvent) => {
    setHoverPosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <motion.h1 
        className="text-3xl font-bold mb-8 text-center text-primary dark:text-primary-foreground"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="relative">
          Academic Resources
          <motion.div 
            className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary to-secondary"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </span>
      </motion.h1>

      <motion.div 
        className="flex flex-wrap justify-center gap-2 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <motion.div
          variants={filterVariants}
          animate={filter === "all" ? "active" : "inactive"}
          whileHover="active"
          className="relative"
        >
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
            className="rounded-full relative overflow-hidden group"
          >
            <motion.span 
              className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100" 
              initial={{ x: "-100%" }}
              animate={{ x: filter === "all" ? "0%" : "-100%" }}
              transition={{ duration: 0.5 }}
            />
            <span className="relative z-10">All Resources</span>
          </Button>
        </motion.div>
        
        {["book", "syllabus", "calendar", "guide", "notes"].map((type) => (
          <motion.div
            key={type}
            variants={filterVariants}
            animate={filter === type ? "active" : "inactive"}
            whileHover="active"
            className="relative"
          >
            <Button
              variant={filter === type ? "default" : "outline"}
              onClick={() => setFilter(type)}
              className="rounded-full capitalize relative overflow-hidden group"
            >
              <motion.span 
                className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100" 
                initial={{ x: "-100%" }}
                animate={{ x: filter === type ? "0%" : "-100%" }}
                transition={{ duration: 0.5 }}
              />
              <span className="relative z-10">{type}s</span>
            </Button>
          </motion.div>
        ))}
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {filteredResources.map((resource) => (
          <motion.div 
            key={resource.id} 
            className="relative"
            variants={itemVariants}
            whileHover={{ 
              y: -5,
              transition: { duration: 0.2 }
            }}
          >
            <Card className="h-full hover-card relative overflow-hidden group">
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100" 
                transition={{ duration: 0.3 }}
              />
              
              <CardHeader className="pb-2 relative z-10">
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-2">
                    <motion.div
                      whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      {getIcon(resource.type)}
                    </motion.div>
                    <CardTitle className="text-lg">{resource.title}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="py-2 relative z-10">
                <div className="relative">
                  <div className="line-clamp-2 text-sm text-muted-foreground mb-2">
                    {resource.description}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Updated: {new Date(resource.date).toLocaleDateString()}
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between pt-2 relative z-10">
                {isMobile ? (
                  <div className="relative">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex items-center gap-1"
                      onClick={() => handleInfoClick(resource.id)}
                      aria-expanded={activeResource === resource.id}
                    >
                      <Info size={16} />
                      <span>Details</span>
                    </Button>
                    
                    <AnimatePresence>
                      {activeResource === resource.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute bottom-full left-0 right-0 mb-2 bg-card dark:bg-card p-4 rounded-lg border border-border shadow-lg z-50"
                          ref={resourceHoverBoxRef}
                        >
                          <div className="flex justify-between items-start">
                            <h3 className="font-semibold mb-2">{resource.title}</h3>
                            <button 
                              onClick={() => setActiveResource(null)}
                              className="text-muted-foreground hover:text-primary"
                            >
                              <X size={16} />
                            </button>
                          </div>
                          <p className="text-sm mb-3">{resource.description}</p>
                          <div className="text-xs text-muted-foreground">
                            <p>Type: {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}</p>
                            <p>Last updated: {new Date(resource.date).toLocaleDateString()}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <HoverCard openDelay={200} closeDelay={100}>
                    <HoverCardTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="flex items-center gap-1"
                        onMouseMove={updateHoverPosition}
                      >
                        <Info size={16} />
                        <span>Details</span>
                        <motion.div
                          animate={{ x: [0, 3, 0] }}
                          transition={{ 
                            repeat: Infinity, 
                            repeatDelay: 2,
                            duration: 1 
                          }}
                        >
                          <MousePointer size={12} className="ml-1" />
                        </motion.div>
                      </Button>
                    </HoverCardTrigger>
                    <HoverCardContent 
                      className="w-80 bg-card dark:bg-card p-4 border border-border shadow-lg"
                      side="bottom"
                      sideOffset={5}
                    >
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <h3 className="font-semibold mb-2">{resource.title}</h3>
                        <p className="text-sm mb-3">{resource.description}</p>
                        <div className="text-xs text-muted-foreground">
                          <p>Type: {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}</p>
                          <p>Last updated: {new Date(resource.date).toLocaleDateString()}</p>
                        </div>
                      </motion.div>
                    </HoverCardContent>
                  </HoverCard>
                )}
                
                <Button 
                  size="sm"
                  onClick={() => handleDownload(resource.downloadUrl, resource.title)}
                  className="flex items-center gap-1 relative overflow-hidden group"
                >
                  <motion.span 
                    className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-primary/20 opacity-0 group-hover:opacity-100" 
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.5 }}
                  />
                  <motion.div
                    className="relative z-10"
                    whileHover={{ y: [0, -3, 0] }}
                    transition={{ repeat: 1, duration: 0.5 }}
                  >
                    <Download size={16} />
                  </motion.div>
                  <span className="relative z-10">Download</span>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {filteredResources.length === 0 && (
        <motion.div 
          className="text-center my-12"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-lg text-muted-foreground">No resources found for the selected filter.</p>
          <motion.div
            animate={{
              rotate: [0, 10, -10, 10, 0],
              y: [0, -15, 0]
            }}
            transition={{ repeat: Infinity, duration: 5 }}
            className="text-6xl mt-4"
          >
            📚
          </motion.div>
          <motion.div
            className="mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Button 
              onClick={() => setFilter("all")}
              className="animate-pulse-soft"
            >
              View All Resources
            </Button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Resources;
