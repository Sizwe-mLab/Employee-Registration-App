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
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const token = await user.getIdToken();

      
      console.log("Firebase Auth Token:", token);

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
            token
          });
          console.log('Logged in as:', employeeData.name);
          localStorage.setItem('token', token);
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
          <button className='login-button'type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
