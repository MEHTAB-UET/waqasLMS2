import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AdmissionManagement.css";

const AdmissionManagement = () => {
  const [admissions, setAdmissions] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingAdmission, setEditingAdmission] = useState(null);
  const [formData, setFormData] = useState({
    studentId: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    program: "",
    documents: {
      cnic: "",
      matricCertificate: "",
      intermediateCertificate: "",
      photo: "",
    },
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
    },
    comments: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchAdmissions();
    fetchPrograms();
  }, []);

  const fetchAdmissions = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admissions", {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch admissions");
      }
      const data = await response.json();
      setAdmissions(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching admissions:", error);
      setError(error.message);
      setLoading(false);
    }
  };

  const fetchPrograms = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/programs", {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch programs");
      }
      const data = await response.json();
      setPrograms(data);
    } catch (error) {
      console.error("Error fetching programs:", error);
      setError(error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingAdmission
        ? `http://localhost:5000/api/admissions/${editingAdmission._id}`
        : "http://localhost:5000/api/admissions";
      const method = editingAdmission ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to save admission");
      }

      await fetchAdmissions();
      setShowModal(false);
      setEditingAdmission(null);
      setFormData({
        studentId: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        program: "",
        documents: {
          cnic: "",
          matricCertificate: "",
          intermediateCertificate: "",
          photo: "",
        },
        address: {
          street: "",
          city: "",
          state: "",
          zipCode: "",
        },
        comments: "",
      });
    } catch (error) {
      console.error("Error saving admission:", error);
      setError(error.message);
    }
  };

  const handleEdit = (admission) => {
    setEditingAdmission(admission);
    setFormData({
      studentId: admission.studentId,
      firstName: admission.firstName,
      lastName: admission.lastName,
      email: admission.email,
      phone: admission.phone,
      program: admission.program._id,
      documents: admission.documents,
      address: admission.address,
      comments: admission.comments || "",
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this admission?")) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/admissions/${id}`,
          {
            method: "DELETE",
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete admission");
        }

        await fetchAdmissions();
      } catch (error) {
        console.error("Error deleting admission:", error);
        setError(error.message);
      }
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const admission = admissions.find((a) => a._id === id);
      const response = await fetch(
        `http://localhost:5000/api/admissions/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            ...admission,
            status: newStatus,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update admission status");
      }

      await fetchAdmissions();
    } catch (error) {
      console.error("Error updating admission status:", error);
      setError(error.message);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="admission-management">
      <div className="header">
        <h2>Admission Management</h2>
        <div className="header-buttons">
          <button className="back-btn" onClick={() => navigate("/dashboard")}>
            Back
          </button>
          <button className="add-btn" onClick={() => setShowModal(true)}>
            Add New Admission
          </button>
        </div>
      </div>

      <div className="admissions-list">
        <table>
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Name</th>
              <th>Program</th>
              <th>Status</th>
              <th>Admission Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {admissions.map((admission) => (
              <tr key={admission._id}>
                <td>{admission.studentId}</td>
                <td>
                  {admission.firstName} {admission.lastName}
                </td>
                <td>{admission.program.name}</td>
                <td>
                  <select
                    value={admission.status}
                    onChange={(e) =>
                      handleStatusChange(admission._id, e.target.value)
                    }
                    className={`status-select ${admission.status}`}
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </td>
                <td>
                  {new Date(admission.admissionDate).toLocaleDateString()}
                </td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(admission)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(admission._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>{editingAdmission ? "Edit Admission" : "Add New Admission"}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Student ID:</label>
                <input
                  type="text"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleInputChange}
                  required
                  disabled={editingAdmission}
                />
              </div>

              <div className="form-group">
                <label>First Name:</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Last Name:</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
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
                <label>Phone:</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
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
                  required
                >
                  <option value="">Select Program</option>
                  {programs.map((program) => (
                    <option key={program._id} value={program._id}>
                      {program.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>CNIC:</label>
                <input
                  type="text"
                  name="documents.cnic"
                  value={formData.documents.cnic}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Matric Certificate:</label>
                <input
                  type="text"
                  name="documents.matricCertificate"
                  value={formData.documents.matricCertificate}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Intermediate Certificate:</label>
                <input
                  type="text"
                  name="documents.intermediateCertificate"
                  value={formData.documents.intermediateCertificate}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Photo:</label>
                <input
                  type="text"
                  name="documents.photo"
                  value={formData.documents.photo}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Street:</label>
                <input
                  type="text"
                  name="address.street"
                  value={formData.address.street}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>City:</label>
                <input
                  type="text"
                  name="address.city"
                  value={formData.address.city}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>State:</label>
                <input
                  type="text"
                  name="address.state"
                  value={formData.address.state}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Zip Code:</label>
                <input
                  type="text"
                  name="address.zipCode"
                  value={formData.address.zipCode}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Comments:</label>
                <textarea
                  name="comments"
                  value={formData.comments}
                  onChange={handleInputChange}
                />
              </div>

              <div className="modal-buttons">
                <button type="submit">
                  {editingAdmission ? "Update" : "Add"} Admission
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingAdmission(null);
                    setFormData({
                      studentId: "",
                      firstName: "",
                      lastName: "",
                      email: "",
                      phone: "",
                      program: "",
                      documents: {
                        cnic: "",
                        matricCertificate: "",
                        intermediateCertificate: "",
                        photo: "",
                      },
                      address: {
                        street: "",
                        city: "",
                        state: "",
                        zipCode: "",
                      },
                      comments: "",
                    });
                  }}
                >
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

export default AdmissionManagement;
