import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Landingpage.css';

const Landingpage = () => {
  const navigate = useNavigate(); 

  const handleLoginClick = () => {
    navigate('/login'); 
  };

  return (
    <div className="landing-page">
      <header className="landing-header">
        <h1>Welcome to Employee App</h1>
        <p>Your one-stop solution for all your needs.</p>
        <button className="cta-button" onClick={handleLoginClick}>
          Login
        </button>
      </header>
    </div>
  );
};

export default Landingpage;
