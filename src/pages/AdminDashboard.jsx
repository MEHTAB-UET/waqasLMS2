import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AdminDashboard.css";
import DepartmentManagement from "./DepartmentManagement";
import CourseManagement from "./CourseManagement";
import StudentManagement from "./StudentManagement";
import FacultyManagement from "./FacultyManagement";
import ProgramManagement from "./ProgramManagement";
import AdmissionManagement from "./AdmissionManagement";

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
      view: "program-management",
    },
    {
      title: "Admission Management",
      description: "Manage student admissions and applications",
      icon: "📝",
      view: "admission-management",
    },
  ];

  const managementFunctions = [
    {
      title: "Attendance Management",
      description: "Track and manage student and faculty attendance",
      icon: "📊",
      view: "attendance-management",
    },
    {
      title: "Fee Management",
      description: "Manage student fees, payments, and financial records",
      icon: "💰",
      view: "fee-management",
    },
    {
      title: "Exam Management",
      description: "Schedule and manage exams, results, and grading",
      icon: "📝",
      view: "exam-management",
    },
    {
      title: "Library Management",
      description: "Manage library resources, books, and borrowing",
      icon: "📚",
      view: "library-management",
    },
    {
      title: "Hostel Management",
      description: "Manage hostel facilities, rooms, and residents",
      icon: "🏠",
      view: "hostel-management",
    },
    {
      title: "Transport Management",
      description: "Manage transportation services and routes",
      icon: "🚌",
      view: "transport-management",
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
      case "program-management":
        return <ProgramManagement />;
      case "admission-management":
        return <AdmissionManagement />;
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
