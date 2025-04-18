
import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Search, Download, GraduationCap, Theater, Trophy, BookOpen, Calendar as CalendarIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

// Updated events data
const eventData = [
  // Upcoming Events
  {
    id: 1,
    title: "Mid Term Makeup Examinations",
    date: "April 1–4, 2025",
    time: "As per schedule",
    location: "Examination Centers",
    category: "Academic",
    status: "Past",
    description: "Makeup exams for students who missed the mid-terms.",
    image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 2,
    title: "End Semester Examinations",
    date: "May 12–30, 2025",
    time: "9:00 AM - 5:00 PM",
    location: "All Exam Halls",
    category: "Academic",
    status: "Upcoming",
    description: "Final exams for all programs.",
    image: "https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 3,
    title: "Declaration of End Term Results",
    date: "June 13, 2025",
    time: "10:00 AM",
    location: "Online Portal",
    category: "Administrative",
    status: "Upcoming",
    description: "Results published for May 2025 end-semester exams.",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 4,
    title: "Welcome Back Celebrations",
    date: "January 6, 2025",
    time: "4:00 PM - 8:00 PM",
    location: "Central Courtyard",
    category: "Cultural",
    status: "Past",
    description: "Post-vacation welcome event for students.",
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 5,
    title: "Uphoria & Sportikon",
    date: "February 21–23, 2025",
    time: "8:00 AM - 6:00 PM",
    location: "Sports Complex",
    category: "Sports",
    status: "Past",
    description: "Annual inter-college sports competition.",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 6,
    title: "Orientation Week (Freshman Students)",
    date: "August 1–7, 2025",
    time: "9:00 AM - 5:00 PM",
    location: "Main Auditorium",
    category: "Workshop",
    status: "Upcoming",
    description: "Campus tours, department introductions, and welcome sessions.",
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
  },
  
  // Ongoing Events
  {
    id: 7,
    title: "Lab Examinations",
    date: "April 1–8, 2025",
    time: "As per department schedule",
    location: "Department Labs",
    category: "Academic",
    status: "Ongoing",
    description: "Practical exams for lab courses.",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 8,
    title: "Grievance Redressal Window",
    date: "March 3–7, 2025",
    time: "10:00 AM - 4:00 PM",
    location: "Room 203, Admin Building",
    category: "Administrative",
    status: "Past",
    description: "Students can submit grievances about makeup exam results.",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
  },
  
  // Past Events
  {
    id: 9,
    title: "Mid Term Examinations",
    date: "March 2–13, 2025",
    time: "As per schedule",
    location: "Examination Centers",
    category: "Academic",
    status: "Past",
    description: "Regular mid-term exams for all students.",
    image: "https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 10,
    title: "Supplementary Examinations",
    date: "February 11–24, 2025",
    time: "As per schedule",
    location: "Examination Centers",
    category: "Academic",
    status: "Past",
    description: "Retests for odd-semester courses.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 11,
    title: "Teachers Day Celebration",
    date: "September 5, 2024",
    time: "3:00 PM - 7:00 PM",
    location: "Main Auditorium",
    category: "Cultural",
    status: "Past",
    description: "Faculty felicitation and student performances.",
    image: "https://images.unsplash.com/photo-1511629036492-6c07153d3e83?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 12,
    title: "Convocation",
    date: "October 19, 2024",
    time: "10:00 AM - 2:00 PM",
    location: "Convocation Hall",
    category: "Cultural",
    status: "Past",
    description: "Graduation day for 2023–24 batch.",
    image: "https://www.bennett.edu.in/wp-content/uploads/2024/12/Bennett-University-Convocation-2024.jpg"
  },
  {
    id: 13,
    title: "Bennovate Entrepreneurship Summit",
    date: "November 30 – December 1, 2024",
    time: "9:00 AM - 5:00 PM",
    location: "Bennett Business School",
    category: "Technical",
    status: "Past",
    description: "Workshops and talks by industry leaders.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 14,
    title: "Diwali Break",
    date: "October 29 – November 3, 2024",
    time: "All Day",
    location: "University",
    category: "Holiday",
    status: "Past",
    description: "University closed for festivities.",
    image: "https://pbs.twimg.com/media/GbIa5t7WUAAjhMk.jpg"
  },
  {
    id: 15,
    title: "Christmas Vacations",
    date: "December 26, 2024 – January 5, 2025",
    time: "All Day",
    location: "University",
    category: "Holiday",
    status: "Past",
    description: "Winter break for students.",
    image: "https://images.unsplash.com/photo-1576919228236-a097c32a5cd4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
  }
];

