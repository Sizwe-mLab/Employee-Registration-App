import React, { useEffect, useState } from 'react';
import { db } from './FirebaseConfig';
import { collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import './EmployeeList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const EmployeeList = ({ editEmployee }) => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchId, setSearchId] = useState('');
    const navigate = useNavigate();

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

    const makeAdmin = async (id) => {
        const employeeDoc = doc(db, 'employees', id);
        try {
            await updateDoc(employeeDoc, { role: 'admin' });
            const updatedEmployees = employees.map(employee =>
                employee.id === id ? { ...employee, role: 'admin' } : employee
            );
            setEmployees(updatedEmployees);
            console.log(`Employee with ID: ${id} is now an admin.`);
        } catch (error) {
            console.error("Error making employee admin:", error);
        }
    };

    const removeAdmin = async (id) => {
        const employeeDoc = doc(db, 'employees', id);
        try {
            await updateDoc(employeeDoc, { role: 'employee' });
            const updatedEmployees = employees.map(employee =>
                employee.id === id ? { ...employee, role: 'employee' } : employee
            );
            setEmployees(updatedEmployees);
            console.log(`Employee with ID: ${id} is no longer an admin.`);
        } catch (error) {
            console.error("Error removing admin:", error);
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
                                <button className="admin-btn" onClick={() => makeAdmin(employee.id)} disabled={employee.role === 'admin'}>
                                    Make Admin
                                </button>
                                <button
                                    className="remove-admin-btn"
                                    onClick={() => removeAdmin(employee.id)}
                                    disabled={employee.role !== 'admin'}
                                >
                                    Remove Admin
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
