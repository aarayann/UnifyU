import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Faculties from "./pages/Faculties";
import FacultyDashboard from "./pages/FacultyDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import NotFound from "./pages/NotFound";
import Bennett from "./pages/Bennett";
import Events from "./pages/Events";
import AttendanceRecords from "./pages/AttendanceRecords";
import PerformanceMetrics from "./pages/PerformanceMetrics";
import DiscussionForums from "./pages/DiscussionForums";
import Resources from "./pages/Resources";
import AccountSettings from "./pages/AccountSettings"; 
import CreateForum from "./pages/CreateForum";
import { AuthProvider } from "@/context/AuthContext";
import UpcomingClasses from "./pages/UpcomingClasses";
import MeetSetup from "./pages/MeetSetup";
import GradeAssignments from "./pages/GradeAssignments";
import ArchivedForums from "./pages/ArchivedForums";

// Define router outside of component to avoid recreating on each render
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Index />,
      },
      {
        path: "/auth",
        element: <Auth />,
      },
      {
        path: "/faculties",
        element: <Faculties />,
      },
      {
        path: "/faculty-dashboard",
        element: <FacultyDashboard />,
      },
      {
        path: "/student-dashboard",
        element: <StudentDashboard />,
      },
      {
        path: "/bennett",
        element: <Bennett />,
      },
      {
        path: "/events",
        element: <Events />,
      },
      {
        path: "/attendance-records",
        element: <AttendanceRecords />,
      },
      {
        path: "/performance-metrics",
        element: <PerformanceMetrics />,
      },
      {
        path: "/discussion-forums",
        element: <DiscussionForums />,
      },
      {
        path: "/archived-forums",
        element: <ArchivedForums />,
      },
      {
        path: "/create-forum",
        element: <CreateForum />,
      },
      {
        path: "/resources",
        element: <Resources />,
      },
      {
        path: "/account-settings",
        element: <AccountSettings />,
      },
      {
        path: "/upcoming-classes",
        element: <UpcomingClasses />,
      },
      {
        path: "/meet-setup",
        element: <MeetSetup />,
      },
      {
        path: "/grade-assignments",
        element: <GradeAssignments />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
