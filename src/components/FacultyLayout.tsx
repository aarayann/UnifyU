
// components/FacultyLayout.tsx
import { Bell, LogOut, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const FacultyLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [notifications] = useState([
    { title: "New submission in CSE305", time: "5 mins ago" },
    { title: "Reminder: Faculty Meeting", time: "1 hour ago" },
  ]);

  return (
    <div className="flex h-screen">
      {/* Main content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {/* Top bar */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[#244855]">Faculty Dashboard</h1>

          <div className="flex items-center gap-4">
            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger className="relative">
                <Bell className="text-[#244855]" />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
                    {notifications.length}
                  </span>
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-72">
                {notifications.map((n, idx) => (
                  <DropdownMenuItem key={idx}>
                    <div>
                      <p className="font-medium">{n.title}</p>
                      <p className="text-sm text-gray-500">{n.time}</p>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Account Settings */}
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Settings className="text-[#244855]" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => navigate("/faculty/account-settings")}>
                  Account Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/")}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Dashboard Content */}
        {children}
      </main>
    </div>
  );
};

export default FacultyLayout;
