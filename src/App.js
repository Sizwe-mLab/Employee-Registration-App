import "./App.css";
import React, { useState } from "react";
import EmployeeList from "./components/EmployeeList";
import EmployeeForm from "./components/EmployeeForm";
import Login from "./components/Login";
import Landingpage from "./components/Landingpage";
import HamburgerMenu from "./components/HamburgerMenu";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import EmployeeDashboard from "./components/EmployeeDashboard";

const ProtectedRoute = ({ element, loggedInUser }) => {
    return loggedInUser ? element : <Navigate to="/login" />;
};

function App() {
    const [employees, setEmployees] = useState([]);
    const [employeeToEdit, setEmployeeToEdit] = useState(null);
    const [loggedInUser, setLoggedInUser] = useState(null); 

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

    const CurrentNavbar = () => {
        const location = useLocation();
        
      
        return (location.pathname === '/employeelist' || location.pathname === '/employeedashboard') ? <HamburgerMenu /> : null;
    };

    return (
        <Router>
            <CurrentNavbar />
            <div className="App">
                <Routes>
                    <Route path="/employeelist" element={
                        <ProtectedRoute 
                            element={<EmployeeList 
                                employees={employees} 
                                editEmployee={editEmployee} 
                                loggedInUser={loggedInUser} 
                            />} 
                            loggedInUser={loggedInUser} 
                        />
                    } />
                    <Route path="/" element={
                        <ProtectedRoute 
                            element={<EmployeeForm 
                                addEmployee={addEmployee} 
                                updateEmployee={updateEmployee} 
                                employeeToEdit={employeeToEdit} 
                            />} 
                            loggedInUser={loggedInUser} 
                        />
                    } />
                    <Route path="/login" element={<Login setLoggedInUser={setLoggedInUser} />} />
                    <Route path='/landingpage' element={<Landingpage />} />
                    <Route path='/employeedashboard' element={<EmployeeDashboard />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
