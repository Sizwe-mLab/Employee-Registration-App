import React, { useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './FirebaseConfig';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ setLoggedInUser }) => {
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const employeesCollection = collection(db, 'employees');
            const q = query(employeesCollection, where('email', '==', email)); 
            const employeeSnapshot = await getDocs(q);

            if (!employeeSnapshot.empty) {
                const employeeDoc = employeeSnapshot.docs[0];
                const employeeData = employeeDoc.data();

                if (password === employeeData.password) {
                    setLoggedInUser({
                        id: employeeDoc.id,
                        ...employeeData,
                    });
                    console.log('Logged in as:', employeeData.name);

                    if (employeeData.role === 'employee') {
                        navigate('/employeelist'); 
                    } else if (employeeData.role === 'admin') {
                        navigate('/employeedashboard'); 
                    } else {
                        setError('Invalid role.');
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

    
    const handleBackToLanding = () => {
        navigate('/landingpage'); 
    };

    return (
        <div className="login-container">
            <div>
            
                <div className="back-arrow" onClick={handleBackToLanding} style={{ cursor: 'pointer', marginBottom: '20px' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 18l-6-6 6-6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="email">
                        <label>Email:</label> 
                        <input
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} 
                            required
                        />
                    </div>
                    <div className="password">
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="error">{error}</p>}
                    <button className='login-btn' type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
