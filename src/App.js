
import './App.css';
import React, { useState } from 'react';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
import EmployeeSearch from './components/EmployeeSearch';




function App() {
  const [employees, setEmployees] = useState([]);
  const [employeeToEdit, setEmployeeToEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const addEmployee = (employee) => {
    setEmployees([...employees, employee ]);
    //console.log(employee)
    
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
    
  };  


  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredEmployees = employees.filter(employee => {
    const employeeId = String(employee.Id).toLowerCase();
    return employeeId.includes(searchTerm.toLowerCase());
     
    
  }
  
  
  );

  return (
    <div className="App">
      
      <EmployeeForm 
      addEmployee={addEmployee}
      updateEmployee={updateEmployee}
      employeeToEdit={employeeToEdit}
      />

      <EmployeeSearch onSearch={handleSearch} />

      <EmployeeList 
       employees={filteredEmployees}
       editEmployee={editEmployee}
       deleteEmployee={deleteEmployee}
      />
    
    </div>
  );
}
  

export default App;