// Categories for filtering
const categories = ["All", "Academic", "Administrative", "Cultural", "Technical", "Sports", "Workshop", "Holiday"];

export default function Events() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTab, setSelectedTab] = useState("upcoming");

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Academic":
        return <GraduationCap size={16} className="mr-1" />;
      case "Cultural":
        return <Theater size={16} className="mr-1" />;
      case "Sports":
        return <Trophy size={16} className="mr-1" />;
      case "Workshop":
        return <BookOpen size={16} className="mr-1" />;
      default:
        return <CalendarIcon size={16} className="mr-1" />;
    }
  };

  // Filter events based on search term, category, and tab (status)
  const filteredEvents = eventData.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
                         
    const matchesCategory = selectedCategory === "All" || event.category === selectedCategory;
    
    // Filter based on the selected tab
    const matchesTab = (selectedTab === "upcoming" && event.status === "Upcoming") || 
                       (selectedTab === "ongoing" && event.status === "Ongoing") || 
                       (selectedTab === "past" && event.status === "Past");
    
    return matchesSearch && matchesCategory && matchesTab;
  });

  // Animation variants
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
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-[#244855] py-16 md:py-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#244855] to-[#244855]/80"></div>
          <svg className="absolute bottom-0 left-0 right-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path 
              fill="#FBE9D0" 
              fillOpacity="0.1" 
              d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,208C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
            </path>
          </svg>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center mb-8"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">University Events</h1>
            <p className="text-lg text-[#FBE9D0] max-w-3xl mx-auto">
              Stay updated with all academic, cultural, and social activities happening throughout the academic year
            </p>
          </motion.div>
          
          <motion.div 
            className="bg-white dark:bg-[#1E3A47] rounded-lg shadow-lg p-6 md:p-8 max-w-3xl mx-auto"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input 
                  type="text"
                  placeholder="Search events..." 
                  className="pl-10 border-[#244855]/20 dark:border-[#A8C0BF]/20"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <select 
                className="p-2 rounded border border-[#244855]/20 dark:border-[#A8C0BF]/20 bg-white dark:bg-[#142A35] text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#244855] dark:focus:ring-[#A8C0BF]"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Events Section */}
      <section className="py-16 bg-[#FBE9D0]/20 dark:bg-[#1A3641]/20">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="upcoming" onValueChange={setSelectedTab} className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="bg-white dark:bg-[#1E3A47] p-1 shadow-md">
                <TabsTrigger value="upcoming" className="data-[state=active]:bg-[#244855]/10 data-[state=active]:text-[#244855] dark:data-[state=active]:bg-[#A8C0BF]/20 dark:data-[state=active]:text-[#A8C0BF]">
                  Upcoming Events
                </TabsTrigger>
                <TabsTrigger value="ongoing" className="data-[state=active]:bg-[#244855]/10 data-[state=active]:text-[#244855] dark:data-[state=active]:bg-[#A8C0BF]/20 dark:data-[state=active]:text-[#A8C0BF]">
                  Ongoing Events
                </TabsTrigger>
                <TabsTrigger value="past" className="data-[state=active]:bg-[#244855]/10 data-[state=active]:text-[#244855] dark:data-[state=active]:bg-[#A8C0BF]/20 dark:data-[state=active]:text-[#A8C0BF]">
                  Past Events
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="upcoming" className="mt-0">
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {filteredEvents.map((event) => (
                  <motion.div 
                    key={event.id}
                    variants={itemVariants}
                    className="h-full"
                  >
                    <Card className="h-full overflow-hidden bg-white dark:bg-[#1E3A47] border-none shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={event.image} 
                          alt={event.title} 
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                        <Badge className="absolute top-2 right-2 bg-[#244855] text-white flex items-center">
                          {getCategoryIcon(event.category)}
                          {event.category}
                        </Badge>
                      </div>
                      
                      <CardContent className="p-5">
                        <h3 className="text-xl font-bold text-[#244855] dark:text-white mb-3">{event.title}</h3>
                        
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                            <Calendar size={16} className="flex-shrink-0" />
                            <span className="text-sm">{event.date}</span>
                          </div>
                          
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                            <Clock size={16} className="flex-shrink-0" />
                            <span className="text-sm">{event.time}</span>
                          </div>
                          
                          <div className="flex items-start gap-2 text-gray-600 dark:text-gray-300">
                            <MapPin size={16} className="flex-shrink-0 mt-1" />
                            <span className="text-sm">{event.location}</span>
                          </div>
                        </div>
                        
                        <Separator className="my-3 bg-gray-200 dark:bg-gray-700" />
                        
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                          {event.description}
                        </p>
                        
                        <Button variant="outline" className="w-full border-[#244855] hover:bg-[#244855] hover:text-white dark:border-[#A8C0BF] dark:hover:bg-[#A8C0BF] dark:hover:text-[#1A3641] transition-colors">
                          View Details
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
              
              {filteredEvents.length === 0 && (
                <div className="text-center py-10">
                  <p className="text-lg text-gray-700 dark:text-gray-300">No events found matching your search criteria.</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="ongoing" className="mt-0">
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {filteredEvents.map((event) => (
                  <motion.div 
                    key={event.id}
                    variants={itemVariants}
                    className="h-full"
                  >
                    <Card className="h-full overflow-hidden bg-white dark:bg-[#1E3A47] border-none shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={event.image} 
                          alt={event.title} 
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                        <Badge className="absolute top-2 right-2 bg-[#E64833] text-white flex items-center">
                          {getCategoryIcon(event.category)}
                          {event.category}
                        </Badge>
                        <Badge className="absolute top-2 left-2 bg-green-500 text-white">
                          Happening Now
                        </Badge>
                      </div>
                      
                      <CardContent className="p-5">
                        <h3 className="text-xl font-bold text-[#244855] dark:text-white mb-3">{event.title}</h3>
                        
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                            <Calendar size={16} className="flex-shrink-0" />
                            <span className="text-sm">{event.date}</span>
                          </div>
                          
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                            <Clock size={16} className="flex-shrink-0" />
                            <span className="text-sm">{event.time}</span>
                          </div>
                          
                          <div className="flex items-start gap-2 text-gray-600 dark:text-gray-300">
                            <MapPin size={16} className="flex-shrink-0 mt-1" />
                            <span className="text-sm">{event.location}</span>
                          </div>
                        </div>
                        
                        <Separator className="my-3 bg-gray-200 dark:bg-gray-700" />
                        
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                          {event.description}
                        </p>
                        
                        <Button variant="outline" className="w-full border-[#244855] hover:bg-[#244855] hover:text-white dark:border-[#A8C0BF] dark:hover:bg-[#A8C0BF] dark:hover:text-[#1A3641] transition-colors">
                          View Details
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
              
              {filteredEvents.length === 0 && (
                <div className="text-center py-10">
                  <p className="text-lg text-gray-700 dark:text-gray-300">No ongoing events found matching your search criteria.</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="past" className="mt-0">
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {filteredEvents.map((event) => (
                  <motion.div 
                    key={event.id}
                    variants={itemVariants}
                    className="h-full"
                  >
                    <Card className="h-full overflow-hidden bg-white dark:bg-[#1E3A47] border-none shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="relative h-48 overflow-hidden grayscale">
                        <img 
                          src={event.image} 
                          alt={event.title} 
                          className="w-full h-full object-cover"
                        />
                        <Badge className="absolute top-2 right-2 bg-gray-700 text-white flex items-center">
                          {getCategoryIcon(event.category)}
                          {event.category}
                        </Badge>
                      </div>
                      
                      <CardContent className="p-5">
                        <h3 className="text-xl font-bold text-[#244855] dark:text-white mb-3">{event.title}</h3>
                        
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                            <Calendar size={16} className="flex-shrink-0" />
                            <span className="text-sm">{event.date}</span>
                          </div>
                          
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                            <Clock size={16} className="flex-shrink-0" />
                            <span className="text-sm">{event.time}</span>
                          </div>
                          
                          <div className="flex items-start gap-2 text-gray-600 dark:text-gray-300">
                            <MapPin size={16} className="flex-shrink-0 mt-1" />
                            <span className="text-sm">{event.location}</span>
                          </div>
                        </div>
                        
                        <Separator className="my-3 bg-gray-200 dark:bg-gray-700" />
                        
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                          {event.description}
                        </p>
                        
                        <Button variant="outline" className="w-full border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white transition-colors">
                          View Gallery
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
              
              {filteredEvents.length === 0 && (
                <div className="text-center py-10">
                  <p className="text-lg text-gray-700 dark:text-gray-300">No past events found matching your search criteria.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      {/* Calendar Download Section */}
      <section className="py-16 bg-[#244855] text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">Academic Calendar</h2>
            <p className="text-lg text-[#FBE9D0] mb-8 max-w-2xl mx-auto">
              Stay organized throughout the semester with our complete academic calendar featuring all key dates and events.
            </p>
            
            <Button className="bg-[#E64833] hover:bg-[#D6402D] text-white" onClick={downloadCalendar}>
              <Download className="mr-2 h-4 w-4" />
              <span>Download Academic Calendar</span>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
