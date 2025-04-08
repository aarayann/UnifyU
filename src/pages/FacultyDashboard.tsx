import {
  BookOpen,
  Calendar,
  CheckSquare,
  ClipboardList,
  GraduationCap,
  MessageSquare,
  Users,
  Bell,
  Settings,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useState } from "react";

const FacultyDashboard = () => {
  const navigate = useNavigate();
  const [openSettings, setOpenSettings] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r p-6 hidden md:block">
        <h2 className="text-2xl font-bold text-[#244855] mb-6">UnifyU</h2>
        <nav className="space-y-4">
          <button onClick={() => navigate("/faculty-dashboard")} className="flex items-center gap-2 text-gray-700 hover:text-[#244855]">
            <LayoutDashboard size={20} /> Dashboard
          </button>
          <button onClick={() => navigate("/faculty/schedule")} className="flex items-center gap-2 text-gray-700 hover:text-[#244855]">
            <Calendar size={20} /> Schedule
          </button>
          <button onClick={() => navigate("/faculty/assessments")} className="flex items-center gap-2 text-gray-700 hover:text-[#244855]">
            <ClipboardList size={20} /> Assessments
          </button>
          <button onClick={() => navigate("/faculty/performance")} className="flex items-center gap-2 text-gray-700 hover:text-[#244855]">
            <GraduationCap size={20} /> Performance
          </button>
          <button onClick={() => navigate("/faculty/forums")} className="flex items-center gap-2 text-gray-700 hover:text-[#244855]">
            <MessageSquare size={20} /> Forums
          </button>
          <button onClick={() => navigate("/faculty/resources")} className="flex items-center gap-2 text-gray-700 hover:text-[#244855]">
            <BookOpen size={20} /> Resources
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[#244855]">Faculty Dashboard</h1>
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button className="relative">
              <Bell size={22} className="text-[#244855]" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs px-1.5">3</span>
            </button>

            {/* Account Dropdown */}
            <DropdownMenu open={openSettings} onOpenChange={setOpenSettings}>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Settings size={16} />
                  Account
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem onClick={() => navigate("/faculty/account-settings")}>
                  <Settings className="mr-2 h-4 w-4" /> Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/")}>
                  <LogOut className="mr-2 h-4 w-4" /> Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Dashboard Content Grid (same as before) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {/* Schedule, Assessments, Office Hours */}
          {/* ... (Keep all original cards unchanged) */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Performance, Course Resources */}
          {/* ... (Keep original) */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Forums, Events */}
          {/* ... (Keep original) */}
        </div>
      </main>
    </div>
  );
};

export default FacultyDashboard;
