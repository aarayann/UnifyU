import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useUser } from '@supabase/auth-helpers-react';

interface Student {
  uid: string;
  name: string;
  email: string;
}

interface AttendanceRecord {
  id: string;
  student_id: string;
  status: string;
}

const FacultyAttendance: React.FC = () => {
  const user = useUser();
  const [students, setStudents] = useState<Student[]>([]);
  const [courseNames, setCourseNames] = useState<string[]>([]);
  const [courseName, setCourseName] = useState('');
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [attendance, setAttendance] = useState<Record<string, boolean>>({});
  const [existingAttendance, setExistingAttendance] = useState<AttendanceRecord[]>([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchCourseNames();
  }, []);

  useEffect(() => {
    if (courseName) fetchStudentsForCourse(courseName);
  }, [courseName]);

  useEffect(() => {
    if (courseName && selectedDate) {
      fetchExistingAttendance(courseName, selectedDate);
    }
  }, [courseName, selectedDate]);

  const fetchCourseNames = async () => {
    const { data, error } = await supabase
      .from('performance_metrics')
      .select('course_name');

    if (!error && data) {
      const uniqueCourses = Array.from(new Set(data.map((d) => d.course_name)));
      setCourseNames(uniqueCourses);
    }
  };

  const fetchStudentsForCourse = async (course: string) => {
    const { data: perfData } = await supabase
      .from('performance_metrics')
      .select('uid')
      .eq('course_name', course);

    const uids = perfData?.map((d) => d.uid) || [];

    const { data: studentData } = await supabase
      .from('login_users')
      .select('uid, name, email')
      .in('uid', uids)
      .eq('user_type', 'student');

    if (studentData) {
      setStudents(studentData);
    }
  };

  const fetchExistingAttendance = async (course: string, date: string) => {
    const { data, error } = await supabase
      .from('daily_attendance')
      .select('id, student_id, status')
      .eq('course_name', course)
      .eq('date', date);

    if (!error && data) {
      setExistingAttendance(data);
      const updated = data.reduce((acc, rec) => {
        acc[rec.student_id] = rec.status === 'present';
        return acc;
      }, {} as Record<string, boolean>);
      setAttendance(updated);
    } else {
      setExistingAttendance([]);
      setAttendance({});
    }
  };

  const toggleAttendance = (studentId: string) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: !prev[studentId],
    }));
  };

  const handleSubmit = async () => {
    if (!user || !courseName || !selectedDate) {
      setMessage('Please fill in all fields.');
      return;
    }

    const updates = [];
    const inserts = [];

    for (const student of students) {
      const isPresent = !!attendance[student.uid];
      const existing = existingAttendance.find((a) => a.student_id === student.uid);

      if (existing) {
        updates.push({
          id: existing.id,
          status: isPresent ? 'present' : 'absent',
        });
      } else {
        inserts.push({
          faculty_id: user.id,
          student_id: student.uid,
          course_name: courseName,
          date: selectedDate,
          status: isPresent ? 'present' : 'absent',
        });
      }
    }

    if (updates.length > 0) {
      for (const record of updates) {
        await supabase
          .from('daily_attendance')
          .update({ status: record.status })
          .eq('id', record.id);
      }
    }

    if (inserts.length > 0) {
      await supabase.from('daily_attendance').insert(inserts);
    }

    setMessage('Attendance submitted/updated successfully!');
    fetchExistingAttendance(courseName, selectedDate); // Refresh
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Faculty Attendance</h1>

      <select
        value={courseName}
        onChange={(e) => setCourseName(e.target.value)}
        className="border p-2 mb-4 w-full rounded"
      >
        <option value="">Select Course</option>
        {courseNames.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>

      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        className="border p-2 mb-4 w-full rounded"
      />

      {students.map((student) => (
        <div
          key={student.uid}
          className="flex items-center justify-between border rounded p-3 mb-2"
        >
          <div>
            <p className="font-medium">{student.name || student.email}</p>
            <p className="text-sm text-gray-500">{student.email}</p>
          </div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={!!attendance[student.uid]}
              onChange={() => toggleAttendance(student.uid)}
              className="w-5 h-5"
            />
            <span>{attendance[student.uid] ? 'Present' : 'Absent'}</span>
          </label>
        </div>
      ))}

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-6 py-2 mt-4 rounded hover:bg-blue-700"
      >
        Submit Attendance
      </button>

      {message && <p className="mt-4 text-center text-sm">{message}</p>}

      {existingAttendance.length > 0 && (
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-2">Previously Marked Attendance</h2>
          <table className="min-w-full border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-3 py-2">Student</th>
                <th className="border px-3 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {existingAttendance.map((rec) => {
                const student = students.find((s) => s.uid === rec.student_id);
                return (
                  <tr key={rec.id}>
                    <td className="border px-3 py-2">{student?.name || rec.student_id}</td>
                    <td className="border px-3 py-2 capitalize">{rec.status}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FacultyAttendance;
