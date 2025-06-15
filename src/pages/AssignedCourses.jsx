import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/AssignedCourses.css";

function AssignedCourses() {
  const [courses, setCourses] = useState([]);
  const [facultyInfo, setFacultyInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { facultyId } = useParams();

  useEffect(() => {
    const fetchAssignedCourses = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/faculty/${facultyId}/assigned-courses`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.message || "Failed to fetch assigned courses"
          );
        }

        const data = await response.json();
        console.log("Received data:", data);

        setFacultyInfo({
          name: data.facultyName,
          department: data.department,
          designation: data.designation,
        });
        setCourses(data.assignedCourses || []);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (facultyId) {
      fetchAssignedCourses();
    }
  }, [facultyId]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading">Loading assigned courses...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="assigned-courses-container">
      {facultyInfo && (
        <div className="faculty-info">
          <h2>Welcome, {facultyInfo.name}</h2>
          <div className="faculty-details">
            <p>
              <strong>Department:</strong> {facultyInfo.department}
            </p>
            {facultyInfo.designation && (
              <p>
                <strong>Designation:</strong> {facultyInfo.designation}
              </p>
            )}
          </div>
        </div>
      )}

      <div className="courses-section">
        <h3>Your Assigned Courses</h3>
        {courses.length === 0 ? (
          <div className="no-courses">
            <p>No courses have been assigned to you yet.</p>
          </div>
        ) : (
          <div className="courses-grid">
            {courses.map((course, index) => (
              <div key={index} className="course-card">
                <div className="course-header">
                  <h4>{course.courseCode}</h4>
                  <span className="credits">{course.credits} Credits</span>
                </div>
                <h5 className="course-name">{course.courseName}</h5>
                <div className="course-details">
                  <p>
                    <strong>Semester:</strong> {course.semester}
                  </p>
                  <div className="course-actions">
                    <button className="view-students">View Students</button>
                    <button className="manage-course">Manage Course</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AssignedCourses;
