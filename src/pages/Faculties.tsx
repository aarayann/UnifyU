import { useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Mail, Phone } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Faculty profile data
const facultyData = [
  {
    id: 1,
    name: "Dr. Manish Raj",
    // Use a local image path for the photo
    photo: "https://www.bennett.edu.in/wp-content/uploads/2020/08/manish-raj310x310.png",
    expertise: "Artificial Intelligence & Machine Learning",
    seatingArea: "Room 307, M Block",
    email: "manish.raj@bennett.edu.in"
  },
  {
    id: 2,
    name: "Dr. Divya Singh",
    photo: "https://www.bennett.edu.in/wp-content/uploads/2022/08/Divya-Singh.jpg",
    expertise: "Design & Analysis of Algorithms",
    seatingArea: "Room 307, M Block",
    email: "divya.singh@bennett.edu.in"
  },
  {
    id: 3,
    name: "Dr. Garima Jaiswal",
    photo: "https://www.bennett.edu.in/wp-content/uploads/2022/08/GARIMA-JAISWAL.jpg",
    expertise: "Design, thinking & Innovation",
    seatingArea: "Room 307, M Block",
    email: "garima.jaiswal@bennett.edu.in"
  },
  {
    id: 4,
    name: "Dr. Ambrish Kumar",
    photo: "https://www.bennett.edu.in/wp-content/uploads/2023/07/Dr.-Ambrish-Kumar-1.jpg",
    expertise: "Data Science & Analytics",
    seatingArea: "Room 307, M Block",
    email: "ambrish.kumar@bennett.edu.in"
  },
  {
    id: 5,
    name: "Dr. Hardeo Kumar Thakur",
    photo: "https://www.bennett.edu.in/wp-content/uploads/2022/11/Dr.-Hardeo-Kumar-Thakur.jpg",
    expertise: "Design & Analysis of Algorithms",
    seatingArea: "Room 307, M Block",
    email: "hardeo.thakur@bennett.edu.in"
  },
  {
    id: 6,
    name: "Dr. Sangeeta Kumari",
    photo: "https://www.bennett.edu.in/wp-content/uploads/2022/12/Dr.-Sangeeta-Kumari.jpg",
    expertise: "Computer Networks",
    seatingArea: "Room 307, M Block",
    email: "sangeeta.kumari@bennett.edu.in"
  },
  {
    id: 7,
    name: "Dr. Saquib Jawed",
    photo: "https://www.bennett.edu.in/wp-content/uploads/2024/07/MD-Saquib-Jawed.jpg",
    expertise: "Computer Networks",
    seatingArea: "Room 307, M Block",
    email: "saquib.jawed@bennett.edu.in"
  },
  {
    id: 8,
    name: "Dr. Arvind Mewada",
    photo: "https://www.bennett.edu.in/wp-content/uploads/2023/10/Mr.-Arvind-Mewada.jpg",
    expertise: "Operating Systems",
    seatingArea: "Room 307, M Block",
    email: "arvind.mewada@bennett.edu.in"
  }
];

// Update the faculty interface to fix the build error
interface Faculty {
  id: number;
  name: string;
  photo: string;
  expertise: string;
  seatingArea: string;
  email: string;
  phone?: string; // Make phone optional to fix the build error
}

// Faculty members list
// const facultyMembers = [
//   {
//     id: 5,
//     name: "Dr. Sarah Johnson",
//     title: "Professor of Computer Science",
//     department: "School of Engineering",
//     image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
//   },
//   {
//     id: 6,
//     name: "Dr. Michael Chen",
//     title: "Associate Professor of Data Science",
//     department: "School of Engineering",
//     image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=200&auto=format&fit=crop",
//   },
//   {
//     id: 7,
//     name: "Prof. Amelia Rodriguez",
//     title: "Professor of Business Administration",
//     department: "School of Business",
//     image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop",
//   },
//   {
//     id: 8,
//     name: "Dr. James Wilson",
//     title: "Professor of Economics",
//     department: "School of Business",
//     image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
//   },
//   {
//     id: 9,
//     name: "Dr. Priya Sharma",
//     title: "Professor of Psychology",
//     department: "School of Liberal Arts",
//     image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=200&auto=format&fit=crop",
//   },
//   {
//     id: 10,
//     name: "Dr. Robert Zhang",
//     title: "Professor of Physics",
//     department: "School of Sciences",
//     image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
//   },
// ];

