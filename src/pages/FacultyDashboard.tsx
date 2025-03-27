
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { BookOpen, Calendar, CheckSquare, ClipboardList, GraduationCap, MessageSquare, Users } from "lucide-react";

const FacultyDashboard = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#244855]">Faculty Dashboard</h1>
        <Button variant="outline" onClick={() => navigate("/")}>
          Sign Out
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <Calendar className="mr-2 text-[#E64833]" size={20} />
              Teaching Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="p-2 bg-gray-50 rounded-md">
                <div className="font-medium">CSE101: Intro to Programming</div>
                <div className="text-sm text-gray-500">Today, 10:00 AM - 11:30 AM</div>
                <div className="text-sm text-gray-500">Room: CS-302</div>
              </li>
              <li className="p-2 bg-gray-50 rounded-md">
                <div className="font-medium">CSE305: Database Systems</div>
                <div className="text-sm text-gray-500">Today, 2:00 PM - 3:30 PM</div>
                <div className="text-sm text-gray-500">Room: CS-201</div>
              </li>
              <li className="p-2 bg-gray-50 rounded-md">
                <div className="font-medium">CSE401: Advanced Algorithms</div>
                <div className="text-sm text-gray-500">Tomorrow, 9:00 AM - 10:30 AM</div>
                <div className="text-sm text-gray-500">Room: CS-105</div>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <ClipboardList className="mr-2 text-[#874F41]" size={20} />
              Pending Assessments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="p-2 bg-gray-50 rounded-md">
                <div className="font-medium">CSE101: Assignment 3</div>
                <div className="text-sm text-gray-500">32 submissions pending review</div>
              </li>
              <li className="p-2 bg-gray-50 rounded-md">
                <div className="font-medium">CSE305: Project Phase 1</div>
                <div className="text-sm text-gray-500">15 submissions pending review</div>
              </li>
              <li className="p-2 bg-gray-50 rounded-md">
                <div className="font-medium">CSE401: Mid-term Papers</div>
                <div className="text-sm text-gray-500">28 papers pending grading</div>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <Users className="mr-2 text-[#244855]" size={20} />
              Office Hours
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="p-2 bg-gray-50 rounded-md">
                <div className="font-medium">Monday</div>
                <div className="text-sm text-gray-500">1:00 PM - 3:00 PM • Office: FC-420</div>
              </li>
              <li className="p-2 bg-gray-50 rounded-md">
                <div className="font-medium">Wednesday</div>
                <div className="text-sm text-gray-500">11:00 AM - 1:00 PM • Office: FC-420</div>
              </li>
              <li className="p-2 bg-gray-50 rounded-md">
                <div className="font-medium">Friday</div>
                <div className="text-sm text-gray-500">2:00 PM - 4:00 PM • Virtual (Zoom)</div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <GraduationCap className="mr-2 text-[#90AEAD]" size={20} />
              Student Performance
            </CardTitle>
            <CardDescription>Course performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">CSE101: Intro to Programming</span>
                  <span className="text-sm font-medium">Class Avg: B+</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-[#244855] h-2 rounded-full" style={{ width: "85%" }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">CSE305: Database Systems</span>
                  <span className="text-sm font-medium">Class Avg: B</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-[#244855] h-2 rounded-full" style={{ width: "78%" }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">CSE401: Advanced Algorithms</span>
                  <span className="text-sm font-medium">Class Avg: B-</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-[#244855] h-2 rounded-full" style={{ width: "72%" }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="mr-2 text-[#E64833]" size={20} />
              Course Resources
            </CardTitle>
            <CardDescription>Manage your course materials</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="bg-[#FBE9D0] rounded-full p-2">
                  <CheckSquare size={16} className="text-[#E64833]" />
                </div>
                <div>
                  <div className="font-medium">CSE101: Lecture Slides</div>
                  <div className="text-sm text-gray-500">Last updated: Yesterday</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-[#FBE9D0] rounded-full p-2">
                  <CheckSquare size={16} className="text-[#E64833]" />
                </div>
                <div>
                  <div className="font-medium">CSE305: Assignment Instructions</div>
                  <div className="text-sm text-gray-500">Last updated: 3 days ago</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-[#FBE9D0] rounded-full p-2">
                  <CheckSquare size={16} className="text-[#E64833]" />
                </div>
                <div>
                  <div className="font-medium">CSE401: Reference Materials</div>
                  <div className="text-sm text-gray-500">Last updated: 1 week ago</div>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="mr-2 text-[#874F41]" size={20} />
              Course Forums
            </CardTitle>
            <CardDescription>Recent activity in your course forums</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="bg-[#90AEAD]/20 rounded-full p-2">
                  <Users size={16} className="text-[#874F41]" />
                </div>
                <div>
                  <div className="font-medium">CSE101: Project Clarification</div>
                  <div className="text-sm text-gray-500">5 new posts • Last activity: 2 hours ago</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-[#90AEAD]/20 rounded-full p-2">
                  <Users size={16} className="text-[#874F41]" />
                </div>
                <div>
                  <div className="font-medium">CSE305: SQL Query Help</div>
                  <div className="text-sm text-gray-500">3 new posts • Last activity: 5 hours ago</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-[#90AEAD]/20 rounded-full p-2">
                  <Users size={16} className="text-[#874F41]" />
                </div>
                <div>
                  <div className="font-medium">CSE401: Algorithm Analysis</div>
                  <div className="text-sm text-gray-500">2 new posts • Last activity: Yesterday</div>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 text-[#90AEAD]" size={20} />
              Department Events
            </CardTitle>
            <CardDescription>Upcoming department activities</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="bg-[#90AEAD]/20 rounded-full p-2">
                  <Calendar size={16} className="text-[#90AEAD]" />
                </div>
                <div>
                  <div className="font-medium">Faculty Meeting</div>
                  <div className="text-sm text-gray-500">Tomorrow, 3:00 PM • Conference Room A</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-[#90AEAD]/20 rounded-full p-2">
                  <Calendar size={16} className="text-[#90AEAD]" />
                </div>
                <div>
                  <div className="font-medium">Curriculum Review</div>
                  <div className="text-sm text-gray-500">Oct 18, 1:00 PM • Dean's Office</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-[#90AEAD]/20 rounded-full p-2">
                  <Calendar size={16} className="text-[#90AEAD]" />
                </div>
                <div>
                  <div className="font-medium">Research Symposium</div>
                  <div className="text-sm text-gray-500">Nov 10, 9:00 AM • Main Auditorium</div>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FacultyDashboard;
