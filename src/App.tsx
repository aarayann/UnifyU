import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { supabase } from "@/lib/supabaseClient"; // Make sure this path is correct

// ... your other imports ...
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Faculties from "./pages/Faculties";
import StudentDashboard from "./pages/StudentDashboard";
import NotFound from "./pages/NotFound";
import Bennett from "./pages/Bennett";
import Events from "./pages/Events";
import AttendanceRecords from "./pages/AttendanceRecords";
import PerformanceMetrics from "./pages/PerformanceMetrics";
import DiscussionForums from "./pages/DiscussionForums";
import LiveCalendar from "./pages/LiveCalendar";
import Resources from "./pages/Resources";
import AccountSettings from "./pages/AccountSettings";
import CreateForum from "./pages/CreateForum";
import FacultyLayout from "./components/FacultyLayout";
import FacultyDashboard from "./pages/FacultyDashboard";
import FacultyAttendance from "./pages/FacultyAttendance";
import SchedulePage from "./pages/SchedulePage";
import FacultyPerformancePage from "./pages/FacultyPerformance";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { path: "/", element: <Index /> },
      { path: "/auth", element: <Auth /> },
      { path: "/faculties", element: <Faculties /> },
      { path: "/student-dashboard", element: <StudentDashboard /> },
      { path: "/bennett", element: <Bennett /> },
      { path: "/events", element: <Events /> },
      { path: "/attendance-records", element: <AttendanceRecords /> },
      { path: "/performance-metrics", element: <PerformanceMetrics /> },
      { path: "/discussion-forums", element: <DiscussionForums /> },
      { path: "/create-forum", element: <CreateForum /> },
      { path: "/live-calendar", element: <LiveCalendar /> },
      { path: "/resources", element: <Resources /> },
      { path: "/account-settings", element: <AccountSettings /> },
    ],
  },
  {
    path: "/faculty",
    element: <FacultyLayout />,
    children: [
      { path: "dashboard", element: <FacultyDashboard /> },
      { path: "attendance", element: <FacultyAttendance /> },
      { path: "schedule", element: <SchedulePage /> },
      { path: "assessments", element: <PerformanceMetrics /> },
      { path: "performance", element: <FacultyPerformancePage /> },
      { path: "forums", element: <DiscussionForums /> },
      { path: "create-forum", element: <CreateForum /> },
      { path: "resources", element: <Resources /> },
      { path: "account-settings", element: <AccountSettings /> },
    ],
  },
]);

const App = () => {
  return (
    <React.StrictMode>
      <SessionContextProvider supabaseClient={supabase}>
        <RouterProvider router={router} />
      </SessionContextProvider>
    </React.StrictMode>
  );
};

export default App;