// Expertise categories for filtering
const expertiseCategories = [
  "All",
  "Artificial Intelligence & Machine Learning",
  "Design & Analysis of Algorithms",
  "Design, thinking & Innovation",
  "Data Science & Analytics",
  "Computer Networks",
  "Operating Systems"
];

const Faculties = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [hoveredFaculty, setHoveredFaculty] = useState<number | null>(null);

  // Filter faculty based on search term and category
  const filteredFaculty = facultyData.filter(faculty => {
    const matchesSearch = faculty.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         faculty.expertise.toLowerCase().includes(searchTerm.toLowerCase());
                         
    const matchesCategory = filterCategory === "All" || faculty.expertise === filterCategory;
    
    return matchesSearch && matchesCategory;
  });

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

  return (
    <div>
      {/* Faculty Header Section */}
      <section className="py-16 bg-[#FBE9D0]/20 dark:bg-[#1E3A47]/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10">
            <motion.h2 
              className="text-3xl font-bold text-[#244855] dark:text-white mb-4 md:mb-0"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Meet Our Faculty
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button 
                className="bg-[#E64833] hover:bg-[#D6402D] text-white"
                onClick={() => window.open("http://bennett2023-001-site1.btempurl.com/FacultyTT.aspx", "_blank")}
              >
                Time Table
              </Button>
            </motion.div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input 
                type="text"
                placeholder="Search by name or expertise..." 
                className="pl-10 bg-white dark:bg-[#142A35] border-[#244855]/20 dark:border-[#A8C0BF]/20"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <select 
              className="p-2 rounded border border-[#244855]/20 dark:border-[#A8C0BF]/20 bg-white dark:bg-[#142A35] text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#244855] dark:focus:ring-[#A8C0BF] min-w-[200px]"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              {expertiseCategories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredFaculty.map((faculty) => (
              <motion.div 
                key={faculty.id}
                variants={itemVariants}
                onMouseEnter={() => setHoveredFaculty(faculty.id)}
                onMouseLeave={() => setHoveredFaculty(null)}
                className="relative overflow-hidden"
              >
                <Card className="h-full bg-white dark:bg-[#1E3A47] border-none shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="p-4 flex flex-col h-full">
                    <div className="relative mb-4 overflow-hidden rounded-lg">
                      <img 
                        src={faculty.photo} 
                        alt={`Professor ${faculty.name}`} 
                        className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    
                    <h3 className="text-xl font-bold text-[#244855] dark:text-white mb-2">{faculty.name}</h3>
                    <p className="text-gray-600 dark:text-[#E0E0E0] mb-2 font-medium">{faculty.expertise}</p>
                    
                    <div className="flex items-start gap-2 text-gray-600 dark:text-gray-300 mb-2">
                      <MapPin size={16} className="mt-1 flex-shrink-0" />
                      <span className="text-sm">{faculty.seatingArea}</span>
                    </div>
                    
                    <motion.div 
                      className="mt-auto space-y-3"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ 
                        opacity: hoveredFaculty === faculty.id ? 1 : 0,
                        height: hoveredFaculty === faculty.id ? 'auto' : 0
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                        <Mail size={16} className="flex-shrink-0" />
                        <a href={`mailto:${faculty.email}`} className="text-sm hover:text-[#E64833] dark:hover:text-[#D6402D]">
                          {faculty.email}
                        </a>
                      </div>
                      
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                        <Phone size={16} className="flex-shrink-0" />
                        <a href={`tel:${faculty.phone}`} className="text-sm hover:text-[#E64833] dark:hover:text-[#D6402D]">
                          {faculty.phone}
                        </a>
                      </div>
                    </motion.div>
                    
                    <Button variant="outline" className="mt-4 border-[#244855] hover:bg-[#244855] hover:text-white dark:border-[#A8C0BF] dark:hover:bg-[#A8C0BF] dark:hover:text-[#1A3641] transition-colors w-full">
                      Learn More
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
          
          {filteredFaculty.length === 0 && (
            <div className="text-center py-10">
              <p className="text-lg text-gray-700 dark:text-gray-300">No faculty members found matching your search criteria.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Faculties;
