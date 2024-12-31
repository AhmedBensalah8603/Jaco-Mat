import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth.js'; // Import du contexte d'authentification
import HomePage from './HomePage';
import Options from './options'; // Utiliser une majuscule pour Options
import MatrixApp from './MatrixApp';
import Interface from './interface';
import Filee from './file';
import About from './aboutus';
import SignPage from './sign'; // Import du composant pour "Create Account"
import LogPage from './log.js';   // Import du composant pour "Login"

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Route principale */}
          <Route path="/" element={<HomePage />} />
          
          {/* Autres routes existantes */}
          <Route path="/options" element={<Options />} />
          <Route path="/aboutus" element={<About />} />
          <Route path="/matrix" element={<MatrixApp />} /> {/* Matrice avec la modale */}
          <Route path="/interface" element={<Interface />} />
          <Route path="/file" element={<Filee />} />

          {/* Routes pour créer un compte et se connecter */}
          <Route path="/create-account" element={<SignPage />} />
          <Route path="/login" element={<LogPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
