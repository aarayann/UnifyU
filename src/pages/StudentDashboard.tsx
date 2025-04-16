
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AttendanceRecord {
  id: string;
  subject_code: string;
  subject_name: string;
  status: string;
  date: string;
}

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [attendanceData, setAttendanceData] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all, present, absent

  const fetchAttendanceData = async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      const { data, error } = await supabase
        .from("student_attendance")
        .select("*")
        .eq("student_id", user.id)
        .order('date', { ascending: false });

      if (error) {
        console.error("Error fetching attendance:", error.message);
      } else {
        setAttendanceData(data || []);
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchAttendanceData();
  }, []);

  const filteredAttendance = attendanceData.filter(record => {
    if (filter === "all") return true;
    return record.status === filter;
  });

  const getAttendanceStats = () => {
    const total = attendanceData.length;
    const present = attendanceData.filter(record => record.status === "present").length;
    const absent = attendanceData.filter(record => record.status === "absent").length;
    
    const presentPercentage = total > 0 ? Math.round((present / total) * 100) : 0;
    
    return { total, present, absent, presentPercentage };
  };

  const { total, present, absent, presentPercentage } = getAttendanceStats();

  const getStatusColor = (status: string) => {
    return status === "present" ? "bg-green-500" : "bg-red-500";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-[#244855] mb-8">Student Dashboard</h1>
        
        <div className="mb-8">
          <Card>
            <CardHeader className="bg-[#244855]/5 pb-2">
              <CardTitle className="text-xl text-[#244855]">Attendance Overview</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <p className="text-sm text-gray-500 mb-1">Total Classes</p>
                  <p className="text-2xl font-bold">{total}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <p className="text-sm text-gray-500 mb-1">Present</p>
                  <p className="text-2xl font-bold text-green-600">{present}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <p className="text-sm text-gray-500 mb-1">Absent</p>
                  <p className="text-2xl font-bold text-red-600">{absent}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <p className="mb-2 font-medium">Attendance Rate: <span className={presentPercentage >= 75 ? "text-green-600" : "text-red-600"}>{presentPercentage}%</span></p>
                <div className="w-full bg-gray-200 rounded-full h-4 mb-1">
                  <div 
                    className={`h-4 rounded-full ${presentPercentage >= 75 ? "bg-green-500" : "bg-red-500"}`} 
                    style={{ width: `${presentPercentage}%` }}
                  ></div>
                </div>
                {presentPercentage < 75 && (
                  <p className="text-sm text-red-500">Your attendance is below the required 75% threshold.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader className="bg-[#244855]/5 pb-2">
              <CardTitle className="text-xl text-[#244855]">Recent Attendance</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="all" onClick={() => setFilter("all")}>All</TabsTrigger>
                  <TabsTrigger value="present" onClick={() => setFilter("present")}>Present</TabsTrigger>
                  <TabsTrigger value="absent" onClick={() => setFilter("absent")}>Absent</TabsTrigger>
                </TabsList>
                
                <TabsContent value={filter} className="mt-0">
                  {loading ? (
                    <div className="text-center py-8">
                      <p>Loading attendance records...</p>
                    </div>
                  ) : filteredAttendance.length === 0 ? (
                    <div className="text-center py-8">
                      <p>No attendance records found.</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-gray-50 text-gray-600">
                            <th className="px-4 py-3 text-left">Date</th>
                            <th className="px-4 py-3 text-left">Subject</th>
                            <th className="px-4 py-3 text-left">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {filteredAttendance.map((record) => (
                            <tr key={record.id} className="hover:bg-gray-50">
                              <td className="px-4 py-3">{formatDate(record.date)}</td>
                              <td className="px-4 py-3">
                                <div className="font-medium">{record.subject_name}</div>
                                <div className="text-sm text-gray-500">{record.subject_code}</div>
                              </td>
                              <td className="px-4 py-3">
                                <span className={`inline-block px-3 py-1 rounded-full text-xs text-white ${getStatusColor(record.status)}`}>
                                  {record.status === "present" ? "Present" : "Absent"}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
