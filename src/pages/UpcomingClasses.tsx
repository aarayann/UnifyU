
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Search,
  Clock,
  MapPin,
  Calendar,
  Users,
  ChevronDown,
  ChevronUp,
  Filter,
} from "lucide-react";

// Class interface
interface ClassInfo {
  day: string;
  subject_name: string;
  subject_code: string;
  room: string;
  start_time: string;
  end_time: string;
  duration: number; // in minutes
  faculty_name: string;
  is_practical?: boolean;
  is_tutorial?: boolean;
}

// Color map for subjects
const subjectColors: Record<string, string> = {
  'CSET301': 'bg-purple-100 border-purple-300 text-purple-800',
  'CSET209': 'bg-blue-100 border-blue-300 text-blue-800',
  'CSET207': 'bg-green-100 border-green-300 text-green-800',
  'CSET244': 'bg-red-100 border-red-300 text-red-800',
  'CSET203': 'bg-orange-100 border-orange-300 text-orange-800',
  'CSET210': 'bg-yellow-100 border-yellow-300 text-yellow-800',
};

// Days of the week
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// Class data based on the provided weekly schedule
const classData: ClassInfo[] = [
  // Monday
  {
    day: 'Monday',
    subject_name: 'Artificial Intelligence and Machine Learning',
    subject_code: 'CSET301',
    room: 'P-CC-315',
    start_time: '15:40',
    end_time: '16:35',
    duration: 55,
    faculty_name: 'Hoor Fatima',
  },
  {
    day: 'Monday',
    subject_name: 'Operating Systems',
    subject_code: 'CSET209',
    room: 'P-LH-102',
    start_time: '16:40',
    end_time: '17:35',
    duration: 55,
    faculty_name: 'Arvind Mewada',
  },
  {
    day: 'Monday',
    subject_name: 'Computer Networks',
    subject_code: 'CSET207',
    room: 'P-CC-121',
    start_time: '08:30',
    end_time: '09:25',
    duration: 55,
    faculty_name: 'Md. Saquib Jawed',
  },
  {
    day: 'Monday',
    subject_name: 'Design and Analysis of Algorithms',
    subject_code: 'CSET244',
    room: 'P-CC-121',
    start_time: '09:30',
    end_time: '10:25',
    duration: 55,
    faculty_name: 'Hardeo Kumar Thakur',
  },
  {
    day: 'Monday',
    subject_name: 'Design and Analysis of Algorithms - Practical',
    subject_code: 'CSET244-P',
    room: 'P-LA-207',
    start_time: '10:40',
    end_time: '12:35',
    duration: 115,
    faculty_name: 'Sonam Bhardwaj',
    is_practical: true,
  },
  
  // Tuesday
  {
    day: 'Tuesday',
    subject_name: 'Operating Systems',
    subject_code: 'CSET209',
    room: 'P-LH-102',
    start_time: '08:30',
    end_time: '09:25',
    duration: 55,
    faculty_name: 'Arvind Mewada',
  },
  {
    day: 'Tuesday',
    subject_name: 'Artificial Intelligence and Machine Learning',
    subject_code: 'CSET301',
    room: 'P-CC-315',
    start_time: '09:30',
    end_time: '10:25',
    duration: 55,
    faculty_name: 'Hoor Fatima',
  },
  {
    day: 'Tuesday',
    subject_name: 'Design and Analysis of Algorithms - Practical',
    subject_code: 'CSET244-P',
    room: 'P-LA-207',
    start_time: '10:40',
    end_time: '12:35',
    duration: 115,
    faculty_name: 'Ravi Sharma',
    is_practical: true,
  },
  {
    day: 'Tuesday',
    subject_name: 'Artificial Intelligence and Machine Learning - Practical',
    subject_code: 'CSET301-P',
    room: 'B-LA-108 C',
    start_time: '13:35',
    end_time: '15:25',
    duration: 110,
    faculty_name: 'Manish Raj',
    is_practical: true,
  },
  {
    day: 'Tuesday',
    subject_name: 'Microprocessors and Computer Architecture',
    subject_code: 'CSET203',
    room: '004-N-CB',
    start_time: '15:40',
    end_time: '16:35',
    duration: 55,
    faculty_name: 'Atul Kumar Srivastava',
  },
  
  // Wednesday
  {
    day: 'Wednesday',
    subject_name: 'Design and Analysis of Algorithms',
    subject_code: 'CSET244',
    room: 'P-CC-121',
    start_time: '08:30',
    end_time: '09:25',
    duration: 55,
    faculty_name: 'Hardeo Kumar Thakur',
  },
  {
    day: 'Wednesday',
    subject_name: 'Computer Networks',
    subject_code: 'CSET207',
    room: 'P-CC-121',
    start_time: '09:30',
    end_time: '10:25',
    duration: 55,
    faculty_name: 'Md. Saquib Jawed',
  },
  {
    day: 'Wednesday',
    subject_name: 'Design and Analysis of Algorithms - Tutorial',
    subject_code: 'CSET244-T',
    room: '108-N-TR',
    start_time: '10:40',
    end_time: '11:35',
    duration: 55,
    faculty_name: 'Divya Singh',
    is_tutorial: true,
  },
  {
    day: 'Wednesday',
    subject_name: 'Computer Networks - Practical',
    subject_code: 'CSET207-P',
    room: 'B-LA-108 B',
    start_time: '13:35',
    end_time: '15:25',
    duration: 110,
    faculty_name: 'Sangeeta Kumari',
    is_practical: true,
  },
  
  // Thursday
  {
    day: 'Thursday',
    subject_name: 'Computer Networks',
    subject_code: 'CSET207',
    room: 'P-CC-121',
    start_time: '10:40',
    end_time: '11:35',
    duration: 55,
    faculty_name: 'Md. Saquib Jawed',
  },
  {
    day: 'Thursday',
    subject_name: 'Design and Analysis of Algorithms',
    subject_code: 'CSET244',
    room: 'P-CC-121',
    start_time: '11:40',
    end_time: '12:35',
    duration: 55,
    faculty_name: 'Hardeo Kumar Thakur',
  },
  {
    day: 'Thursday',
    subject_name: 'Artificial Intelligence and Machine Learning',
    subject_code: 'CSET301',
    room: 'P-CC-315',
    start_time: '15:40',
    end_time: '16:35',
    duration: 55,
    faculty_name: 'Hoor Fatima',
  },
  {
    day: 'Thursday',
    subject_name: 'Operating Systems',
    subject_code: 'CSET209',
    room: 'P-LH-102',
    start_time: '16:40',
    end_time: '17:35',
    duration: 55,
    faculty_name: 'Arvind Mewada',
  },
  
  // Friday
  {
    day: 'Friday',
    subject_name: 'Design Thinking & Innovation - Practical',
    subject_code: 'CSET210-P',
    room: '002-A-LH',
    start_time: '08:30',
    end_time: '10:25',
    duration: 115,
    faculty_name: 'Garima Jaiswal',
    is_practical: true,
  },
  {
    day: 'Friday',
    subject_name: 'Operating Systems - Practical',
    subject_code: 'CSET209-P',
    room: 'B-LA-108 B',
    start_time: '13:35',
    end_time: '15:25',
    duration: 110,
    faculty_name: 'Akhil Kumar',
    is_practical: true,
  },
];

