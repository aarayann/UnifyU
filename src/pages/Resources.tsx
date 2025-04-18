
import React from "react";
import { FileText, Download, BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const Resources: React.FC = () => {
  // Simple array with just the three requested resources
  const resources = [
    {
      id: "1",
      title: "GD Room Booking",
      icon: <FileText className="h-5 w-5" />,
      url: "#",
      highlighted: false,
    },
    {
      id: "2",
      title: "B. Tech Syllabus",
      icon: <Download className="h-5 w-5" />,
      url: "/BTechSyllabus.pdf",
      highlighted: true,
    },
    {
      id: "3",
      title: "E-Library (PYQs)",
      icon: <BookOpen className="h-5 w-5" />,
      url: "#",
      highlighted: false,
    },
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <motion.h1 
        className="text-3xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Resources
      </motion.h1>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {resources.map((resource) => (
          <motion.div 
            key={resource.id}
            whileHover={{ 
              y: -5,
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
              transition: { duration: 0.2 }
            }}
            className="w-full"
          >
            <a 
              href={resource.url}
              className="block h-full"
              onClick={(e) => {
                if (resource.url === "#") {
                  e.preventDefault();
                  // You can add functionality later for the placeholder links
                }
              }}
            >
              <Card className={`h-full cursor-pointer transition-all duration-200 border ${
                resource.highlighted ? "bg-red-50 border-red-200" : "hover:border-gray-300"
              }`}>
                <CardContent className="flex items-center p-6">
                  <div className={`mr-4 text-gray-600 ${
                    resource.highlighted ? "text-red-500" : ""
                  }`}>
                    {resource.icon}
                  </div>
                  <span className={`font-medium ${
                    resource.highlighted ? "text-red-700" : "text-gray-800"
                  }`}>
                    {resource.title}
                  </span>
                </CardContent>
              </Card>
            </a>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Resources;
