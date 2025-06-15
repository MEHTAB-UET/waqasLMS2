import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/EnrolledCourses.css";

function EnrolledCourses() {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { studentId } = useParams();

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        console.log("Fetching student data for ID:", studentId);
        const response = await fetch(
          `http://localhost:5000/api/student/${studentId}`,
          {
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch student data: ${response.statusText}`
          );
        }

        const data = await response.json();
        console.log("Received student data:", data);
        setStudent(data);
      } catch (err) {
        console.error("Error fetching student data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (studentId) {
      fetchStudentData();
    }
  }, [studentId]);

  if (loading) {
    return <div className="loading">Loading enrolled courses...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!student) {
    return <div className="no-data">No student data found</div>;
  }

  return (
    <div className="enrolled-courses">
      <div className="student-info">
        <h1>{student.name}'s Enrolled Courses</h1>
        <div className="student-details">
          <p>
            <strong>Roll Number:</strong> {student.rollNumber}
          </p>
          <p>
            <strong>Department:</strong> {student.department}
          </p>
          <p>
            <strong>Program:</strong> {student.program}
          </p>
          <p>
            <strong>Semester:</strong> {student.semester}
          </p>
          <p>
            <strong>CGPA:</strong> {student.cgpa}
          </p>
        </div>
      </div>

      <div className="courses-grid">
        {student.enrolledCourses && student.enrolledCourses.length > 0 ? (
          student.enrolledCourses.map((course, index) => (
            <div key={index} className="course-card">
              <div className="course-header">
                <h3>{course.courseName}</h3>
                <span className="course-code">{course.courseCode}</span>
              </div>
              <div className="course-details">
                <p>
                  <strong>Grade:</strong> {course.grade || "Not Graded"}
                </p>
                <p>
                  <strong>Status:</strong> {course.status}
                </p>
              </div>
              <div className="course-status">
                <span className={`status-badge ${course.status.toLowerCase()}`}>
                  {course.status}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="no-courses">
            <p>No courses enrolled yet</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default EnrolledCourses;
