import React from 'react';
import './EmployeeList.css';

const EmployeeList = ({ employees, editEmployee, deleteEmployee }) => {
    
 

    if (!employees) {
        
        return <p>Loading employees...</p>;
    }

   



    return (
        
        <div className="employee-list">
            <h2>Employee List</h2>
            
            {employees.length === 0 ? (
                <p>No employees to display</p>
            ) : (
                employees.map((employee) => (
                    <div key={employee.id++} className="employee-card">
                        <img src={employee.image} alt={employee.name} />
                        <div>
                            <h3>{employee.name}</h3>
                            <p>Email: {employee.email}</p>
                            <p>Phone: {employee.phone}</p>
                            <p>Position: {employee.position}</p>
                            <p>Id: {employee.Id}</p>
                        </div>
                        <div className="edit-delete-btn">
                        
                        <button className="edit-btn "onClick={() => editEmployee(employee)}>Edit</button>

                        <button className="delete-btn" onClick={() => deleteEmployee(employee.id)}>Delete</button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default EmployeeList;