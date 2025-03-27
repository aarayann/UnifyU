
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const facultyMembers = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    title: "Professor of Computer Science",
    department: "School of Engineering",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    title: "Associate Professor of Data Science",
    department: "School of Engineering",
    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Prof. Amelia Rodriguez",
    title: "Professor of Business Administration",
    department: "School of Business",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    title: "Professor of Economics",
    department: "School of Business",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "Dr. Priya Sharma",
    title: "Professor of Psychology",
    department: "School of Liberal Arts",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 6,
    name: "Dr. Robert Zhang",
    title: "Professor of Physics",
    department: "School of Sciences",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
  },
];

const Faculties = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-12 text-[#244855]">Meet Our Distinguished Faculty</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {facultyMembers.map((faculty) => (
          <Card key={faculty.id} className="overflow-hidden transition-all duration-300 hover:shadow-lg">
            <div className="aspect-ratio-1/1 h-48 overflow-hidden">
              <img 
                src={faculty.image} 
                alt={faculty.name} 
                className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
              />
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-[#244855]">{faculty.name}</CardTitle>
              <CardDescription className="text-[#E64833] font-medium">{faculty.title}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">{faculty.department}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Faculties;
