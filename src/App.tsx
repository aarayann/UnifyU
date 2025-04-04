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

const App = () => {
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
      ],
    },
  ]);

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};

export default App;
