
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  BookOpen,
  Calendar,
  CheckSquare,
  ClipboardList,
  MessageSquare,
} from "lucide-react";

interface ClassStats {
  total: number;
  upcoming: number;
  completed: number;
}

interface AttendanceRecord {
  id: string;
  student_id: string;
  subject_code: string;
  subject_name: string;
  status: string;
  date: string;
}

interface StudentInfo {
  name: string;
  email: string;
}

const FacultyDashboard = () => {
  const navigate = useNavigate();
  const [classStats, setClassStats] = useState<ClassStats>({ total: 28, upcoming: 12, completed: 16 });
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [loadingAttendance, setLoadingAttendance] = useState(true);
  const [studentInfo, setStudentInfo] = useState<Record<string, StudentInfo>>({});

  useEffect(() => {
    const fetchRecentAttendance = async () => {
      setLoadingAttendance(true);
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        const { data, error } = await supabase
          .from("student_attendance")
          .select("*")
          .eq("faculty_id", user.id)
          .order("date", { ascending: false })
          .limit(5);

        if (error) {
          console.error("Error fetching attendance:", error);
        } else {
          setAttendanceRecords(data || []);
          
          // Fetch student names
          if (data && data.length > 0) {
            const studentIds = [...new Set(data.map(record => record.student_id))];
            for (const studentId of studentIds) {
              const { data: userData } = await supabase
                .from("login_users")
                .select("name, email")
                .eq("uid", studentId)
                .single();
                
              if (userData) {
                setStudentInfo(prev => ({
                  ...prev,
                  [studentId]: { name: userData.name, email: userData.email }
                }));
              }
            }
          }
        }
      }
      setLoadingAttendance(false);
    };

    fetchRecentAttendance();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  const getStatusColor = (status: string) => {
    return status === "present" ? "bg-green-500" : "bg-red-500";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-[#244855] mb-8">Faculty Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-[#244855]" />
                <CardTitle className="text-lg">Classes</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-2xl font-bold">{classStats.total}</p>
                  <p className="text-sm text-gray-500">Total</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-600">{classStats.upcoming}</p>
                  <p className="text-sm text-gray-500">Upcoming</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">{classStats.completed}</p>
                  <p className="text-sm text-gray-500">Completed</p>
                </div>
              </div>
              <Button 
                className="w-full mt-4 bg-[#244855] hover:bg-[#1a363f]" 
                onClick={() => navigate("/upcoming-classes")}
              >
                View Schedule
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center space-x-2">
                <CheckSquare className="h-5 w-5 text-[#244855]" />
                <CardTitle className="text-lg">Attendance</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">Mark and manage student attendance for your courses.</p>
              <Button 
                className="w-full bg-[#244855] hover:bg-[#1a363f]" 
                onClick={() => navigate("/attendance-records")}
              >
                Take Attendance
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center space-x-2">
                <ClipboardList className="h-5 w-5 text-[#244855]" />
                <CardTitle className="text-lg">Grade Assignments</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">Review and grade student assignments and assessments.</p>
              <Button 
                className="w-full bg-[#244855] hover:bg-[#1a363f]" 
                onClick={() => navigate("/grade-assignments")}
              >
                Grade Now
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader className="bg-[#244855]/5 pb-2">
              <CardTitle className="text-lg text-[#244855]">Recent Attendance Records</CardTitle>
              <CardDescription>Latest attendance you've recorded</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              {loadingAttendance ? (
                <div className="text-center py-8">
                  <p>Loading attendance records...</p>
                </div>
              ) : attendanceRecords.length === 0 ? (
                <div className="text-center py-8">
                  <p>No recent attendance records found.</p>
                  <Button 
                    variant="outline" 
                    onClick={() => navigate("/attendance-records")} 
                    className="mt-2"
                  >
                    Take Attendance
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {attendanceRecords.map((record) => (
                    <div key={record.id} className="border-b pb-3 last:border-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{studentInfo[record.student_id]?.name || "Student"}</p>
                          <p className="text-sm text-gray-600">
                            {record.subject_name} ({record.subject_code})
                          </p>
                        </div>
                        <div className="text-right">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs text-white ${getStatusColor(record.status)}`}>
                            {record.status === "present" ? "Present" : "Absent"}
                          </span>
                          <p className="text-xs text-gray-500 mt-1">{formatDate(record.date)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="pt-2">
                    <Button 
                      variant="outline" 
                      onClick={() => navigate("/attendance-records")} 
                      className="w-full"
                    >
                      View All Records
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="bg-[#244855]/5 pb-2">
              <CardTitle className="text-lg text-[#244855]">Quick Actions</CardTitle>
              <CardDescription>Common tasks for faculty members</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="h-24 flex flex-col items-center justify-center"
                  onClick={() => navigate("/meet-setup")}
                >
                  <MessageSquare className="h-6 w-6 mb-2 text-[#244855]" />
                  <span>Setup Meeting</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-24 flex flex-col items-center justify-center"
                  onClick={() => navigate("/grade-assignments")}
                >
                  <ClipboardList className="h-6 w-6 mb-2 text-[#244855]" />
                  <span>Grade Assignments</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-24 flex flex-col items-center justify-center"
                  onClick={() => navigate("/discussion-forums")}
                >
                  <MessageSquare className="h-6 w-6 mb-2 text-[#244855]" />
                  <span>Discussion Forums</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-24 flex flex-col items-center justify-center"
                  onClick={() => navigate("/resources")}
                >
                  <BookOpen className="h-6 w-6 mb-2 text-[#244855]" />
                  <span>Course Resources</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="bg-[#244855]/5 pb-2">
              <CardTitle className="text-lg text-[#244855]">Calendar Events</CardTitle>
              <CardDescription>Upcoming events and important dates</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <p className="font-medium">Faculty Meeting</p>
                  <p className="text-sm text-gray-500">Tomorrow, 2:00 PM - 3:30 PM</p>
                </div>
                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <p className="font-medium">Exam Submission Deadline</p>
                  <p className="text-sm text-gray-500">May 25, 11:59 PM</p>
                </div>
                <div className="border-l-4 border-orange-500 pl-4 py-2">
                  <p className="font-medium">Department Review</p>
                  <p className="text-sm text-gray-500">June 2, 10:00 AM - 12:00 PM</p>
                </div>
                <Button variant="outline" onClick={() => navigate("/live-calendar")} className="w-full">
                  <Calendar className="mr-2 h-4 w-4" /> View Full Calendar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;
