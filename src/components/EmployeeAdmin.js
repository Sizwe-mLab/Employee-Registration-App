import React, { useState, useEffect } from 'react';
import { db } from './FirebaseConfig';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import './EmployeeDashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const EmployeeAdmin = () => {
  const [admins, setAdmins] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState(null); 
  const [isEditing, setIsEditing] = useState(false); 
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    age: '',
    email: '',
    salary: ''
  });

  useEffect(() => {
    const fetchEmployees = async () => {
      const employeesCollection = collection(db, 'employees');
      const employeeSnapshot = await getDocs(employeesCollection);
      const employeeList = employeeSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      
      const adminList = employeeList.filter(employee => employee.role === 'admin');
      setAdmins(adminList);
    };

    fetchEmployees();
  }, []);

  const toggleAdminStatus = async (admin) => {
    const newRole = admin.role === 'admin' ? 'employee' : 'admin';
    const adminRef = doc(db, 'employees', admin.id);

    try {
      await updateDoc(adminRef, { role: newRole });
      const updatedAdmins = admins.filter(ad => ad.id !== admin.id);
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
      salary: admin.salary
    });
    setIsEditing(true); 
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
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

  return (
    <div className="employee-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="employees-grid">
        {admins.map((admin) => (
          <div className="employees-card" key={admin.id}>
            <img src={admin.image} alt={admin.name} />
            <div>
              <h3>
                {admin.name} {admin.surname}
                {admin.role === 'admin' && (
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="verified-badge"
                    title="Admin Verified"
                  />
                )}
              </h3>
              <p>ID Number: {admin.id}</p>
              <p>Role: {admin.role}</p>
              <p>Age: {admin.age}</p>
              <p>Email: {admin.email}</p>
              <p>Salary: {admin.salary}</p>
            </div>
            <div className="edit-delete-btn">
              <button
                className={`toggle-admin-btn ${admin.role === 'admin' ? 'remove-admin-btn' : 'make-admin-btn'}`}
                onClick={() => toggleAdminStatus(admin)}
              >
                Remove Admin
              </button>
              <button
                className="edit-admin-btn"
                onClick={() => handleEditClick(admin)}
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      
      {isEditing && (
        <div className="edit-modal">
          <div className="modal-content">
            <h2>Edit Admin Details</h2>
            <form>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Surname:
                <input
                  type="text"
                  name="surname"
                  value={formData.surname}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Age:
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Salary:
                <input
                  type="number"
                  name="salary"
                  value={formData.salary}
                  onChange={handleInputChange}
                />
              </label>
            </form>
            <button className='save-changes'onClick={handleEditSubmit}>Save Changes</button>
            <button className='cancel'onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeAdmin;
