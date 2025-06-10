import { useState } from "react";
import "../styles/Dashboard.css";
import "../styles/StudentDashboard.css";

function StudentDashboard({ email, name, onLogout }) {
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  const academicFunctions = [
    {
      title: "View Enrolled Courses",
      description: "Access your current course list and details",
      icon: "📚",
    },
    {
      title: "Class Timetable",
      description: "View your class schedule and timings",
      icon: "🕒",
    },
    {
      title: "Attendance Record",
      description: "Check your attendance history and status",
      icon: "✅",
    },
  ];

  const courseMaterialFunctions = [
    {
      title: "Download Course Materials",
      description: "Access lecture notes and study materials",
      icon: "📝",
    },
    {
      title: "Submit Assignments",
      description: "Upload and manage your assignments",
      icon: "📤",
    },
    {
      title: "View Past Papers",
      description: "Access previous exam papers and solutions",
      icon: "📄",
    },
  ];

  const examFunctions = [
    {
      title: "Exam Schedule",
      description: "View upcoming exam dates and timings",
      icon: "📅",
    },
    {
      title: "Check Results",
      description: "View your grades and academic performance",
      icon: "📊",
    },
    {
      title: "Grade Reports",
      description: "Download detailed grade reports",
      icon: "📑",
    },
  ];

  const financialFunctions = [
    {
      title: "Fee Status",
      description: "View your fee payment status and history",
      icon: "💰",
    },
    {
      title: "Generate Voucher",
      description: "Create payment vouchers for fees",
      icon: "🧾",
    },
    {
      title: "Payment History",
      description: "View your payment records",
      icon: "📋",
    },
  ];

  const supportFunctions = [
    {
      title: "Notifications",
      description: "View important announcements and updates",
      icon: "🔔",
    },
    {
      title: "Apply for Certificates",
      description: "Request bonafide and other certificates",
      icon: "📜",
    },
    {
      title: "Academic Calendar",
      description: "View important academic dates and events",
      icon: "📆",
    },
  ];

  const profileFunctions = [
    {
      title: "Edit Profile",
      description: "Update your personal information",
      icon: "👤",
    },
    {
      title: "Change Password",
      description: "Update your account password",
      icon: "🔒",
    },
    {
      title: "Academic History",
      description: "View your complete academic record",
      icon: "📚",
    },
  ];

  return (
    <div className="dashboard student-dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Student Dashboard</h1>
        <div className="user-profile">
          <div className="profile-icon">{getInitials(name)}</div>
          <span className="user-name">{name}</span>
          <button onClick={onLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>

      <div className="dashboard-grid">
        <h2 className="section-title">Academic Overview</h2>
        {academicFunctions.map((func, index) => (
          <div key={index} className="function-card academic-section">
            <div className="function-icon">{func.icon}</div>
            <div className="function-info">
              <h3 className="function-title">{func.title}</h3>
              <p className="function-description">{func.description}</p>
            </div>
          </div>
        ))}

        <h2 className="section-title">Course Materials</h2>
        {courseMaterialFunctions.map((func, index) => (
          <div key={index} className="function-card material-section">
            <div className="function-icon">{func.icon}</div>
            <div className="function-info">
              <h3 className="function-title">{func.title}</h3>
              <p className="function-description">{func.description}</p>
            </div>
          </div>
        ))}

        <h2 className="section-title">Exams & Results</h2>
        {examFunctions.map((func, index) => (
          <div key={index} className="function-card exam-section">
            <div className="function-icon">{func.icon}</div>
            <div className="function-info">
              <h3 className="function-title">{func.title}</h3>
              <p className="function-description">{func.description}</p>
            </div>
          </div>
        ))}

        <h2 className="section-title">Financial Services</h2>
        {financialFunctions.map((func, index) => (
          <div key={index} className="function-card financial-section">
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

        <h2 className="section-title">Profile & Settings</h2>
        {profileFunctions.map((func, index) => (
          <div key={index} className="function-card profile-section">
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

export default StudentDashboard;
