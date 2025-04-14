// components/FacultyAttendanceModalContent.tsx
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const FacultyAttendanceModalContent = ({ course, date, onClose }: {
  course: string;
  date: string;
  onClose: () => void;
}) => {
  const [students, setStudents] = useState<any[]>([]);
  const [attendance, setAttendance] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchStudents = async () => {
      const { data, error } = await supabase
        .from("performance_metrics")
        .select("uid, login_users(name)")
        .eq("course_name", course);

      if (error) {
        console.error(error);
        return;
      }

      setStudents(data);
      const attendanceRes = await supabase
        .from("daily_attendance")
        .select("uid, status")
        .eq("course_name", course)
        .eq("class_date", date);

      if (!attendanceRes.error && attendanceRes.data) {
        const record = Object.fromEntries(
          attendanceRes.data.map((item: any) => [item.uid, item.status === "present"])
        );
        setAttendance(record);
      }
    };

    if (course && date) {
      fetchStudents();
    }
  }, [course, date]);

  const handleMarkAttendance = async () => {
    const updates = students.map((s) => {
      const status = attendance[s.uid] ? "present" : "absent";
      return {
        uid: s.uid,
        course_name: course,
        class_date: date,
        status,
      };
    });

    await Promise.all(
      updates.map(async (entry) => {
        await supabase
          .from("daily_attendance")
          .upsert(entry, { onConflict: "uid,course_name,class_date" });

      })
    );

    onClose(); // Close modal after submission
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">
        Mark Attendance - {course} ({date})
      </h2>
      <div className="space-y-3 max-h-[400px] overflow-y-auto">
        {students.map((s) => (
          <div key={s.uid} className="flex justify-between items-center">
            <span>{s.login_users?.name || "Unnamed Student"}</span>
            <input
              type="checkbox"
              checked={attendance[s.uid] || false}
              onChange={(e) =>
                setAttendance((prev) => ({
                  ...prev,
                  [s.uid]: e.target.checked,
                }))
              }
            />
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
        <button onClick={handleMarkAttendance} className="bg-green-500 text-white px-4 py-2 rounded">
          Submit
        </button>
      </div>
    </div>
  );
};

export default FacultyAttendanceModalContent;
