import React from 'react';
import { Link } from 'react-router-dom';
import './aboutus.css'; // Assurez-vous que ce fichier est bien inclus.

import logo from './Designer.png'; // Chemin vers votre logo.
import image from './team.jpg'; // Chemin vers l'image de l'équipe.

function About() {
  return (
    <div className="about-container">
      {/* Navbar */}
      <div className="navbar">
      <div className="navbar-title">Jaco-Mat</div>
        <Link to="/">
          <img src={logo} alt="Logo Designer" className="navbar-logo" />
        </Link>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/">Home</Link>
          </li>
          <li className="navbar-item">
            <a href="/interface">Start</a>
          </li>
          <li className="navbar-item">
            <Link to="/aboutus">About Us</Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="about-content-container">
        {/* Decorative Image */}
        <div className="about-image-container">
          <img src={image} alt="About Us" className="about-image" />
        </div>

        {/* About Content */}
        <div className="about-content">
          <h1><b><u>About Us</u></b></h1>
          <p>
            We are a team of passionate developers currently pursuing a Data
            Engineering program at the University of Sfax, Faculty of Sciences
            of Sfax, Computer Science Department. Below are the details of the
            creators and their LinkedIn profiles:
          </p>

          {/* Academic Information */}
          <div className="university-info">
            <h2>Our Academic Cycle</h2>
            <p>
              We are studying Data Engineering as part of our academic program
              at the University of Sfax, Faculty of Sciences of Sfax, Computer
              Science Department.
            </p>
          </div>

          {/* Team Members */}
          <div className="team-member-container">
            <div className="team-member">
              <h3>Oussema Zghal</h3>
              <a
                href="https://www.linkedin.com/in/oussema-zghal-42736b149/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn Profile
              </a>
            </div>

            <div className="team-member">
              <h3>Mohamed Amine Salhi</h3>
              <a
                href="https://www.linkedin.com/in/med-amine-salhi-429a52248/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn Profile
              </a>
            </div>

            <div className="team-member">
              <h3>Ahmed Ben Saleh</h3>
              <a
                href="https://www.linkedin.com/in/bensalah-ahmed-143ba8275/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn Profile
              </a>
            </div>
          </div>

          {/* Supervisor Information */}
          <div className="supervisor">
            <h2>Supervised by</h2>
            <h3>Dr. Sirine Marrakchi</h3>
            <p>Project Supervisor</p>
            <a
              href="https://www.linkedin.com/in/sirine-marrakchi"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn Profile
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="footer">
        <p>        © 2024 Jaco-Mat. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default About;
