import { useState } from "react";
import Login from "./components/Login";
import AdminDashboard from "./pages/AdminDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import FacultyDashboard from "./pages/FacultyDashboard";
import "./App.css";

function App() {
  const [userRole, setUserRole] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [userName, setUserName] = useState(null);

  const handleLogin = (role, email, name) => {
    setUserRole(role);
    setUserEmail(email);
    setUserName(name);
  };

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/api/logout", {
        method: "POST",
        credentials: "include",
      });
      setUserRole(null);
      setUserEmail(null);
      setUserName(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (!userRole) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app">
      {userRole === "admin" && (
        <AdminDashboard
          email={userEmail}
          name={userName}
          onLogout={handleLogout}
        />
      )}
      {userRole === "student" && (
        <StudentDashboard
          email={userEmail}
          name={userName}
          onLogout={handleLogout}
        />
      )}
      {userRole === "faculty" && (
        <FacultyDashboard
          email={userEmail}
          name={userName}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
}

export default App;
