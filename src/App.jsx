import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import AdminDashboard from "./pages/AdminDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import FacultyDashboard from "./pages/FacultyDashboard";
import StudentManagement from "./pages/StudentManagement";
import FacultyManagement from "./pages/FacultyManagement";
import DepartmentManagement from "./pages/DepartmentManagement";
import AssignedCourses from "./pages/AssignedCourses";
import ManageAssignments from "./pages/ManageAssignments";
import EnrolledCourses from "./pages/EnrolledCourses";
import "./App.css";

function App() {
  const [userRole, setUserRole] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [userName, setUserName] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check session status on component mount and periodically
  useEffect(() => {
    const checkSession = async () => {
      if (!userRole) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/profile", {
          credentials: "include",
        });

        if (!response.ok) {
          console.log("Session invalid, logging out");
          handleLogout();
        }
      } catch (error) {
        console.error("Session check error:", error);
        handleLogout();
      } finally {
        setIsLoading(false);
      }
    };

    // Check session immediately
    checkSession();

    // Set up periodic session check
    const intervalId = setInterval(checkSession, 5 * 60 * 1000); // Check every 5 minutes

    return () => clearInterval(intervalId);
  }, [userRole]);

  const handleLogin = (role, email, name) => {
    setUserRole(role);
    setUserEmail(email);
    setUserName(name);
    setIsLoading(false);
  };

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/api/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUserRole(null);
      setUserEmail(null);
      setUserName(null);
      localStorage.removeItem("user");
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="app">
        <Routes>
          {/* Login Route */}
          <Route
            path="/login"
            element={
              !userRole ? (
                <Login onLogin={handleLogin} />
              ) : (
                <Navigate
                  to={
                    userRole === "admin"
                      ? "/admin-dashboard"
                      : userRole === "student"
                      ? "/student-dashboard"
                      : "/faculty-dashboard"
                  }
                  replace
                />
              )
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin-dashboard"
            element={
              userRole === "admin" ? (
                <AdminDashboard
                  email={userEmail}
                  name={userName}
                  onLogout={handleLogout}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/student-management"
            element={
              userRole === "admin" ? (
                <StudentManagement />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/faculty-management"
            element={
              userRole === "admin" ? (
                <FacultyManagement />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/department-management"
            element={
              userRole === "admin" ? (
                <DepartmentManagement />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Student Routes */}
          <Route
            path="/student-dashboard"
            element={
              userRole === "student" ? (
                <StudentDashboard
                  email={userEmail}
                  name={userName}
                  onLogout={handleLogout}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Faculty Routes */}
          <Route
            path="/faculty-dashboard"
            element={
              userRole === "faculty" ? (
                <FacultyDashboard
                  email={userEmail}
                  name={userName}
                  onLogout={handleLogout}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Manage Assignments Route */}
          <Route
            path="/manage-assignments"
            element={
              userRole === "faculty" ? (
                <ManageAssignments />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Assigned Courses Route */}
          <Route
            path="/assigned-courses/:facultyId"
            element={
              userRole === "faculty" ? (
                <AssignedCourses />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Enrolled Courses Route */}
          <Route
            path="/enrolled-courses/:studentId"
            element={
              userRole === "student" ? (
                <EnrolledCourses />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Default Route */}
          <Route
            path="/"
            element={
              userRole ? (
                <Navigate
                  to={
                    userRole === "admin"
                      ? "/admin-dashboard"
                      : userRole === "student"
                      ? "/student-dashboard"
                      : "/faculty-dashboard"
                  }
                  replace
                />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
