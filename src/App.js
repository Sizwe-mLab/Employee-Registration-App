import "./App.css";
import React, { useState } from "react";
import EmployeeList from "./components/EmployeeList";
import EmployeeForm from "./components/EmployeeForm";
import Login from "./components/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [employees, setEmployees] = useState([]);
  const [employeeToEdit, setEmployeeToEdit] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null); // Track logged-in user

  const addEmployee = (employee) => {
    setEmployees([...employees, employee]);
  };

  const updateEmployee = (updatedEmployee) => {
    setEmployees(
      employees.map((emp) =>
        emp.id === updatedEmployee.id ? updatedEmployee : emp
      )
    );
    setEmployeeToEdit(null);
  };

  const editEmployee = (employee) => {
    setEmployeeToEdit(employee);
  };

  const deleteEmployee = (id) => {
    setEmployees(employees.filter((employee) => employee.id !== id));
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/employeelist" element={
            <EmployeeList
              employees={employees}
              editEmployee={editEmployee}
              deleteEmployee={deleteEmployee}
            />
          } />
          <Route path="/" element={
            <EmployeeForm
              addEmployee={addEmployee}
              updateEmployee={updateEmployee}
              employeeToEdit={employeeToEdit}
            />
          } />
          <Route path="/login" element={<Login setLoggedInUser={setLoggedInUser} />} /> {/* Pass setLoggedInUser */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
