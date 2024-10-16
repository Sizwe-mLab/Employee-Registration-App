import React, { useState, useEffect } from 'react';
import './Employeeform.css';

const EmployeeForm = ({ addEmployee, updateEmployee, employeeToEdit }) => {
  const [employee, setEmployee] = useState({
    // id: '',
    name: '',
    age: '',
    surname: '',
    idnumber: '',
    role: '',
    image: '', 
  });

  useEffect(() => {
    if (employeeToEdit) {
      setEmployee({
        // id: employeeToEdit.id || '', 
        name: employeeToEdit.name || '',
        age: employeeToEdit.age || '',
        surname: employeeToEdit.surname || '',
        idnumber: employeeToEdit.idnumber || '',
        role: employeeToEdit.role || '',
        image: employeeToEdit.image || '',
      });
    } else {
      setEmployee({
        id: '',
        name: '',
        age: '',
        surname: '',
        idnumber: '',
        role: '',
        image: '',
      });
    }
  }, [employeeToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (employeeToEdit) {
      updateEmployee(employee);
    } else {
      addEmployee(employee);
    }

 
    setEmployee({
      // id: '',
      name: '',
      age: '',
      surname: '',
      idnumber: '',
      role: '',
      image: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="employee-form">
      <h2>{employeeToEdit ? 'Edit Employee' : 'Add Employee'}</h2>
      <div className="input-items">
        <input 
          type="text" 
          name="name" 
          value={employee.name} 
          onChange={handleChange} 
          placeholder="Name" 
          required 
        />
        <input 
          type="number" 
          name="age" 
          value={employee.age} 
          onChange={handleChange} 
          placeholder="Age" 
          required 
        />
        <input 
          type="text" 
          name="surname" 
          value={employee.surname} 
          onChange={handleChange} 
          placeholder="Surname" 
          required 
        />
        <input 
          type="text" 
          name="idnumber" 
          value={employee.idnumber} 
          onChange={handleChange} 
          placeholder="ID Number" 
          required 
        />
        <input 
          type="text" 
          name="role" 
          value={employee.role} 
          onChange={handleChange} 
          placeholder="Role" 
          required 
        />
        <input 
          type="text" 
          name="image" 
          value={employee.image} 
          onChange={handleChange} 
          placeholder="Image URL" 
          required 
        />
      </div>

      <button type="submit">
        {employeeToEdit ? 'Update Employee' : 'Add Employee'}
      </button>
    </form>
  );
};

export default EmployeeForm;
