import React, { useState, useEffect } from 'react';
import './Employeeform.css';

const EmployeeForm = ({ addEmployee, updateEmployee, employeeToEdit }) => {
  const [employee, setEmployee] = useState({
    id: '',
    name: '',
    email: '',
    phone: '',
    position: '',
    image: '', 

  });

  useEffect(() => {
    if (employeeToEdit) {
      setEmployee(employeeToEdit);
    }
  }, [employeeToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (employeeToEdit) {
      updateEmployee(employee);
    } else {
      addEmployee(employee);
    }
    setEmployee({
      id: '',
      name: '',
      email: '',
      phone: '',
      position: '',
      image: '',
      
      
    });
  };

  return (
    <form onSubmit={handleSubmit} className="employee-form">
      <h2>{employeeToEdit ? 'Edit Employee' : 'Add Employee'}</h2>
      <div className="input-items">
      <input type="text" name="name" value={employee.name} onChange={handleChange} placeholder="Name" required />
      <input type="email" name="email" value={employee.email} onChange={handleChange} placeholder="Email" required />
      <input type="text" name="phone" value={employee.phone} onChange={handleChange} placeholder="Phone" required />
      <input type="text" name="position" value={employee.position} onChange={handleChange} placeholder="position" required />
      <input type="text" name="image" value={employee.image} onChange={handleChange} placeholder="Image URL" required />
      <input type="number" name="id" value={employee.id} onChange={handleChange} placeholder="Id" />

      
        

      
      <div class="search-container">
    <form action="/search">
        
        <div className='Search-button'>
        <button className="Search"onClick={() => (employee)}>Search</button>
        </div>
    </form>
    </div>
      </div>

      <button type="submit">{employeeToEdit ? 'Update Employee' : 'Add Employee'}</button>
      </form>
  );
};

export default EmployeeForm;

                   