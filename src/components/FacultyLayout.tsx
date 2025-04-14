import {
  BookOpen,
  Calendar,
  CheckSquare,
  ClipboardList,
  GraduationCap,
  MessageSquare,
  Settings,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import { useNavigate, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { Bell } from "lucide-react";

const FacultyLayout = () => {
  const navigate = useNavigate();
  const [openSettings, setOpenSettings] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r p-6 hidden md:block">
        <h2 className="text-3xl font-bold text-[#244855] mb-8">UnifyU</h2>
        <nav className="space-y-4 text-[16px]">
          <button
            onClick={() => navigate("/faculty/dashboard")}
            className="flex items-center gap-3 text-gray-700 hover:text-[#244855] transition"
          >
            <LayoutDashboard size={20} /> Dashboard
          </button>
          <button
            onClick={() => navigate("/faculty/attendance")}
            className="flex items-center gap-3 text-gray-700 hover:text-[#244855] transition"
          >
            <CheckSquare size={20} /> Attendance
          </button>
          <button
            onClick={() => navigate("/faculty/schedule")}
            className="flex items-center gap-3 text-gray-700 hover:text-[#244855] transition"
          >
            <Calendar size={20} /> Schedule
          </button>
          <button
            onClick={() => navigate("/faculty/assessments")}
            className="flex items-center gap-3 text-gray-700 hover:text-[#244855] transition"
          >
            <ClipboardList size={20} /> Assessments
          </button>
          <button
            onClick={() => navigate("/faculty/performance")}
            className="flex items-center gap-3 text-gray-700 hover:text-[#244855] transition"
          >
            <GraduationCap size={20} /> Performance
          </button>
          <button
            onClick={() => navigate("/faculty/forums")}
            className="flex items-center gap-3 text-gray-700 hover:text-[#244855] transition"
          >
            <MessageSquare size={20} /> Forums
          </button>
          <button
      onClick={() => navigate("/faculty/create-forum")}
      className="flex items-center gap-3 text-gray-700 hover:text-[#244855] transition"
    >
      <ClipboardList size={20} /> Create Forum
    </button>
          <button
            onClick={() => navigate("/faculty/resources")}
            className="flex items-center gap-3 text-gray-700 hover:text-[#244855] transition"
          >
            <BookOpen size={20} /> Resources
          </button>
          
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-[#244855]">Faculty Panel</h1>
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
              <DropdownMenuContent align="end" className="w-44">
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

        {/* Routed Content */}
        <Outlet />
      </main>
    </div>
  );
};

export default FacultyLayout;
