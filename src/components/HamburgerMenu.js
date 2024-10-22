import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './HamburgerMenu.css'; 
const HamburgerMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        
        navigate('/landingpage');
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="hamburger-menu">
            <button className="hamburger-icon" onClick={toggleMenu}>
                &#9776;
            </button>
            {isOpen && (
                <div className="menu">
                    <ul className="menu-list">
                        <li className="menu-item">
                            <Link className="menu-link" to="/employeelist">Employee List</Link>
                        </li>
                        <li className="menu-item">
                            <Link className="menu-link" to="/">Employee Form</Link>
                        </li>
                        <li className="menu-item">
                            <Link className="menu-link" to="/login">Login</Link>
                        </li>
                        <li className="menu-item">
                            <Link className="menu-link" to="/employeedashboard"> Employee Dashboard</Link>
                        </li>
                        <li className="menu-item">
                            <button className="menu-button" onClick={handleLogout}>Logout</button>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default HamburgerMenu;
