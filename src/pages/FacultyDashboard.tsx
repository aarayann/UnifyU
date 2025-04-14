import {
  BookOpen,
  Calendar,
  ClipboardList,
  GraduationCap,
  MessageSquare,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const FacultyDashboard = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <Card onClick={() => navigate("/faculty/schedule")} className="cursor-pointer hover:shadow-lg transition">
          <CardHeader>
            <CardTitle>Teaching Schedule</CardTitle>
            <CardDescription>View today’s and upcoming classes</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar className="text-[#244855]" size={40} />
          </CardContent>
        </Card>

        <Card onClick={() => navigate("/faculty/assessments")} className="cursor-pointer hover:shadow-lg transition">
          <CardHeader>
            <CardTitle>Assessments</CardTitle>
            <CardDescription>Manage and view assignments</CardDescription>
          </CardHeader>
          <CardContent>
            <ClipboardList className="text-[#244855]" size={40} />
          </CardContent>
        </Card>

        <Card onClick={() => navigate("/faculty/performance")} className="cursor-pointer hover:shadow-lg transition">
          <CardHeader>
            <CardTitle>Performance</CardTitle>
            <CardDescription>Analyze student performance</CardDescription>
          </CardHeader>
          <CardContent>
            <GraduationCap className="text-[#244855]" size={40} />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <Card onClick={() => navigate("/faculty/resources")} className="cursor-pointer hover:shadow-lg transition">
          <CardHeader>
            <CardTitle>Course Resources</CardTitle>
            <CardDescription>Upload or manage course materials</CardDescription>
          </CardHeader>
          <CardContent>
            <BookOpen className="text-[#244855]" size={40} />
          </CardContent>
        </Card>

        <Card onClick={() => navigate("/faculty/forums")} className="cursor-pointer hover:shadow-lg transition">
          <CardHeader>
            <CardTitle>Forums</CardTitle>
            <CardDescription>Engage in course discussions</CardDescription>
          </CardHeader>
          <CardContent>
            <MessageSquare className="text-[#244855]" size={40} />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default FacultyDashboard;
