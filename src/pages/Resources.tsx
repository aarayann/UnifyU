
import React, { useState, useRef } from "react";
import { 
  BookOpen, 
  Download, 
  Clock, 
  Info, 
  FileText, 
  MousePointer 
} from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

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
        return <BookOpen className="text-primary" />;
      case "syllabus":
        return <FileText className="text-secondary" />;
      case "calendar":
        return <Clock className="text-accent" />;
      case "guide":
        return <Info className="text-primary" />;
      case "notes":
        return <FileText className="text-secondary" />;
      default:
        return <FileText className="text-primary" />;
    }
  };

  const filteredResources = filter === "all" 
    ? resources 
    : resources.filter(resource => resource.type === filter);

  const handleDownload = (url: string, title: string) => {
    // Create an anchor element and set properties for download
    const link = document.createElement('a');
    link.href = url;
    link.download = title.replace(/\s+/g, '_') + '.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
    inactive: { scale: 1 },
    active: { scale: 1.05, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }
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
            className="absolute bottom-0 left-0 h-1 bg-secondary"
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
        >
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
            className="rounded-full animate-pulse-soft"
          >
            All Resources
          </Button>
        </motion.div>
        
        {["book", "syllabus", "calendar", "guide", "notes"].map((type) => (
          <motion.div
            key={type}
            variants={filterVariants}
            animate={filter === type ? "active" : "inactive"}
          >
            <Button
              variant={filter === type ? "default" : "outline"}
              onClick={() => setFilter(type)}
              className="rounded-full capitalize"
            >
              {type}s
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
          >
            <Card className="h-full hover-card">
              <CardHeader className="pb-2">
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
              <CardContent className="py-2">
                <div className="relative">
                  <div className="line-clamp-2 text-sm text-muted-foreground mb-2">
                    {resource.description}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Updated: {new Date(resource.date).toLocaleDateString()}
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between pt-2">
                <div className="relative">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex items-center gap-1 resource-hover-trigger"
                    onClick={() => handleInfoClick(resource.id)}
                    aria-expanded={activeResource === resource.id}
                  >
                    <Info size={16} />
                    <span>Details</span>
                    <MousePointer size={12} className="ml-1" />
                  </Button>
                  
                  {/* Improved hover box positioning */}
                  <div 
                    className={`absolute z-50 bg-white dark:bg-card shadow-xl rounded-lg p-4 border border-border transition-all duration-300 w-[280px] max-w-[90vw] ${
                      activeResource === resource.id 
                        ? 'opacity-100 visible translate-y-2'
                        : 'opacity-0 invisible translate-y-4'
                    }`}
                    style={{
                      bottom: '100%',
                      left: '50%',
                      transform: activeResource === resource.id ? 'translateX(-50%)' : 'translateX(-50%) translateY(4px)'
                    }}
                  >
                    <div className="absolute bottom-[-8px] left-[calc(50%-8px)] w-4 h-4 bg-white dark:bg-card rotate-45 border-r border-b border-border"></div>
                    <h3 className="font-semibold mb-2">{resource.title}</h3>
                    <p className="text-sm mb-3">{resource.description}</p>
                    <div className="text-xs text-muted-foreground">
                      <p>Type: {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}</p>
                      <p>Last updated: {new Date(resource.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
                
                <Button 
                  size="sm"
                  onClick={() => handleDownload(resource.downloadUrl, resource.title)}
                  className="flex items-center gap-1 animate-glimmer"
                >
                  <motion.div
                    whileHover={{ y: [0, -3, 0] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  >
                    <Download size={16} />
                  </motion.div>
                  <span>Download</span>
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
              y: [0, -5, 0]
            }}
            transition={{ repeat: Infinity, duration: 5 }}
            className="text-6xl mt-4"
          >
            📚
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Resources;
