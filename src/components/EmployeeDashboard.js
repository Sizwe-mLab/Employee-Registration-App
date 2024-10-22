import React, { useState, useEffect } from 'react';
import { db } from './FirebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import './EmployeeDashboard.css'; 

const EmployeeDashboard = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      const employeeQuery = query(
        collection(db, 'employees'),
        where('role', '==', 'employee')
      );
      const querySnapshot = await getDocs(employeeQuery);
      const employeeList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const filteredEmployees = employeeList.map(({ name, role, age }) => ({
        name,
        role,
        age,
      }));
      setEmployees(filteredEmployees);
    };

    fetchEmployees();
  }, []);

  return (
    <div className="employee-dashboard">
      <h1>Employee Dashboard</h1>
      <div className="employees-grid">
        {employees.map((employee, index) => (
          <div className="employees-card" key={index}>
            <h3>{employee.name}</h3>
            <p>Role: {employee.role}</p>
            <p>Age: {employee.age}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeDashboard;
