import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Utilisation de Link pour la navigation sans rechargement
import './HomePage.css';
import jacobiImage from './jacobi.jpg';
import systemImage from './system.jpg';
import howWorksImage from './howworks.jpg';
import formuleImage from './formule.jpg';
import convergenceImage from './convergence.jpg';
import applicationImage from './application.jpg';
import imageprincipale from './Designer1.png';
import logo from './Designer.png';
import { useAuth } from './auth'; // Importation du contexte d'authentification

function HomePage() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const { isAuthenticated, login, logout } = useAuth(); // Utilisation du contexte pour gérer l'authentification

  // Fonction pour ouvrir le modal
  const handleButtonClick = () => setShowModal(true);
  
  // Fonction pour fermer le modal
  const closeModal = () => setShowModal(false);

  return (
    <div className="app-container">
      {/* Navbar */}
      <div className="navbar">
        <div className="navbar-title">Jaco-Mat</div>
        <img src={logo} alt="Logo Designer" className="navbar-logo" />
        <ul className="navbar-menu">
          <li className="navbar-item"><Link to="/Jaco-Mat">Home</Link></li>
          <li className="navbar-item"><Link to="/interface">Start</Link></li>
          <li className="navbar-item"><Link to="/aboutus">About Us</Link></li>
          <li className="navbar-item user-info">
            {isAuthenticated ? (
              <>
                <span>Welcome, User!</span>
                <button onClick={logout} className="logout-button">Logout</button>
              </>
            ) : (
              <>
                <span>Welcome, Guest!</span>
                <button onClick={() => navigate('/login')} className="login-button">Login</button>
              </>
            )}
          </li>
        </ul>
      </div>
      {/* Intro Section */}
      <div className="intro-section">
        <div className="intro-image">
          <img src={imageprincipale} alt="Designer" />
        </div>
        <div className="intro-text">
          <h1><b>Welcome to Jaco-Mat:</b></h1>
          <p>Your online tool for Jacobi method calculations!</p>
          <h3>Why to Use Jaco-Mat:</h3>
          <ul>
            <li>Save time with automated Jacobi calculations.</li>
            <li>Access your calculations from anywhere, anytime.</li>
            <li>Designed for students and professionals alike.</li>
          </ul>
          <button className="start-button" onClick={handleButtonClick}>Start now!</button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Welcome!</h2>
            <p>What would you like to do?</p>
            <div className="modal-buttons">
              {/* Navigation vers Create Account et Login */}
              <button onClick={() => navigate('/create-account')}>Create Account</button>
              <button onClick={() => navigate('/login')}>Login</button>
            </div>
            <button className="modal-close" onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
<div className="system-section">
  <div className="system-content">
    <div className="system-image">
      <img src={jacobiImage} alt="Carl Gustav Jacob Jacobi" />
    </div>
    <div className="system-text">
      <h1>What is the Jacobi Method?</h1>
      <p>
        The Jacobi method, named after the German mathematician <strong>Carl Gustav Jacob Jacobi</strong>, is an iterative algorithm used in numerical linear algebra to solve systems of linear equations. This method is particularly useful for systems where the coefficient matrix is strictly diagonally dominant.
      </p>
      <p>
        It works by decomposing the matrix into diagonal, lower, and upper parts. By iteratively improving guesses for the solution, the Jacobi method is both intuitive and effective under specific conditions.
      </p>
    </div>
  </div>
</div>



     {/* Third Section */}
<div className="system-section">
  <div className="system-content">
    <div className="system-image">
      <img src={systemImage} alt="System Ax = b" />
    </div>
    <div className="system-text">
      <h1>Solving Linear Systems Ax = b</h1>
      <p>
        In many scientific and engineering applications, we encounter systems of linear equations of the form Ax = b,
        where A is a matrix of coefficients, x is the vector of unknowns, and b is the right-hand side vector.
        The goal is to find the vector x that satisfies this equation.
      </p>
    </div>
  </div>
</div>

{/* Fourth Section */}
<div className="how-it-works-section">
  <div className="how-it-works-content">
    <div className="how-it-works-text">
      <h1>How It Works</h1>
      <ul>
        <li><strong>Initialization:</strong> Start with an initial guess for the solution vector.</li>
        <li><strong>Iteration:</strong> For each equation in the system, solve for the corresponding variable assuming the other variables are fixed at their current values.</li>
        <li><strong>Update:</strong> Replace the old values with the new ones and repeat the process until the solution converges to a desired level of accuracy.</li>
      </ul>
    </div>
    <div className="how-it-works-image">
      <img src={howWorksImage} alt="How It Works" />
    </div>
  </div>
</div>

{/* Fifth Section */}
<div className="formulation-section">
  <div className="formulation-content">
    <div className="formulation-image">
      <img src={formuleImage} alt="Mathematical Formulation" />
    </div>
    <div className="formulation-text">
      <h1>Mathematical Formulation</h1>
      <p>
        Given a system of linear equations represented as Ax = b, where A is a square matrix, b is the vector of unknowns, 
        and b is the right-hand side vector, the Jacobi method updates the solution iteratively using the formula:
      </p>
      <p>
        <strong>x(k+1) = D⁻¹(b – R * x(k))</strong>
      </p>
      <ul>
        <li><strong>R:</strong> A when i ≠ j</li>
        <li><strong>D:</strong> A when i = j</li>
        <li><strong>x(k):</strong> kth iteration of x</li>
        <li><strong>x(k+1):</strong> Next iteration of x(k)</li>
      </ul>
    </div>
  </div>
</div>

{/* Sixth Section */}
<div className="convergence-section">
  <div className="convergence-content">
    <div className="convergence-text">
      <h1>Convergence</h1>
      <p>
        The Jacobi method converges if the matrix  A is strictly diagonally dominant,
        meaning that for each row, the absolute value of the diagonal element is greater than the sum of the absolute values
        of the other elements in that row. However, it can also converge under other conditions, but this is not guaranteed
        for all matrices.
      </p>
    </div>
    <div className="convergence-image">
      <img src={convergenceImage} alt="Convergence" />
    </div>
  </div>
</div>

{/* Seventh Section */}
<div className="application-section">
  <div className="application-content">
    <div className="application-image">
      <img src={applicationImage} alt="Applications of Jacobi Method" />
    </div>
    <div className="application-text">
      <h1>Applications</h1>
      <p>
        The Jacobi method is used in various fields such as engineering, physics, and computer science for solving large systems
        of linear equations, especially when the system is sparse and the matrix is diagonally dominant.
      </p>
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

// JavaScript pour ajouter la classe scrolled à la navbar au scroll
window.onscroll = function() {
  var navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) { // Quand on scroll de plus de 50px
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
};


export default HomePage;
