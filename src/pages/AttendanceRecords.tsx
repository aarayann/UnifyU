// src/pages/AttendanceRecords.tsx or wherever appropriate
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface AttendanceRecord {
  id: string;
  uid: string;
  course_name: string;
  total_classes: number;
  attended_classes: number;
  created_at: string;
}

const AttendanceRecords = () => {
  const [attendanceData, setAttendanceData] = useState<AttendanceRecord[]>([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      setLoading(true);
      const {
        data: { user },
        error: userError
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error('User not logged in:', userError);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('attendance_records')
        .select('*')
        .eq('uid', user.id);

      if (error) {
        console.error('Error fetching attendance data:', error.message);
      } else {
        setAttendanceData(data);
      }
      setLoading(false);
    };

    fetchAttendanceData();
  }, []);

  const filteredData = attendanceData.filter(record =>
    record.course_name.toLowerCase().includes(filter.toLowerCase())
  );

  const chartData = {
    labels: filteredData.map(record => record.course_name),
    datasets: [
      {
        label: 'Attendance %',
        data: filteredData.map(record =>
          record.total_classes > 0
            ? ((record.attended_classes / record.total_classes) * 100).toFixed(2)
            : 0
        ),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: 'Attendance Overview' },
    },
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Attendance Records</h1>

      <input
        type="text"
        placeholder="Filter by course name"
        value={filter}
        onChange={e => setFilter(e.target.value)}
        className="mb-6 px-4 py-2 border rounded w-full md:w-1/2"
      />

      {loading ? (
        <p>Loading attendance records...</p>
      ) : filteredData.length === 0 ? (
        <p>No records found.</p>
      ) : (
        <>
          <Bar data={chartData} options={chartOptions} />

          <div className="mt-8 overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 shadow-md rounded">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">Course Name</th>
                  <th className="px-4 py-2 text-left">Attended Classes</th>
                  <th className="px-4 py-2 text-left">Total Classes</th>
                  <th className="px-4 py-2 text-left">Attendance %</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((record) => (
                  <tr key={record.id} className="border-t">
                    <td className="px-4 py-2">{record.course_name}</td>
                    <td className="px-4 py-2">{record.attended_classes}</td>
                    <td className="px-4 py-2">{record.total_classes}</td>
                    <td className="px-4 py-2">
                      {record.total_classes > 0
                        ? ((record.attended_classes / record.total_classes) * 100).toFixed(2)
                        : 0}
                      %
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default AttendanceRecords;
