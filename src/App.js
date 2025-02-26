import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth.js'; // Contexte d'authentification
import HomePage from './HomePage';
import Options from './options'; // Correction : Majuscule pour Options
import MatrixApp from './MatrixApp';
import Interface from './interface';
import Filee from './file';
import About from './aboutus';
import SignPage from './sign'; // Page de création de compte
import LogPage from './log.js'; // Page de connexion

function App() {
  return (
    <AuthProvider>
      {/* Ajout du basename pour GitHub Pages */}
      <Router basename="/Jaco-Mat">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/options" element={<Options />} />
          <Route path="/aboutus" element={<About />} />
          <Route path="/matrix" element={<MatrixApp />} />
          <Route path="/interface" element={<Interface />} />
          <Route path="/file" element={<Filee />} />
          <Route path="/create-account" element={<SignPage />} />
          <Route path="/login" element={<LogPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
