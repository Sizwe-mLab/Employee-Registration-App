
import './App.css';
import React, { useState } from 'react';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';




function App() {
  const [employees, setEmployees] = useState([]);
  const [employeeToEdit, setEmployeeToEdit] = useState(null);
  

  

  
  

  const addEmployee = (employee) => {
    setEmployees([...employees, employee ]);
    console.log(employee)
    
  };

  const updateEmployee = (updatedEmployee) => {
    setEmployees(employees.map(emp => emp.id === updatedEmployee.id ? updatedEmployee : emp));
    setEmployeeToEdit(null);
  };

  const editEmployee = (employee) => {
    setEmployeeToEdit(employee);
  };

  const deleteEmployee = (id) => {
    setEmployees(employees.filter(employee => employee.id !== id));
    console.log(employees, id);
  };  



  
   

  return (
    <div className="App">
      
      <EmployeeForm 
      addEmployee={addEmployee}
      updateEmployee={updateEmployee}
      employeeToEdit={employeeToEdit}
      />
      <EmployeeList 
       employees={employees}
       editEmployee={editEmployee}
       deleteEmployee={deleteEmployee}
      />
    
    </div>
  );
}
  

export default App;
