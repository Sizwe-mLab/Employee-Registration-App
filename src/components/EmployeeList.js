import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';
import './EmployeeList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimes } from '@fortawesome/free-solid-svg-icons';

const EmployeeList = ({ editEmployee }) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchId, setSearchId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }
      try {
        const response = await axios.get('https://employee-app-nodejs-1-1jjz.onrender.com/api/employees', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEmployees(response.data); 
      } catch (error) {
        console.error("Error fetching employees:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  const deleteEmployee = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`https://employee-app-nodejs-1-1jjz.onrender.com/api/employees/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmployees(employees.filter(employee => employee.id !== id));
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const handleEdit = (employee) => {
    editEmployee(employee);
    navigate("/");
  };

  const toggleAdmin = async (employee) => {
    const token = localStorage.getItem('token');
    const newRole = employee.role === 'admin' ? 'employee' : 'admin';
    try {
      await axios.put(`https://employee-app-nodejs-1-1jjz.onrender.com/api/employees/${employee.id}`, { role: newRole }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const updatedEmployees = employees.map(emp =>
        emp.id === employee.id ? { ...emp, role: newRole } : emp
      );
      setEmployees(updatedEmployees);
      console.log(`Employee with ID: ${employee.id} is now a ${newRole}.`);
    } catch (error) {
      console.error(`Error updating role to ${newRole}:`, error);
    }
  };

  const filteredEmployees = searchId
    ? employees.filter(employee => employee.id.toLowerCase().includes(searchId.toLowerCase()))
    : employees;

  if (loading) {
    return <p>Loading employees...</p>;
  }

  return (
    <div>
      <div className="header">
        <h2>Employee List</h2>
        <FontAwesomeIcon
          icon={faTimes}
          className="close-icon"
          onClick={() => navigate('/')}
          title="Go back to Home"
        />
      </div>
      <input
        type="text"
        placeholder="Search by ID"
        value={searchId}
        onChange={(e) => setSearchId(e.target.value)}
        className="search-bar"
      />
      <div className="employee-list">
        {filteredEmployees.length === 0 ? (
          <p>No employees to display</p>
        ) : (
          filteredEmployees.map((employee) => (
            <div
              key={employee.id}
              className={`employee-card ${employee.role === 'admin' ? 'admin-card' : ''}`}
            >
              <img src={employee.image} alt={employee.name} />
              <div>
                <h3>
                  {employee.name} {employee.surname}
                  {employee.role === 'admin' && (
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      className="verified-badge"
                      title="Admin Verified"
                    />
                  )}
                </h3>
                <p>ID Number: {employee.id}</p>
                <p>Role: {employee.role}</p>
                <p>Age: {employee.age}</p>
              </div>
              <div className="edit-delete-btn">
                <button className="edit-btn" onClick={() => handleEdit(employee)}>Edit</button>
                <button className="delete-btn" onClick={() => deleteEmployee(employee.id)}>Delete</button>
                <button
                  className={`toggle-admin-btn ${employee.role === 'admin' ? 'remove-admin-btn' : 'make-admin-btn'}`}
                  onClick={() => toggleAdmin(employee)}
                >
                  {employee.role === 'admin' ? 'Remove Admin' : 'Make Admin'}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EmployeeList;
