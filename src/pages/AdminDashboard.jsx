import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AdminDashboard.css";
import DepartmentManagement from "./DepartmentManagement";
import CourseManagement from "./CourseManagement";
import StudentManagement from "./StudentManagement";
import FacultyManagement from "./FacultyManagement";

const AdminDashboard = ({ email, name, onLogout }) => {
  const [currentView, setCurrentView] = useState(null);
  const navigate = useNavigate();

  const academicFunctions = [
    {
      title: "Student Management",
      description: "Manage student records, enrollments, and academic progress",
      icon: "👥",
      view: "student-management",
    },
    {
      title: "Faculty Management",
      description: "Manage faculty profiles, assignments, and schedules",
      icon: "👨‍🏫",
      view: "faculty-management",
    },
    {
      title: "Department Management",
      description: "Manage academic departments and programs",
      icon: "🏛️",
      view: "department-management",
    },
    {
      title: "Course Management",
      description: "Manage courses, assignments, and materials",
      icon: "📚",
      view: "course-management",
    },
    {
      title: "Program Management",
      description: "Manage academic programs and degrees",
      icon: "🎓",
    },
  ];

  const managementFunctions = [
    {
      title: "Admission Management",
      description: "Process and track student admissions",
      icon: "📝",
    },
    {
      title: "Timetable Scheduling",
      description: "Create and manage class schedules",
      icon: "📅",
    },
    {
      title: "Examination Management",
      description: "Handle exams and assessments",
      icon: "✍️",
    },
    {
      title: "Result Management",
      description: "Process and publish academic results",
      icon: "📊",
    },
    {
      title: "Fee & Finance",
      description: "Manage fees, payments, and finances",
      icon: "💰",
    },
  ];

  const handleFunctionClick = (view) => {
    setCurrentView(view);
  };

  const renderContent = () => {
    switch (currentView) {
      case "student-management":
        return <StudentManagement />;
      case "faculty-management":
        return <FacultyManagement />;
      case "department-management":
        return <DepartmentManagement />;
      case "course-management":
        return <CourseManagement />;
      default:
        return (
          <div className="admin-dashboard">
            <header className="dashboard-header">
              <div className="user-info">
                <h2>Welcome, {name}</h2>
                <p>{email}</p>
              </div>
              <button className="logout-btn" onClick={onLogout}>
                Logout
              </button>
            </header>

            <div className="dashboard-content">
              <h1>Academic Management</h1>
              <div className="function-grid">
                {academicFunctions.map((func, index) => (
                  <div
                    key={index}
                    className="function-card"
                    onClick={() => handleFunctionClick(func.view)}
                  >
                    <div className="function-icon">{func.icon}</div>
                    <h3>{func.title}</h3>
                    <p>{func.description}</p>
                  </div>
                ))}
              </div>

              <h1>Administrative Management</h1>
              <div className="function-grid">
                {managementFunctions.map((func, index) => (
                  <div
                    key={index}
                    className="function-card"
                    onClick={() => handleFunctionClick(func.view)}
                  >
                    <div className="function-icon">{func.icon}</div>
                    <h3>{func.title}</h3>
                    <p>{func.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
    }
  };

  return renderContent();
};

export default AdminDashboard;
