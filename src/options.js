import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './options.css';

function Options() {
  const navigate = useNavigate(); // Utilisation du hook useNavigate
  const [selectedOption, setSelectedOption] = useState('');

  // Fonction pour gérer la sélection d'une option
  const handleOptionChange = (event) => {
    const option = event.target.value;
    setSelectedOption(option); // Mise à jour de l'option sélectionnée
  };

  // Fonction pour valider l'option et rediriger
  const handleValidation = () => {
    if (selectedOption) {
      // L'utilisateur a sélectionné une option, on redirige vers '/home' ou une autre page souhaitée
      navigate('/home');
    } else {
      alert('Veuillez sélectionner une option avant de valider.');
    }
  };

  return (
    <div className="options-page">
      {/* Conteneur pour les animations d'arrière-plan */}
      <div className="background-animations">
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
      </div>

      {/* Section principale */}
      <div className="option-section">
        <h1 className="option-title">Choose an Option</h1> {/* Titre en anglais */}

        <div className="option-container">
          <label className="custom-radio">
            <input
              type="radio"
              value="avec-epsilon"
              checked={selectedOption === 'avec-epsilon'}
              onChange={handleOptionChange}
            />
            <span className="radio-label">With Epsilon</span>
          </label>
        </div>

        <div className="option-container">
          <label className="custom-radio">
            <input
              type="radio"
              value="avec-iteration"
              checked={selectedOption === 'avec-iteration'}
              onChange={handleOptionChange}
            />
            <span className="radio-label">With Iteration</span>
          </label>
        </div>

        <button className="custom-button" onClick={handleValidation}>
          Validate
        </button>
      </div>
    </div>
  );
}

export default Options;
