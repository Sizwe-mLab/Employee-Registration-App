import React, { useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from './FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ setLoggedInUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); 
    try {
      console.log('Attempting login with:', { email, password });
  
      
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('Firebase Auth User:', user);
  
      
      const token = await user.getIdToken();
      console.log('Firebase Auth Token:', token);
  
      
      const employeesCollection = collection(db, 'employees');
      const q = query(employeesCollection, where('uid', '==', user.uid));
      const employeeSnapshot = await getDocs(q);
      console.log('Firestore Query Result:', employeeSnapshot);
  
      if (!employeeSnapshot.empty) {
        const employeeDoc = employeeSnapshot.docs[0];
        const employeeData = employeeDoc.data();
        console.log('Employee Data from Firestore:', employeeData);
  
        
        if (!employeeData.role) {
          throw new Error('Role field is missing in Firestore.');
        }
  
        
        setLoggedInUser({
          id: employeeDoc.id,
          ...employeeData,
          token,
        });
  
        console.log('Logged in as:', employeeData.name);
        localStorage.setItem('token', token);
  
        
        if (employeeData.role === 'employee') {
          navigate('/employeelist');
        } else if (employeeData.role === 'admin') {
          navigate('/employeeadmin'); 
        } else {
          setError('Invalid role.');
        }
      } else {
        setError('User not found in Firestore.');
      }
    } catch (error) {
      console.error('Error during login:', error);
  
      
      if (error.code === 'auth/invalid-credential') {
        setError('Invalid email or password. Please try again.');
      } else if (error.code === 'auth/user-not-found') {
        setError('User not found. Please check your email.');
      } else if (error.code === 'auth/wrong-password') {
        setError('Incorrect password. Please try again.');
      } else if (error.code === 'auth/network-request-failed') {
        setError('Network error. Please check your connection.');
      } else if (error.message.includes('Role field is missing')) {
        setError('Role field is missing in Firestore.');
      } else {
        setError('Login failed. Please try again.');
      }
    }
  };

  return (
    <div className="login-container">
      <div>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <button className="login-button" type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;