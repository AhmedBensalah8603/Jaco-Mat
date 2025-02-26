import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './log.css';
import logo from './Designer.png';
import { useAuth } from './auth'; // Importation correcte du contexte d'authentification

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const { login } = useAuth(); // Hook pour accéder à la fonction de connexion
  const navigate = useNavigate(); // Hook pour la navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Vérification basique
    if (formData.username && formData.password) {
      // Simuler une connexion réussie
      login(); // Appeler la fonction de connexion pour mettre à jour l'état
      alert('Login successful!');
      console.log('Form Data:', formData);
      navigate('/interface'); // Rediriger vers l'interface
    } else {
      alert('Please enter both username and password.');
    }
  };

  return (
    <div className="login-page">
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
      <div className="login-content">
        <div className="form-container">
          <h2>Login</h2>
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
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="form-input"
              required
            />
            <button type="submit" className="form-button">Login</button>
          </form>
          <div className="form-footer">
            <p>Don't have an account? <Link to="/create-account">Create one</Link></p>
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

export default Login;
