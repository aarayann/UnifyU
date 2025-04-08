import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Clock,
  Bell,
  Settings,
  LogOut,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AttendanceRecord {
  course_name: string;
  total_classes: number;
  attended_classes: number;
}

interface PerformanceMetric {
  course_name: string;
  assignments_score: number;
  quizzes_score: number;
  exams_score: number;
  overall_grade: string;
}

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [attendanceData, setAttendanceData] = useState<AttendanceRecord[]>([]);
  const [performanceData, setPerformanceData] = useState<PerformanceMetric[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      const { data: attendance, error: attendanceError } = await supabase
        .from("attendance_records")
        .select("course_name, total_classes, attended_classes")
        .eq("uid", user.id);

      if (attendanceError) {
        console.error("Error fetching attendance:", attendanceError.message);
      } else {
        setAttendanceData(attendance || []);
      }

      const { data: performance, error: performanceError } = await supabase
        .from("performance_metrics")
        .select("course_name, assignments_score, quizzes_score, exams_score, overall_grade")
        .eq("uid", user.id);

      if (performanceError) {
        console.error("Error fetching performance:", performanceError.message);
      } else {
        setPerformanceData(performance || []);
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderAttendanceBars = () => {
    if (loading) return <p>Loading attendance data...</p>;
    if (attendanceData.length === 0) return <p>No attendance data available.</p>;

    return attendanceData.map((record, index) => {
      const percentage = Math.round(
        (record.attended_classes / record.total_classes) * 100
      );
      return (
        <div key={index}>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">{record.course_name}</span>
            <span className="text-sm font-medium">{percentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-[#244855] h-2 rounded-full"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>
      );
    });
  };

  const renderPerformanceCards = () => {
    if (loading) return <p>Loading performance metrics...</p>;
    if (performanceData.length === 0) return <p>No performance data available.</p>;

    return performanceData.map((course, index) => (
      <Card key={index} className="border border-gray-200 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-[#244855]">
            {course.course_name}
          </CardTitle>
          <CardDescription>Grade: <strong>{course.overall_grade}</strong></CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-1 text-sm text-gray-700">
            <p>Assignments Score: {course.assignments_score}%</p>
            <p>Quizzes Score: {course.quizzes_score}%</p>
            <p>Exams Score: {course.exams_score}%</p>
          </div>
        </CardContent>
      </Card>
    ));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="container mx-auto py-6 px-4 flex justify-between items-center border-b">
        <h1
          className="text-3xl font-bold text-[#244855] cursor-pointer"
          onClick={() => navigate("/")}
        >
          Dashboard
        </h1>

        <div className="flex items-center gap-4">
          {/* Notification Bell */}
          <button className="relative" onClick={() => navigate("/notifications")}>
            <Bell size={22} className="text-[#244855]" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs px-1.5">
              3
            </span>
          </button>

          {/* Account Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Settings size={16} />
                Account
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem onClick={() => navigate("/account-settings")}>
                <Settings className="mr-2 h-4 w-4" /> Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/")}>
                <LogOut className="mr-2 h-4 w-4" /> Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Attendance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="mr-2 text-[#90AEAD]" size={20} />
                Attendance Overview
              </CardTitle>
              <CardDescription>
                Your attendance for the current semester
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">{renderAttendanceBars()}</div>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <div className="grid grid-cols-1 gap-4">{renderPerformanceCards()}</div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
