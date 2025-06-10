import { useState } from "react";
import "../styles/Dashboard.css";
import "../styles/AdminDashboard.css";

function AdminDashboard({ email, name, onLogout }) {
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  const academicFunctions = [
    {
      title: "Student Management",
      description: "Add, view, update, and delete student records",
      icon: "👥",
    },
    {
      title: "Faculty Management",
      description: "Manage faculty members and their details",
      icon: "👨‍🏫",
    },
    {
      title: "Staff Management",
      description: "Handle staff records and information",
      icon: "👨‍💼",
    },
    {
      title: "Department Management",
      description: "Organize and manage departments",
      icon: "🏢",
    },
    {
      title: "Course Management",
      description: "Create and manage course offerings",
      icon: "📚",
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

  const supportFunctions = [
    {
      title: "Hostel Management",
      description: "Manage hostel facilities and allocations",
      icon: "🏠",
    },
    {
      title: "Transport Management",
      description: "Handle transportation services",
      icon: "🚌",
    },
    {
      title: "Document Management",
      description: "Manage certificates and documents",
      icon: "📄",
    },
    {
      title: "Notifications",
      description: "Send announcements and updates",
      icon: "🔔",
    },
  ];

  const systemFunctions = [
    {
      title: "Reports & Analytics",
      description: "Generate reports and view statistics",
      icon: "📈",
    },
    {
      title: "Feedback & Evaluation",
      description: "Manage faculty evaluations",
      icon: "⭐",
    },
    {
      title: "System Settings",
      description: "Configure system preferences",
      icon: "⚙️",
    },
  ];

  return (
    <div className="dashboard admin-dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Admin Dashboard</h1>
        <div className="user-profile">
          <div className="profile-icon">{getInitials(name)}</div>
          <span className="user-name">{name}</span>
          <button onClick={onLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>

      <div className="dashboard-grid">
        <h2 className="section-title">Academic Management</h2>
        {academicFunctions.map((func, index) => (
          <div key={index} className="function-card academic-section">
            <div className="function-icon">{func.icon}</div>
            <div className="function-info">
              <h3 className="function-title">{func.title}</h3>
              <p className="function-description">{func.description}</p>
            </div>
          </div>
        ))}

        <h2 className="section-title">Administrative Management</h2>
        {managementFunctions.map((func, index) => (
          <div key={index} className="function-card management-section">
            <div className="function-icon">{func.icon}</div>
            <div className="function-info">
              <h3 className="function-title">{func.title}</h3>
              <p className="function-description">{func.description}</p>
            </div>
          </div>
        ))}

        <h2 className="section-title">Support Services</h2>
        {supportFunctions.map((func, index) => (
          <div key={index} className="function-card support-section">
            <div className="function-icon">{func.icon}</div>
            <div className="function-info">
              <h3 className="function-title">{func.title}</h3>
              <p className="function-description">{func.description}</p>
            </div>
          </div>
        ))}

        <h2 className="section-title">System & Analytics</h2>
        {systemFunctions.map((func, index) => (
          <div key={index} className="function-card system-section">
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

export default AdminDashboard;
