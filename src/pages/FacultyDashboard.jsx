import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";
import "../styles/FacultyDashboard.css";

function FacultyDashboard() {
  const [name, setName] = useState("");
  const [facultyId, setFacultyId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/profile", {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setName(data.name);
          setFacultyId(data.id);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  const courseManagementFunctions = [
    {
      title: "View Assigned Courses",
      description: "View and manage your course assignments",
      icon: "📚",
      onClick: () => navigate(`/assigned-courses/${facultyId}`),
    },
    {
      title: "Manage Assignments",
      description: "Create and manage course assignments",
      icon: "📋",
      onClick: () => navigate("/manage-assignments"),
    },
  ];

  const attendanceFunctions = [
    {
      title: "Mark Attendance",
      description: "Record student attendance for your classes",
      icon: "✅",
    },
    {
      title: "View Attendance Records",
      description: "View and analyze attendance history",
      icon: "📊",
    },
  ];

  const gradingFunctions = [
    {
      title: "Upload Grades",
      description: "Submit and manage student grades",
      icon: "📈",
    },
    {
      title: "Grade Reports",
      description: "View and generate grade reports",
      icon: "📑",
    },
  ];

  return (
    <div className="dashboard faculty-dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Faculty Dashboard</h1>
        <div className="user-profile">
          <div className="profile-icon">{getInitials(name)}</div>
          <span className="user-name">{name}</span>
        </div>
      </div>

      <div className="dashboard-grid">
        <h2 className="section-title">Course Management</h2>
        {courseManagementFunctions.map((func, index) => (
          <div
            key={index}
            className="function-card course-section"
            onClick={func.onClick}
            style={{ cursor: func.onClick ? "pointer" : "default" }}
          >
            <div className="function-icon">{func.icon}</div>
            <div className="function-info">
              <h3 className="function-title">{func.title}</h3>
              <p className="function-description">{func.description}</p>
            </div>
          </div>
        ))}

        <h2 className="section-title">Attendance Management</h2>
        {attendanceFunctions.map((func, index) => (
          <div key={index} className="function-card attendance-section">
            <div className="function-icon">{func.icon}</div>
            <div className="function-info">
              <h3 className="function-title">{func.title}</h3>
              <p className="function-description">{func.description}</p>
            </div>
          </div>
        ))}

        <h2 className="section-title">Grading System</h2>
        {gradingFunctions.map((func, index) => (
          <div key={index} className="function-card grading-section">
            <div className="function-icon">{func.icon}</div>
            <div className="function-info">
              <h3 className="function-title">{func.title}</h3>
              <p className="function-description">{func.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FacultyDashboard;