// Helper function to format time from 24h to 12h
const formatTime = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;
  return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
};

export default function UpcomingClasses() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterFaculty, setFilterFaculty] = useState('');
  const [filterDay, setFilterDay] = useState<string | null>(null);
  const [expandedDays, setExpandedDays] = useState<Record<string, boolean>>({
    Monday: true,
    Tuesday: true,
    Wednesday: true,
    Thursday: true,
    Friday: true,
    Saturday: true,
    Sunday: true,
  });
  
  // Get current day
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  
  // Filter classes based on search query and filters
  const filteredClasses = classData.filter(classInfo => {
    const matchesSearch = 
      classInfo.subject_name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      classInfo.subject_code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      classInfo.faculty_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      classInfo.room.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesFaculty = filterFaculty ? classInfo.faculty_name.toLowerCase().includes(filterFaculty.toLowerCase()) : true;
    const matchesDay = filterDay ? classInfo.day === filterDay : true;
    
    return matchesSearch && matchesFaculty && matchesDay;
  });
  
  // Group classes by day
  const classesByDay = DAYS.reduce<Record<string, ClassInfo[]>>((acc, day) => {
    acc[day] = filteredClasses.filter(cls => cls.day === day);
    return acc;
  }, {});
  
  // Helper to toggle expanded state for a specific day
  const toggleDayExpanded = (day: string) => {
    setExpandedDays(prev => ({
      ...prev,
      [day]: !prev[day]
    }));
  };
  
  // Helper to check if a day has any classes
  const dayHasClasses = (day: string) => {
    return classesByDay[day] && classesByDay[day].length > 0;
  };
  
  // Get class for the colorful left border
  const getClassBorderColor = (classInfo: ClassInfo) => {
    const baseCode = classInfo.subject_code.split('-')[0]; // Extract base code, ignoring -P or -T suffix
    return subjectColors[baseCode] || 'bg-gray-100 border-gray-300 text-gray-800';
  };
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-[#244855] mb-2">Upcoming Classes</h1>
      <p className="text-gray-600 mb-8">View your weekly class schedule</p>
      
      <Tabs defaultValue="list" className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <TabsList>
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="timetable">Timetable View</TabsTrigger>
          </TabsList>
          
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <div className="relative flex-grow md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search classes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="relative flex-grow md:w-64">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Filter by faculty name..."
                value={filterFaculty}
                onChange={(e) => setFilterFaculty(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={filterDay || ''}
              onChange={(e) => setFilterDay(e.target.value || null)}
              className="flex h-10 w-full md:w-48 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="">All Days</option>
              {DAYS.map(day => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
          </div>
        </div>
        
        <TabsContent value="list" className="space-y-8">
          {DAYS.map(day => (
            <div key={day} className={!dayHasClasses(day) && filterDay !== day ? 'hidden' : ''}>
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center">
                  <h2 className={`text-xl font-semibold ${day === today ? 'text-[#244855]' : 'text-gray-700'}`}>
                    {day}
                    {day === today && <span className="ml-2 px-2 py-0.5 text-xs bg-[#244855] text-white rounded-full">Today</span>}
                  </h2>
                </div>
                {dayHasClasses(day) && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => toggleDayExpanded(day)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    {expandedDays[day] ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                )}
              </div>
              
              {!dayHasClasses(day) ? (
                <Card className="bg-gray-50">
                  <CardContent className="p-6 text-center text-gray-500">
                    <p>💤 No classes - Holiday</p>
                  </CardContent>
                </Card>
              ) : expandedDays[day] ? (
                <div className="space-y-4">
                  {classesByDay[day]
                    .sort((a, b) => a.start_time.localeCompare(b.start_time))
                    .map((classInfo, idx) => (
                      <Card key={`${day}-${classInfo.subject_code}-${idx}`} className="overflow-hidden">
                        <div className={`border-l-4 ${getClassBorderColor(classInfo)}`}>
                          <CardContent className="p-4">
                            <div className="flex flex-col md:flex-row md:items-center justify-between">
                              <div className="mb-3 md:mb-0">
                                <h3 className="text-lg font-semibold">
                                  {classInfo.subject_name}
                                  {classInfo.is_practical && (
                                    <span className="ml-2 px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full">Practical</span>
                                  )}
                                  {classInfo.is_tutorial && (
                                    <span className="ml-2 px-2 py-0.5 text-xs bg-purple-100 text-purple-800 rounded-full">Tutorial</span>
                                  )}
                                </h3>
                                <p className="text-gray-600">{classInfo.subject_code}</p>
                              </div>
                              <div className="flex items-center bg-gray-50 rounded-md px-3 py-1">
                                <Clock className="h-4 w-4 text-gray-500 mr-1" />
                                <span className="text-sm">
                                  {formatTime(classInfo.start_time)} - {formatTime(classInfo.end_time)}
                                  <span className="text-xs text-gray-500 ml-1">({classInfo.duration} min)</span>
                                </span>
                              </div>
                            </div>
                            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
                              <div className="flex items-center text-sm text-gray-600">
                                <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                                Room: {classInfo.room}
                              </div>
                              <div className="flex items-center text-sm text-gray-600">
                                <Users className="h-4 w-4 text-gray-500 mr-2" />
                                Faculty: {classInfo.faculty_name}
                              </div>
                            </div>
                          </CardContent>
                        </div>
                      </Card>
                    ))}
                </div>
              ) : (
                <Card className="bg-gray-50">
                  <CardContent className="p-3 text-center text-sm text-gray-500">
                    <p>{classesByDay[day].length} classes - Click to expand</p>
                  </CardContent>
                </Card>
              )}
            </div>
          ))}
        </TabsContent>
        
        <TabsContent value="timetable">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Weekly Timetable</CardTitle>
              <CardDescription>Color-coded weekly class schedule</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <div className="min-w-[900px] grid grid-cols-7 gap-2">
                  {/* Header Row - Days */}
                  {DAYS.map(day => (
                    <div 
                      key={`header-${day}`} 
                      className={`text-center font-medium p-2 rounded-t-md ${day === today ? 'bg-[#244855] text-white' : 'bg-gray-100'}`}
                    >
                      {day}
                    </div>
                  ))}
                  
                  {/* Content Rows - Class slots */}
                  <div className="col-span-7 grid grid-cols-7 border-t border-gray-200">
                    {/* Loop through each day */}
                    {DAYS.map(day => (
                      <div 
                        key={`content-${day}`} 
                        className={`min-h-[500px] border-r border-gray-200 relative ${
                          day === today ? 'bg-blue-50/20' : ''
                        } ${
                          day === 'Saturday' || day === 'Sunday' ? 'bg-gray-50' : ''
                        }`}
                      >
                        {day === 'Saturday' || day === 'Sunday' ? (
                          <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                            <p className="text-center">
                              <span className="block text-xl">💤</span>
                              <span>Holiday</span>
                            </p>
                          </div>
                        ) : (
                          classesByDay[day]
                            .sort((a, b) => a.start_time.localeCompare(b.start_time))
                            .map((classInfo, idx) => {
                              // Calculate position based on time
                              const [startHour, startMinutes] = classInfo.start_time.split(':').map(Number);
                              const startInMinutes = startHour * 60 + startMinutes;
                              const dayStartInMinutes = 8 * 60; // 8:00 AM
                              const dayEndInMinutes = 18 * 60; // 6:00 PM
                              const totalDayMinutes = dayEndInMinutes - dayStartInMinutes;
                              
                              const topPercentage = ((startInMinutes - dayStartInMinutes) / totalDayMinutes) * 100;
                              const heightPercentage = (classInfo.duration / totalDayMinutes) * 100;
                              
                              // Extract base code for color
                              const baseCode = classInfo.subject_code.split('-')[0];
                              const bgColor = subjectColors[baseCode]?.split(' ')[0] || 'bg-gray-100';
                              
                              return (
                                <div
                                  key={`${day}-${classInfo.subject_code}-${idx}`}
                                  className={`absolute left-1 right-1 rounded-md p-1 border ${
                                    subjectColors[baseCode]?.split(' ')[1] || 'border-gray-300'
                                  } shadow-sm overflow-hidden`}
                                  style={{
                                    top: `${topPercentage}%`,
                                    height: `${heightPercentage}%`,
                                    minHeight: '60px',
                                  }}
                                >
                                  <div className={`h-full rounded-sm p-2 ${bgColor} bg-opacity-50`}>
                                    <p className="font-medium text-xs sm:text-sm truncate">
                                      {classInfo.subject_code}
                                    </p>
                                    <p className="text-xs truncate">{classInfo.room}</p>
                                    <p className="text-[10px] text-gray-600 truncate">
                                      {formatTime(classInfo.start_time)} - {formatTime(classInfo.end_time)}
                                    </p>
                                  </div>
                                </div>
                              );
                            })
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Legend */}
              <div className="mt-6 border-t pt-4">
                <p className="text-sm font-medium mb-2">Subject Legend</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {Object.entries(subjectColors).map(([code, colorClass]) => (
                    <div key={code} className="flex items-center">
                      <div className={`w-3 h-3 rounded ${colorClass.split(' ')[0]}`}></div>
                      <span className="ml-2 text-xs">
                        {code} - {SUBJECTS.find(s => s.code === code)?.name || code}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Helper type for subjects
interface Subject {
  code: string;
  name: string;
}

// Define subjects
const SUBJECTS: Subject[] = [
  { code: 'CSET301', name: 'Artificial Intelligence and Machine Learning' },
  { code: 'CSET209', name: 'Operating Systems' },
  { code: 'CSET207', name: 'Computer Networks' },
  { code: 'CSET244', name: 'Design and Analysis of Algorithms' },
  { code: 'CSET203', name: 'Microprocessors and Computer Architecture' },
  { code: 'CSET210', name: 'Design Thinking & Innovation' },
];
