
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Book, Calendar, CheckSquare, Clock, GraduationCap, MessageSquare, Users } from "lucide-react";

const StudentDashboard = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#244855]">Student Dashboard</h1>
        <Button variant="outline" onClick={() => navigate("/")}>
          Sign Out
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <Calendar className="mr-2 text-[#E64833]" size={20} />
              Upcoming Classes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="p-2 bg-gray-50 rounded-md">
                <div className="font-medium">Data Structures</div>
                <div className="text-sm text-gray-500">Today, 10:00 AM - 11:30 AM</div>
              </li>
              <li className="p-2 bg-gray-50 rounded-md">
                <div className="font-medium">Algorithm Design</div>
                <div className="text-sm text-gray-500">Today, 2:00 PM - 3:30 PM</div>
              </li>
              <li className="p-2 bg-gray-50 rounded-md">
                <div className="font-medium">Database Systems</div>
                <div className="text-sm text-gray-500">Tomorrow, 9:00 AM - 10:30 AM</div>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <CheckSquare className="mr-2 text-[#874F41]" size={20} />
              Assignments Due
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="p-2 bg-gray-50 rounded-md">
                <div className="font-medium">Algorithm Analysis</div>
                <div className="text-sm text-gray-500">Due: Tomorrow, 11:59 PM</div>
              </li>
              <li className="p-2 bg-gray-50 rounded-md">
                <div className="font-medium">Database Design Project</div>
                <div className="text-sm text-gray-500">Due: Friday, 11:59 PM</div>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <Book className="mr-2 text-[#244855]" size={20} />
              AI Study Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="p-2 bg-gray-50 rounded-md">
                <div className="font-medium">Graph Algorithms</div>
                <div className="text-sm text-gray-500">Based on your course progress</div>
              </li>
              <li className="p-2 bg-gray-50 rounded-md">
                <div className="font-medium">SQL Optimization</div>
                <div className="text-sm text-gray-500">Recommended for upcoming quiz</div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="mr-2 text-[#90AEAD]" size={20} />
              Attendance Overview
            </CardTitle>
            <CardDescription>Your attendance for the current semester</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Data Structures</span>
                  <span className="text-sm font-medium">92%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-[#244855] h-2 rounded-full" style={{ width: "92%" }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Algorithm Design</span>
                  <span className="text-sm font-medium">85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-[#244855] h-2 rounded-full" style={{ width: "85%" }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Database Systems</span>
                  <span className="text-sm font-medium">78%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-[#244855] h-2 rounded-full" style={{ width: "78%" }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <GraduationCap className="mr-2 text-[#E64833]" size={20} />
              Performance Metrics
            </CardTitle>
            <CardDescription>Your current academic performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Current GPA</span>
                  <span className="text-sm font-medium">3.7/4.0</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-[#E64833] h-2 rounded-full" style={{ width: "92%" }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Assignments Completed</span>
                  <span className="text-sm font-medium">85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-[#E64833] h-2 rounded-full" style={{ width: "85%" }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Average Quiz Score</span>
                  <span className="text-sm font-medium">88%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-[#E64833] h-2 rounded-full" style={{ width: "88%" }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="mr-2 text-[#874F41]" size={20} />
              Discussion Forums
            </CardTitle>
            <CardDescription>Recent activity in your course forums</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="bg-[#FBE9D0] rounded-full p-2">
                  <Users size={16} className="text-[#874F41]" />
                </div>
                <div>
                  <div className="font-medium">Database Normalization Question</div>
                  <div className="text-sm text-gray-500">New reply from Dr. Chen • 1 hour ago</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-[#FBE9D0] rounded-full p-2">
                  <Users size={16} className="text-[#874F41]" />
                </div>
                <div>
                  <div className="font-medium">Algorithm Complexity Analysis</div>
                  <div className="text-sm text-gray-500">3 new replies • 3 hours ago</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-[#FBE9D0] rounded-full p-2">
                  <Users size={16} className="text-[#874F41]" />
                </div>
                <div>
                  <div className="font-medium">Project Group Formation</div>
                  <div className="text-sm text-gray-500">New thread by Prof. Johnson • 1 day ago</div>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 text-[#90AEAD]" size={20} />
              Upcoming Events
            </CardTitle>
            <CardDescription>Events and activities on campus</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="bg-[#90AEAD]/20 rounded-full p-2">
                  <Calendar size={16} className="text-[#90AEAD]" />
                </div>
                <div>
                  <div className="font-medium">Tech Symposium 2023</div>
                  <div className="text-sm text-gray-500">Oct 15, 10:00 AM • Main Auditorium</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-[#90AEAD]/20 rounded-full p-2">
                  <Calendar size={16} className="text-[#90AEAD]" />
                </div>
                <div>
                  <div className="font-medium">Career Fair</div>
                  <div className="text-sm text-gray-500">Oct 20, 9:00 AM • Convention Center</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-[#90AEAD]/20 rounded-full p-2">
                  <Calendar size={16} className="text-[#90AEAD]" />
                </div>
                <div>
                  <div className="font-medium">Hackathon 2023</div>
                  <div className="text-sm text-gray-500">Nov 5-6 • Computer Science Building</div>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;
