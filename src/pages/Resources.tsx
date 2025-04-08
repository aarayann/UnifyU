
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
  const popoverRefs = useRef<Map<string, HTMLDivElement | null>>(new Map());

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

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-primary dark:text-primary-foreground">
        Academic Resources
      </h1>

      <div className="flex flex-wrap justify-center gap-2 mb-8">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          onClick={() => setFilter("all")}
          className="rounded-full"
        >
          All Resources
        </Button>
        <Button
          variant={filter === "book" ? "default" : "outline"}
          onClick={() => setFilter("book")}
          className="rounded-full"
        >
          Books
        </Button>
        <Button
          variant={filter === "syllabus" ? "default" : "outline"}
          onClick={() => setFilter("syllabus")}
          className="rounded-full"
        >
          Syllabi
        </Button>
        <Button
          variant={filter === "calendar" ? "default" : "outline"}
          onClick={() => setFilter("calendar")}
          className="rounded-full"
        >
          Calendars
        </Button>
        <Button
          variant={filter === "guide" ? "default" : "outline"}
          onClick={() => setFilter("guide")}
          className="rounded-full"
        >
          Guides
        </Button>
        <Button
          variant={filter === "notes" ? "default" : "outline"}
          onClick={() => setFilter("notes")}
          className="rounded-full"
        >
          Notes
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => (
          <div key={resource.id} className="relative">
            <Card className="h-full hover-card">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-2">
                    {getIcon(resource.type)}
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
                <div className="relative group">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="resource-hover-trigger flex items-center gap-1"
                    onClick={() => {}}
                  >
                    <Info size={16} />
                    <span>Details</span>
                    <MousePointer size={12} className="ml-1" />
                  </Button>
                  <div 
                    className="resource-hover-card"
                    ref={ref => popoverRefs.current.set(resource.id, ref)}
                  >
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
                  className="flex items-center gap-1"
                >
                  <Download size={16} />
                  <span>Download</span>
                </Button>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center my-12">
          <p className="text-lg text-muted-foreground">No resources found for the selected filter.</p>
        </div>
      )}
    </div>
  );
};

export default Resources;
