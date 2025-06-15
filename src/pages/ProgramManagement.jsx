import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ProgramManagement.css";

const ProgramManagement = () => {
  const navigate = useNavigate();
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    department: "",
    duration: 4,
    description: "",
  });

  // Fetch programs
  const fetchPrograms = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/programs", {
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
        throw new Error("Failed to fetch programs");
      }

      const data = await response.json();
      setPrograms(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add new program
  const handleAddProgram = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/programs", {
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
        throw new Error("Failed to add program");
      }

      const data = await response.json();
      setPrograms([...programs, data]);
      setShowAddModal(false);
      setFormData({
        name: "",
        code: "",
        department: "",
        duration: 4,
        description: "",
      });
    } catch (error) {
      setError(error.message);
    }
  };

  // Update program
  const handleUpdateProgram = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/api/programs/${selectedProgram._id}`,
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
        throw new Error("Failed to update program");
      }

      const updatedProgram = await response.json();
      setPrograms(
        programs.map((program) =>
          program._id === updatedProgram._id ? updatedProgram : program
        )
      );
      setShowEditModal(false);
    } catch (error) {
      setError(error.message);
    }
  };

  // Delete program
  const handleDeleteProgram = async (id) => {
    if (!window.confirm("Are you sure you want to delete this program?"))
      return;

    try {
      const response = await fetch(`http://localhost:5000/api/programs/${id}`, {
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
        throw new Error("Failed to delete program");
      }

      setPrograms(programs.filter((program) => program._id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  // Open edit modal
  const handleEditClick = (program) => {
    setSelectedProgram(program);
    setFormData({
      name: program.name,
      code: program.code,
      department: program.department,
      duration: program.duration,
      description: program.description,
    });
    setShowEditModal(true);
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="program-management">
      <div className="header">
        <h2>Program Management</h2>
        <div className="header-buttons">
          <button className="back-btn" onClick={() => navigate("/dashboard")}>
            Back to Dashboard
          </button>
          <button className="add-btn" onClick={() => setShowAddModal(true)}>
            Add Program
          </button>
        </div>
      </div>

      <div className="programs-list">
        <table>
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Department</th>
              <th>Duration</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {programs.map((program) => (
              <tr key={program._id}>
                <td>{program.code}</td>
                <td>{program.name}</td>
                <td>{program.department}</td>
                <td>{program.duration} years</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => handleEditClick(program)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteProgram(program._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Program Modal */}
      {showAddModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add New Program</h3>
            <form onSubmit={handleAddProgram}>
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
                <label>Code:</label>
                <input
                  type="text"
                  name="code"
                  value={formData.code}
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
                <label>Duration (years):</label>
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  min="1"
                  max="8"
                  required
                />
              </div>
              <div className="form-group">
                <label>Description:</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="modal-buttons">
                <button type="submit">Add Program</button>
                <button type="button" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Program Modal */}
      {showEditModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Program</h3>
            <form onSubmit={handleUpdateProgram}>
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
                <label>Code:</label>
                <input
                  type="text"
                  name="code"
                  value={formData.code}
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
                <label>Duration (years):</label>
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  min="1"
                  max="8"
                  required
                />
              </div>
              <div className="form-group">
                <label>Description:</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="modal-buttons">
                <button type="submit">Update Program</button>
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

export default ProgramManagement;
