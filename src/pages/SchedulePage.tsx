import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useUser } from '@supabase/auth-helpers-react';

interface ClassSchedule {
  id: string;
  course_name: string;
  start_time: string;
  end_time: string;
  location: string;
}

interface Student {
  uid: string;
  name: string | null;
  course_name: string;
}

type AttendanceStatus = 'present' | 'absent';

export default function SchedulePage() {
  const user = useUser();
  const [upcoming, setUpcoming] = useState<ClassSchedule[]>([]);
  const [completed, setCompleted] = useState<ClassSchedule[]>([]);
  const [studentsByCourse, setStudentsByCourse] = useState<Record<string, Student[]>>({});
  const [attendanceMarked, setAttendanceMarked] = useState<Record<string, boolean>>({});
  const [attendanceStatus, setAttendanceStatus] = useState<Record<string, Record<string, AttendanceStatus>>>({});

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toISOString().split('T')[0]; // yyyy-mm-dd for database compatibility
  };

  useEffect(() => {
    const fetchSchedule = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from('class_schedule')
        .select('*')
        .eq('faculty_id', user.id)
        .order('start_time', { ascending: true });

      if (!error && data) {
        const now = new Date();
        const upcomingClasses = data.filter(cls => new Date(cls.start_time) > now);
        const completedClasses = data.filter(cls => new Date(cls.end_time) <= now);

        setUpcoming(upcomingClasses);
        setCompleted(completedClasses);
      } else {
        console.error('Error fetching schedule:', error);
      }
    };

    const fetchStudents = async () => {
      const { data: allStudents, error } = await supabase
        .from('performance_metrics')
        .select(`
          uid,
          course_name,
          login_users(name)
        `);

      if (error || !allStudents) {
        console.error('Error fetching students:', error);
        return;
      }

      const grouped: Record<string, Student[]> = {};
      allStudents.forEach((entry: any) => {
        if (!grouped[entry.course_name]) grouped[entry.course_name] = [];
        grouped[entry.course_name].push({
          uid: entry.uid,
          course_name: entry.course_name,
          name: entry.login_users?.name ?? null,
        });
      });

      setStudentsByCourse(grouped);
    };

    fetchSchedule();
    fetchStudents();
  }, [user]);

  const handleStatusChange = (course: string, studentId: string, status: AttendanceStatus) => {
    setAttendanceStatus(prev => ({
      ...prev,
      [course]: {
        ...(prev[course] || {}),
        [studentId]: status
      }
    }));
  };

  const submitAttendance = async (course_name: string, classDate: string) => {
    const students = studentsByCourse[course_name];
    if (!students || students.length === 0 || !user) return;

    const entries = students.map(student => ({
      uid: student.uid,
      course_name,
      class_date: classDate,
      status: attendanceStatus[course_name]?.[student.uid] || 'absent'
    }));

    const { error } = await supabase
      .from('daily_attendance')
      .upsert(entries, {
        onConflict: 'uid,course_name,class_date'
      });

    if (!error) {
      alert(`Attendance submitted for ${course_name}`);
      setAttendanceMarked(prev => ({ ...prev, [course_name + classDate]: true }));
    } else {
      console.error('Error submitting attendance:', error.message);
    }
  };

  const renderClassCard = (cls: ClassSchedule, isUpcoming: boolean) => {
    const dateKey = formatDate(cls.start_time);
    const courseStudents = studentsByCourse[cls.course_name] || [];
  
    const handleMarkAll = (status: AttendanceStatus) => {
      const updated: Record<string, AttendanceStatus> = {};
      courseStudents.forEach(student => {
        updated[student.uid] = status;
      });
  
      setAttendanceStatus(prev => ({
        ...prev,
        [cls.course_name]: {
          ...(prev[cls.course_name] || {}),
          ...updated
        }
      }));
    };
  
    return (
      <li key={cls.id} className={`border rounded p-4 shadow-sm ${isUpcoming ? 'bg-green-50' : 'bg-gray-100'}`}>
        <h3 className="font-bold text-lg">{cls.course_name}</h3>
        <p className="text-sm">
          {new Date(cls.start_time).toLocaleDateString('en-GB')} | {new Date(cls.start_time).toLocaleTimeString()} - {new Date(cls.end_time).toLocaleTimeString()}
        </p>
        {cls.location && <p className="text-sm text-gray-600">📍 {cls.location}</p>}
        {isUpcoming && courseStudents.length > 0 && (
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Mark Attendance:</h4>
  
            {/* ✅ Mark all buttons */}
            {!attendanceMarked[cls.course_name + dateKey] && (
              <div className="flex gap-4 mb-4">
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
                  onClick={() => handleMarkAll('present')}
                >
                  Mark All Present
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                  onClick={() => handleMarkAll('absent')}
                >
                  Mark All Absent
                </button>
              </div>
            )}
  
            <ul className="mb-4 space-y-2">
              {courseStudents.map(s => {
                const status = attendanceStatus[cls.course_name]?.[s.uid] || 'absent';
                return (
                  <li key={s.uid} className="flex items-center justify-between">
                    <span className="text-sm">{s.name || s.uid}</span>
                    <div className="space-x-2">
                      <button
                        className={`px-3 py-1 rounded text-sm ${status === 'present' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
                        onClick={() => handleStatusChange(cls.course_name, s.uid, 'present')}
                        disabled={attendanceMarked[cls.course_name + dateKey]}
                      >
                        Present
                      </button>
                      <button
                        className={`px-3 py-1 rounded text-sm ${status === 'absent' ? 'bg-red-600 text-white' : 'bg-gray-200'}`}
                        onClick={() => handleStatusChange(cls.course_name, s.uid, 'absent')}
                        disabled={attendanceMarked[cls.course_name + dateKey]}
                      >
                        Absent
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
  
            {!attendanceMarked[cls.course_name + dateKey] ? (
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded"
                onClick={() => submitAttendance(cls.course_name, dateKey)}
              >
                Submit Attendance
              </button>
            ) : (
              <p className="text-green-600 font-medium">Attendance submitted ✔️</p>
            )}
          </div>
        )}
      </li>
    );
  };  

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">📚 Class Schedule</h1>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">📅 Upcoming Classes</h2>
        {upcoming.length === 0 ? (
          <p className="text-gray-600">No upcoming classes.</p>
        ) : (
          <ul className="space-y-4">
            {upcoming.map(cls => renderClassCard(cls, true))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-3">✅ Completed Classes</h2>
        {completed.length === 0 ? (
          <p className="text-gray-600">No completed classes yet.</p>
        ) : (
          <ul className="space-y-4">
            {completed.map(cls => renderClassCard(cls, false))}
          </ul>
        )}
      </section>
    </div>
  );
}
