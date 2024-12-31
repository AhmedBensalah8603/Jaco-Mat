// Auth.js
import React, { createContext, useContext, useState } from 'react';

// Création du contexte pour l'authentification
const AuthContext = createContext();

// Hook personnalisé pour utiliser le contexte d'authentification
export const useAuth = () => {
  return useContext(AuthContext);
};

// Composant AuthProvider pour envelopper les parties de l'application qui ont besoin d'accès à l'authentification
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Fonction pour simuler la connexion de l'utilisateur
  const login = () => {
    setIsAuthenticated(true);
  };

  // Fonction pour simuler la déconnexion de l'utilisateur
  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
