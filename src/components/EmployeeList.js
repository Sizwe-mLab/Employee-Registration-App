import React, { useEffect, useState } from 'react';
import { db } from './FirebaseConfig'; 
import { collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import './EmployeeList.css';

const EmployeeList = ({ editEmployee }) => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const employeesCollection = collection(db, 'employees'); 
                const employeeSnapshot = await getDocs(employeesCollection);
                const employeeList = employeeSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setEmployees(employeeList);
            } catch (error) {
                console.error("Error fetching employees:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    const deleteEmployee = async (id) => {
        const employeeDoc = doc(db, 'employees', id);
        try {
            await deleteDoc(employeeDoc);
            setEmployees(employees.filter(employee => employee.id !== id));
        } catch (error) {
            console.error("Error deleting employee:", error);
        }
    };

    const handleEdit = (employee) => {
        editEmployee(employee);
    };

    if (loading) {
        return <p>Loading employees...</p>;
    }

    return (
        <div>
            <h2>Employee List</h2>
            <div className="employee-list">
                {employees.length === 0 ? (
                    <p>No employees to display</p>
                ) : (
                    employees.map((employee) => (
                        <div key={employee.id} className="employee-card">
                            <img src={employee.image} alt={employee.name} />
                            <div>
                                <h3>{employee.name} {employee.surname}</h3>
                                <p>IDNumber: {employee.id}</p>
                                <p>Role: {employee.role}</p>
                                <p>Age: {employee.age}</p>
                            </div>
                            <div className="edit-delete-btn">
                                <button className="edit-btn" onClick={() => handleEdit(employee)}>Edit</button>
                                <button className="delete-btn" onClick={() => deleteEmployee(employee.id)}>Delete</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default EmployeeList;
