import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/StudentManagement.css";

const StudentManagement = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    program: "BS Computer Science",
    semester: 1,
  });

  // Fetch students
  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError("");
      console.log("Fetching students...");

      const response = await fetch("http://localhost:5000/api/students", {
        credentials: "include",
        headers: {
          Accept: "application/json",
        },
      });

      if (response.status === 401) {
        console.log("Unauthorized, redirecting to login");
        window.location.href = "/login";
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server error:", errorData);
        throw new Error(errorData.message || "Failed to fetch students");
      }

      const data = await response.json();
      console.log("Received students data:", data);
      setStudents(data);
    } catch (error) {
      console.error("Error in fetchStudents:", error);
      setError(error.message || "Failed to fetch students");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add new student
  const handleAddStudent = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/students", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 401) {
        window.location.href = "/login";
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to add student");
      }

      const data = await response.json();
      setStudents([...students, data]);
      setShowAddModal(false);
      setFormData({
        name: "",
        email: "",
        department: "",
        program: "BS Computer Science",
        semester: 1,
      });
    } catch (error) {
      setError(error.message);
    }
  };

  // Update student
  const handleUpdateStudent = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/api/students/${selectedStudent._id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.status === 401) {
        window.location.href = "/login";
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to update student");
      }

      const updatedStudent = await response.json();
      setStudents(
        students.map((student) =>
          student._id === updatedStudent._id ? updatedStudent : student
        )
      );
      setShowEditModal(false);
    } catch (error) {
      setError(error.message);
    }
  };

  // Delete student
  const handleDeleteStudent = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?"))
      return;

    try {
      const response = await fetch(`http://localhost:5000/api/students/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          Accept: "application/json",
        },
      });

      if (response.status === 401) {
        window.location.href = "/login";
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to delete student");
      }

      setStudents(students.filter((student) => student._id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  // Open edit modal
  const handleEditClick = (student) => {
    setSelectedStudent(student);
    setFormData({
      name: student.name,
      email: student.email,
      department: student.department,
      program: student.program,
      semester: student.semester,
    });
    setShowEditModal(true);
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="student-management">
      <div className="header">
        <h2>Student Management</h2>
        <div className="header-buttons">
          <button className="back-btn" onClick={() => navigate("/dashboard")}>
            Back to Dashboard
          </button>
          <button className="add-btn" onClick={() => setShowAddModal(true)}>
            Add Student
          </button>
        </div>
      </div>

      <div className="students-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Program</th>
              <th>Semester</th>
              <th>CGPA</th>
              <th>Enrollment Date</th>
              <th>Status</th>
              <th>Contact</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.department}</td>
                <td>{student.program}</td>
                <td>{student.semester}</td>
                <td>{student.cgpa?.toFixed(2) || "N/A"}</td>
                <td>{new Date(student.enrollmentDate).toLocaleDateString()}</td>
                <td>{student.status}</td>
                <td>{student.contactInfo?.phone || "N/A"}</td>
                <td>{student.contactInfo?.address || "N/A"}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => handleEditClick(student)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteStudent(student._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="view-courses-btn"
                    onClick={() => {
                      alert(
                        `Enrolled Courses:\n${
                          student.enrolledCourses
                            ?.map(
                              (course) =>
                                `${course.courseCode}: ${course.courseName} (Grade: ${course.grade})`
                            )
                            .join("\n") || "No courses enrolled"
                        }`
                      );
                    }}
                  >
                    View Courses
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Student Modal */}
      {showAddModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add New Student</h2>
            <form onSubmit={handleAddStudent}>
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Department:</label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Program:</label>
                <select
                  name="program"
                  value={formData.program}
                  onChange={handleInputChange}
                >
                  <option value="BS Computer Science">
                    BS Computer Science
                  </option>
                </select>
              </div>
              <div className="form-group">
                <label>Semester:</label>
                <select
                  name="semester"
                  value={formData.semester}
                  onChange={handleInputChange}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <option key={num} value={num}>
                      Semester {num}
                    </option>
                  ))}
                </select>
              </div>
              <div className="modal-buttons">
                <button type="submit">Add Student</button>
                <button type="button" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Student Modal */}
      {showEditModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Student</h2>
            <form onSubmit={handleUpdateStudent}>
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Department:</label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Program:</label>
                <select
                  name="program"
                  value={formData.program}
                  onChange={handleInputChange}
                >
                  <option value="BS Computer Science">
                    BS Computer Science
                  </option>
                </select>
              </div>
              <div className="form-group">
                <label>Semester:</label>
                <select
                  name="semester"
                  value={formData.semester}
                  onChange={handleInputChange}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <option key={num} value={num}>
                      Semester {num}
                    </option>
                  ))}
                </select>
              </div>
              <div className="modal-buttons">
                <button type="submit">Update Student</button>
                <button type="button" onClick={() => setShowEditModal(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentManagement;
