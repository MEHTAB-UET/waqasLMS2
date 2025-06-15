import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ManageAssignments.css";

function ManageAssignments() {
  console.log("ManageAssignments component rendered");

  const [assignments, setAssignments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [facultyId, setFacultyId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newAssignment, setNewAssignment] = useState({
    title: "",
    description: "",
    dueDate: "",
    totalMarks: "",
    courseId: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("ManageAssignments useEffect triggered");
    fetchFacultyProfile();
  }, []);

  const fetchFacultyProfile = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/profile", {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setFacultyId(data.id);
        await fetchCourses(data.id);
        await fetchAssignments();
      } else {
        setError("Failed to fetch faculty profile");
      }
    } catch (error) {
      console.error("Error fetching faculty profile:", error);
      setError("Error fetching faculty profile");
    } finally {
      setLoading(false);
    }
  };

  const fetchCourses = async (id) => {
    console.log("Fetching courses for faculty:", id);
    try {
      const response = await fetch(
        `http://localhost:5000/api/faculty/${id}/assigned-courses`,
        {
          credentials: "include",
        }
      );
      console.log("Courses API Response:", response);
      if (response.ok) {
        const data = await response.json();
        console.log("Courses data:", data);
        setCourses(data.assignedCourses || []);
      } else {
        console.error(
          "Failed to fetch courses:",
          response.status,
          response.statusText
        );
        setError("Failed to fetch courses");
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
      setError("Error fetching courses");
    }
  };

  const fetchAssignments = async () => {
    console.log("Fetching assignments...");
    try {
      const response = await fetch("http://localhost:5000/api/assignments", {
        credentials: "include",
      });
      console.log("Assignments API Response:", response);
      if (response.ok) {
        const data = await response.json();
        console.log("Assignments data:", data);
        setAssignments(data);
      } else {
        console.error(
          "Failed to fetch assignments:",
          response.status,
          response.statusText
        );
        // Don't set error here as it's normal to have no assignments initially
        setAssignments([]);
      }
    } catch (error) {
      console.error("Error fetching assignments:", error);
      setAssignments([]);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log("Input changed:", name, value);
    setNewAssignment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", newAssignment);
    try {
      const url = isEditing
        ? `http://localhost:5000/api/assignments/${editingId}`
        : "http://localhost:5000/api/assignments";

      const method = isEditing ? "PUT" : "POST";
      console.log("Making API request:", { url, method, data: newAssignment });

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(newAssignment),
      });

      console.log("Submit API Response:", response);
      if (response.ok) {
        console.log("Assignment saved successfully");
        fetchAssignments();
        resetForm();
      } else {
        console.error(
          "Failed to save assignment:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error saving assignment:", error);
    }
  };

  const handleEdit = (assignment) => {
    console.log("Editing assignment:", assignment);
    setNewAssignment({
      title: assignment.title,
      description: assignment.description,
      dueDate: assignment.dueDate.split("T")[0],
      totalMarks: assignment.totalMarks,
      courseId: assignment.courseId,
    });
    setIsEditing(true);
    setEditingId(assignment._id);
  };

  const handleDelete = async (id) => {
    console.log("Attempting to delete assignment:", id);
    if (window.confirm("Are you sure you want to delete this assignment?")) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/assignments/${id}`,
          {
            method: "DELETE",
            credentials: "include",
          }
        );
        console.log("Delete API Response:", response);
        if (response.ok) {
          console.log("Assignment deleted successfully");
          fetchAssignments();
        } else {
          console.error(
            "Failed to delete assignment:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error deleting assignment:", error);
      }
    }
  };

  const resetForm = () => {
    console.log("Resetting form");
    setNewAssignment({
      title: "",
      description: "",
      dueDate: "",
      totalMarks: "",
      courseId: "",
    });
    setIsEditing(false);
    setEditingId(null);
  };

  if (loading) {
    return (
      <div className="manage-assignments">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="manage-assignments">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="manage-assignments">
      <h1>Manage Assignments</h1>

      <form onSubmit={handleSubmit} className="assignment-form">
        <h2>{isEditing ? "Edit Assignment" : "Create New Assignment"}</h2>

        <div className="form-group">
          <label htmlFor="courseId">Course:</label>
          <select
            id="courseId"
            name="courseId"
            value={newAssignment.courseId}
            onChange={handleInputChange}
            required
          >
            <option value="">Select a course</option>
            {courses.map((course) => (
              <option key={course._id} value={course._id}>
                {course.courseName} ({course.courseCode})
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={newAssignment.title}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={newAssignment.description}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="dueDate">Due Date:</label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={newAssignment.dueDate}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="totalMarks">Total Marks:</label>
          <input
            type="number"
            id="totalMarks"
            name="totalMarks"
            value={newAssignment.totalMarks}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-buttons">
          <button type="submit">
            {isEditing ? "Update" : "Create"} Assignment
          </button>
          {isEditing && (
            <button type="button" onClick={resetForm}>
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="assignments-list">
        <h2>Current Assignments</h2>
        {assignments.length === 0 ? (
          <div className="no-assignments">
            <p>No assignments have been created yet.</p>
          </div>
        ) : (
          assignments.map((assignment) => (
            <div key={assignment._id} className="assignment-card">
              <h3>{assignment.title}</h3>
              <p>{assignment.description}</p>
              <div className="assignment-details">
                <span>
                  Due: {new Date(assignment.dueDate).toLocaleDateString()}
                </span>
                <span>Marks: {assignment.totalMarks}</span>
              </div>
              <div className="assignment-actions">
                <button onClick={() => handleEdit(assignment)}>Edit</button>
                <button onClick={() => handleDelete(assignment._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ManageAssignments;
