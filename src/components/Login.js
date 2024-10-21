import React, { useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './FirebaseConfig';
import bcrypt from 'bcryptjs';

const Login = ({ setLoggedInUser }) => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
           
            const employeesCollection = collection(db, 'employees');
            const q = query(employeesCollection, where('id', '==', id));
            const employeeSnapshot = await getDocs(q);

            if (!employeeSnapshot.empty) {
                const employeeDoc = employeeSnapshot.docs[0];
                const employeeData = employeeDoc.data();

              
                const passwordMatch = bcrypt.compareSync(password, employeeData.password);

                if (passwordMatch) {
                    if (employeeData.role === 'admin') {
                       
                        setLoggedInUser({
                            id: employeeDoc.id,
                            ...employeeData,
                        });
                        console.log('Logged in as admin:', employeeData.name);
                    } else {
                        setError('Access denied. Only admins can log in.');
                    }
                } else {
                    setError('Incorrect password.');
                }
            } else {
                setError('User not found.');
            }
        } catch (error) {
            console.error('Error during login:', error);
            setError('Login failed. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <h2>Admin Login</h2>
            <form onSubmit={handleLogin}>
                <div className="input-group">
                    <label>ID:</label>
                    <input
                        type="text"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="error">{error}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
