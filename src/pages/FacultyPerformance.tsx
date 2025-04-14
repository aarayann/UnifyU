import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useUser } from '@supabase/auth-helpers-react';

interface PerformanceEntry {
  uid: string;
  name: string;
  course_name: string;
  assignments_score: number;
  quizzes_score: number;
  exams_score: number;
  overall_grade: string;
}

export default function FacultyPerformance() {
  const user = useUser();
  const [groupedPerformance, setGroupedPerformance] = useState<Record<string, PerformanceEntry[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPerformance = async () => {
      if (!user) return;
      setLoading(true);

      const { data: mappings } = await supabase
        .from('faculty_student_map')
        .select('student_id, course_name')
        .eq('faculty_id', user.id);

      if (!mappings || mappings.length === 0) {
        setLoading(false);
        return;
      }

      const studentIds = [...new Set(mappings.map((m) => m.student_id))];

      const { data: performances } = await supabase
        .from('performance_metrics')
        .select('*')
        .in('uid', studentIds);

      const { data: users } = await supabase
        .from('login_users')
        .select('uid, name')
        .in('uid', studentIds);

      const uidToName: Record<string, string> = {};
      users?.forEach((u) => {
        uidToName[u.uid] = u.name;
      });

      const mappingSet = new Set(mappings.map((m) => `${m.student_id}-${m.course_name}`));

      const finalData: PerformanceEntry[] = (performances || [])
        .filter((p) => mappingSet.has(`${p.uid}-${p.course_name}`))
        .map((entry) => ({
          ...entry,
          name: uidToName[entry.uid] || `Unknown (${entry.uid})`,
        }));

      const grouped: Record<string, PerformanceEntry[]> = {};
      finalData.forEach((entry) => {
        if (!grouped[entry.uid]) {
          grouped[entry.uid] = [];
        }
        grouped[entry.uid].push(entry);
      });

      setGroupedPerformance(grouped);
      setLoading(false);
    };

    fetchPerformance();
  }, [user]);

  const getGradeColor = (grade: string) => {
    if (grade === 'A+' || grade === 'A') return 'bg-green-500';
    if (grade === 'B+' || grade === 'B') return 'bg-yellow-400';
    return 'bg-red-500';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-4xl font-bold mb-6 text-center text-indigo-700">📊 Student Performance Overview</h1>

      {loading ? (
        <div className="text-center text-lg text-gray-600">Loading performance data...</div>
      ) : Object.keys(groupedPerformance).length === 0 ? (
        <p className="text-center text-gray-500">No performance records found for your assigned students.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {Object.entries(groupedPerformance).map(([uid, courses]) => (
            <div
              key={uid}
              className="bg-white rounded-xl shadow-md border hover:shadow-lg transition-all duration-200 p-6"
            >
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">{courses[0]?.name}</h3>

              {courses.map((course, index) => (
                <div
                  key={`${course.course_name}-${index}`}
                  className="bg-gray-50 rounded-lg p-4 mb-3 shadow-sm border"
                >
                  <h4 className="text-lg font-bold text-indigo-600 mb-1">{course.course_name}</h4>

                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span className="text-gray-700">Assignments:</span>
                      <span className="font-medium">{course.assignments_score}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Quizzes:</span>
                      <span className="font-medium">{course.quizzes_score}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Exams:</span>
                      <span className="font-medium">{course.exams_score}</span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-gray-700 font-semibold">Grade:</span>
                      <span
                        className={`text-white px-3 py-1 rounded-full text-xs font-bold ${getGradeColor(
                          course.overall_grade
                        )}`}
                      >
                        {course.overall_grade}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
