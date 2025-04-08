import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient"; // adjust path if needed
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface PerformanceMetric {
  id: string;
  course_name: string;
  assignments_score: number;
  quizzes_score: number;
  exams_score: number;
  overall_grade: string;
}

const PerformanceMetrics: React.FC = () => {
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([]);
  const [filteredMetrics, setFilteredMetrics] = useState<PerformanceMetric[]>([]);
  const [search, setSearch] = useState("");

  const fetchPerformanceMetrics = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data, error } = await supabase
      .from("performance_metrics")
      .select("*")
      .eq("uid", user.id);

    if (error) {
      console.error("Error fetching performance metrics:", error.message);
      return;
    }

    if (data) {
      setMetrics(data);
      setFilteredMetrics(data);
    }
  };

  useEffect(() => {
    fetchPerformanceMetrics();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);
    setFilteredMetrics(
      metrics.filter((metric) =>
        metric.course_name.toLowerCase().includes(query)
      )
    );
  };

  const getColorForGrade = (grade: string) => {
    switch (grade.toUpperCase()) {
      case "A":
        return "bg-green-500";
      case "B":
        return "bg-blue-500";
      case "C":
        return "bg-yellow-500";
      case "D":
        return "bg-orange-500";
      default:
        return "bg-red-500";
    }
  };

  const chartData = {
    labels: filteredMetrics.map((m) => m.course_name),
    datasets: [
      {
        label: "Assignments",
        data: filteredMetrics.map((m) => m.assignments_score),
        backgroundColor: "#3b82f6",
      },
      {
        label: "Quizzes",
        data: filteredMetrics.map((m) => m.quizzes_score),
        backgroundColor: "#10b981",
      },
      {
        label: "Exams",
        data: filteredMetrics.map((m) => m.exams_score),
        backgroundColor: "#f97316",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  return (
    <div className="w-full p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Performance Metrics</h1>

      <input
        type="text"
        placeholder="Search by course name..."
        value={search}
        onChange={handleSearchChange}
        className="mb-6 px-4 py-2 w-full max-w-md border rounded shadow-sm"
      />

      <div className="bg-white shadow-md rounded p-6 mb-10">
        <h2 className="text-xl font-semibold mb-4">Score Comparison</h2>
        <Bar data={chartData} options={chartOptions} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMetrics.map((metric) => (
          <div key={metric.id} className="bg-white p-5 rounded shadow-md border">
            <h3 className="text-lg font-bold text-gray-700 mb-2">
              {metric.course_name}
            </h3>
            <div className="text-sm text-gray-600 mb-2">
              <span className="font-semibold">Assignments:</span>{" "}
              {metric.assignments_score}%
            </div>
            <div className="text-sm text-gray-600 mb-2">
              <span className="font-semibold">Quizzes:</span>{" "}
              {metric.quizzes_score}%
            </div>
            <div className="text-sm text-gray-600 mb-2">
              <span className="font-semibold">Exams:</span> {metric.exams_score}%
            </div>
            <div
              className={`inline-block mt-3 text-white px-3 py-1 text-sm rounded-full ${getColorForGrade(
                metric.overall_grade
              )}`}
            >
              Grade: {metric.overall_grade}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerformanceMetrics;
