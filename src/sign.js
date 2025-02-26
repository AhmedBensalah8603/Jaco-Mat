import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './sign.css';
import logo from './Designer.png';

function CreateAccount() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    alert('Account created successfully!');
    console.log('Form Data:', formData); // For debugging or API calls
  };

  return (
    <div className="create-account-page">
      {/* Navbar */}
      <div className="navbar">
        <div className="navbar-title">Jaco-Mat</div>
        <Link to="/Jaco-Mat">
          <img src={logo} alt="Logo Designer" className="navbar-logo" />
        </Link>
        <ul className="navbar-menu">
          <li className="navbar-item"><Link to="/Jaco-Mat">Home</Link></li>
          <li className="navbar-item"><Link to="/aboutus">About Us</Link></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="create-account-content">
        <div className="form-container">
          <h2>Create an Account</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="form-input"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="form-input"
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="form-input"
              required
            />
            <button type="submit" className="form-button">Create Account</button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <div className="footer">
        © 2024 Jaco-Mat. All rights reserved.
      </div>
    </div>
  );
}

export default CreateAccount;
