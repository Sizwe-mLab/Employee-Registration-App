import React, { useState, useEffect } from 'react';
import { db } from './FirebaseConfig';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import './EmployeeAdmin.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faArrowLeft, faEdit, faTrashAlt, faSave, faTimes } from '@fortawesome/free-solid-svg-icons'; // Import the required icons
import { useNavigate } from 'react-router-dom';

const EmployeeAdmin = () => {
  const navigate = useNavigate();
  const [admins, setAdmins] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    age: '',
    email: '',
    salary: '',
  });

  useEffect(() => {
    const fetchEmployees = async () => {
      const employeesCollection = collection(db, 'employees');
      const employeeSnapshot = await getDocs(employeesCollection);
      const employeeList = employeeSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const adminList = employeeList.filter((employee) => employee.role === 'admin');
      setAdmins(adminList);
    };

    fetchEmployees();
  }, []);

  const toggleAdminStatus = async (admin) => {
    const newRole = admin.role === 'admin' ? 'employee' : 'admin';
    const adminRef = doc(db, 'employees', admin.id);

    try {
      await updateDoc(adminRef, { role: newRole });
      const updatedAdmins = admins.filter((ad) => ad.id !== admin.id);
      setAdmins(updatedAdmins);
      console.log(`Admin with ID: ${admin.id} is now a ${newRole}.`);
    } catch (error) {
      console.error(`Error updating role to ${newRole}:`, error);
    }
  };

  const handleEditClick = (admin) => {
    setSelectedAdmin(admin);
    setFormData({
      name: admin.name,
      surname: admin.surname,
      age: admin.age,
      email: admin.email,
      salary: admin.salary,
    });
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditSubmit = async () => {
    if (!selectedAdmin) return;

    const adminRef = doc(db, 'employees', selectedAdmin.id);

    try {
      await updateDoc(adminRef, formData);
      const updatedAdmins = admins.map((admin) =>
        admin.id === selectedAdmin.id ? { ...admin, ...formData } : admin
      );
      setAdmins(updatedAdmins);
      setIsEditing(false);
      console.log('Admin updated successfully');
    } catch (error) {
      console.error('Error updating admin:', error);
    }
  };

  const handleBackClick = () => {
    navigate('/employeeList'); // Navigate back to the Employee List page
  };

  return (
    <div className="employee-admin-container">
      {/* Back Arrow */}
      <div className="back-arrow" onClick={handleBackClick}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </div>
      
      <h1 className="dashboard-title">Admin Dashboard</h1>
      <div className="employees-grid">
        {admins.map((admin) => (
          <div className="employee-card" key={admin.id}>
            <img src={admin.image} alt={admin.name} className="employee-image" />
            <div className="employee-details">
              <h3 className="employee-name">
                {admin.name} {admin.surname}
                {admin.role === 'admin' && (
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="verified-badge"
                    title="Admin Verified"
                  />
                )}
              </h3>
              <p className="employee-info">ID Number: {admin.id}</p>
              <p className="employee-info">Role: {admin.role}</p>
              <p className="employee-info">Age: {admin.age}</p>
              <p className="employee-info">Email: {admin.email}</p>
              <p className="employee-info">Salary: {admin.salary}</p>
            </div>
            <div className="employee-actions">
              <button
                className={`toggle-admin-btn ${admin.role === 'admin' ? 'remove-admin-btn' : 'make-admin-btn'}`}
                onClick={() => toggleAdminStatus(admin)}
              >
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
              <button className="edit-admin-btn" onClick={() => handleEditClick(admin)}>
                <FontAwesomeIcon icon={faEdit} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isEditing && (
        <div className="edit-modal-overlay">
          <div className="edit-modal">
            <h2 className="modal-title">Edit Admin Details</h2>
            <form className="edit-form">
              <label className="form-label">
                Name:
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </label>
              <label className="form-label">
                Surname:
                <input
                  type="text"
                  name="surname"
                  value={formData.surname}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </label>
              <label className="form-label">
                Age:
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </label>
              <label className="form-label">
                Email:
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </label>
              <label className="form-label">
                Salary:
                <input
                  type="number"
                  name="salary"
                  value={formData.salary}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </label>
            </form>
            <div className="modal-actions">
              <button className="save-changes-btn" onClick={handleEditSubmit}>
                <FontAwesomeIcon icon={faSave} />
              </button>
              <button className="cancel-btn" onClick={() => setIsEditing(false)}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeAdmin;
