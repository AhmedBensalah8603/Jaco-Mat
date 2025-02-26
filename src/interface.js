import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './interface.css';
import logo from './Designer.png';

function Interface() {
  const navigate = useNavigate();

  return (
    <div className="interface-page">
      {/* Navbar */}
      <div className="navbar">
        <div className="navbar-title">Jaco-Mat</div>
        <Link to="/Jaco-Mat">
          <img src={logo} alt="Logo Designer" className="navbar-logo" />
        </Link>
        <ul className="navbar-menu">
          <li className="navbar-item"><Link to="/Jaco-Mat">Home</Link></li>
          <li className="navbar-item"><Link to="/interface">Start</Link></li>
          <li className="navbar-item"><Link to="/aboutus">About Us</Link></li>
        </ul>
      </div>

      {/* Welcome Message Container */}
      <div className="welcome-container">
        <h1 className="welcome-message">Welcome user!</h1>
      </div>

      {/* Main Content */}
      <div className="interface-content">
        {/* Form Container */}
        <div className="form-container">
          <h2>Choose between:</h2>
          <div className="interface-buttons">
            <button className="interface-button" onClick={() => navigate('/matrix')}>Use Interface</button>
            <button className="interface-button" onClick={() => navigate('/file')}>Use File</button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="footer">
        © 2024 Jaco-Mat. All rights reserved.
      </div>
    </div>
  );
}

export default Interface;
