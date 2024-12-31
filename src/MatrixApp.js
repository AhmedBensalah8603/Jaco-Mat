import React, { useState } from 'react';
import './MatrixApp.css';
import logo from './Designer.png';
import { Link, useNavigate } from 'react-router-dom';
import { solveJacobiWithEpsilon, solveJacobiWithMaxIteration } from './jacobiSolver';

function MatrixApp() {
  const [bandwidth, setBandwidth] = useState(1);
  const [size, setSize] = useState(0);
  const [matrix, setMatrix] = useState([]);
  const [b, setB] = useState([]);
  const [matrixType, setMatrixType] = useState('lowerTriangular'); // Default matrix type
  const [epsilon, setEpsilon] = useState(0.5);
  const [iterationNumber, setIterationNumber] = useState(5);
  const [choice, setChoice] = useState('epsilon');
  const [solution, setSolution] = useState(null);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [iterationsProgress, setIterationsProgress] = useState(0);
  const [report, setReport] = useState(null);  // Initialement, `report` est nul
  const [complexity, setComplexity] = useState({
    complexityPerIteration: 0,
    totalComplexity: 0,
  });

  const [iterationComplexities, setIterationComplexities] = useState([]);
  const navigate = useNavigate();

  const [iterations, setIterationCount] = useState(0);

  const parsedMatrix = matrix.map(row => row.map(Number)); // Exemple de génération


  const handleChange = (e) => {
    setSize(parseInt(e.target.value, 10));
  };
  
  
  
  const handleMatrixTypeChange = (e) => {
    setMatrixType(e.target.value);
  };
  
  const calculateComplexity = (matrix, iterations) => {
    const n = matrix.length;
    const complexityPerIteration = n * n; // O(n²) pour une matrice dense
    const totalComplexity = complexityPerIteration * iterations;
    return { complexityPerIteration, totalComplexity };
  };

  const downloadReport = () => {
    const blob = new Blob([report], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'jacobi_report.txt';
    link.click();
  };
  
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (size === 10) {
      setModalVisible(true); // Show modal if size = 10
    } else {
      generateMatrix(); // Generate matrix directly for other sizes
    }
  };

  const isMatrixFilled = () => {
    return matrix.every(row => row.every(cell => cell !== '')) && b.every(val => val !== '');
  };

  const isChoiceMade = () => {
    return choice === 'epsilon' ? epsilon > 0 && epsilon < 1 : iterationNumber >= 1 && iterationNumber <= 20000;
  };

  // **Modification : Fonction simplifiée de génération de la matrice**
  const generateMatrix = () => {
    let newMatrix = Array.from({ length: size }, () => Array.from({ length: size }, () => 0));

    switch (matrixType) {
      case 'lowerTriangular':
        for (let i = 0; i < size; i++) {
          for (let j = 0; j <= i; j++) {
            newMatrix[i][j] = Math.floor(Math.random() * 10);
          }
        }
        break;
      case 'upperTriangular':
        for (let i = 0; i < size; i++) {
          for (let j = i; j < size; j++) {
            newMatrix[i][j] = Math.floor(Math.random() * 10);
          }
        }
        break;
      case 'positiveDefinite':
        for (let i = 0; i < size; i++) {
          for (let j = 0; j < size; j++) {
            newMatrix[i][j] = i === j ? Math.floor(Math.random() * 20) + 1 : Math.floor(Math.random() * 5);
          }
        }
        break;
      case 'dominantDiagonal':
        for (let i = 0; i < size; i++) {
          for (let j = 0; j < size; j++) {
            newMatrix[i][j] = i === j ? Math.floor(Math.random() * 20) + 10 : Math.floor(Math.random() * 5);
          }
        }
        break;
      case 'band':
        for (let i = 0; i < size; i++) {
          for (let j = Math.max(0, i - 1); j < Math.min(size, i + 2); j++) {
            newMatrix[i][j] = Math.floor(Math.random() * 10);
          }
        }
        break;
      default:
        break;
    }

    const newB = Array.from({ length: size }, () => Math.floor(Math.random() * 10)); // Random b vector
    setMatrix(newMatrix);
    setB(newB);
  };
  const handleCellChange = (e, rowIndex, cellIndex) => {
    // Si la matrice est de type triangulaire inférieur, désactive les cases au-dessus de la diagonale
    if (matrixType === 'lowerTriangular' && cellIndex > rowIndex) {
      return; // Ne pas permettre de modifier les cellules en haut de la diagonale
    }
  
    // Si la matrice est de type triangulaire supérieur, désactive les cases en dessous de la diagonale
    if (matrixType === 'upperTriangular' && cellIndex < rowIndex) {
      return; // Ne pas permettre de modifier les cellules en bas de la diagonale
    }
  
    // Si la matrice est de type bande, désactive les cellules en dehors de la bande
    if (matrixType === 'band' && Math.abs(rowIndex - cellIndex) > bandwidth) {
      return; // Ne pas permettre de modifier les cellules en dehors de la bande
    }
  
    // Mise à jour de la matrice avec la nouvelle valeur
    const newMatrix = matrix.map((row, rIdx) =>
      row.map((cell, cIdx) => (rIdx === rowIndex && cIdx === cellIndex ? e.target.value : cell))
    );
    setMatrix(newMatrix);
  };
  

  const handleBChange = (e, index) => {
    const newB = [...b];
    newB[index] = e.target.value;
    setB(newB);
  };
  const fillMatrixConvergent = () => {
    const newMatrix = Array.from({ length: size }, (_, i) => {
      const row = Array.from({ length: size }, (_, j) =>
        i === j ? Math.floor(Math.random() * 20) + size : Math.floor(Math.random() * 10)
      );
      row[i] = row.reduce((sum, val, index) => (index !== i ? sum + Math.abs(val) : sum), 0) + Math.floor(Math.random() * 5) + 1;
      return row;
    });

    const newB = Array.from({ length: size }, () => Math.floor(Math.random() * 10)); // Random b vector
    setMatrix(newMatrix);
    setB(newB);
  };

  const fillMatrixRandomly = () => {
    const newMatrix = matrix.map((row) =>
      row.map(() => Math.floor(Math.random() * 10))
    );

    const newB = Array.from({ length: size }, () => Math.floor(Math.random() * 10)); // Random b vector
    setMatrix(newMatrix);
    setB(newB);
  };

  const fillMatrixWithZeros = () => {
    const newMatrix = Array.from({ length: size }, () => Array.from({ length: size }, () => 0));
    const newB = Array.from({ length: size }, () => 0);
    setMatrix(newMatrix);
    setB(newB);
  };
  const generateReport = () => {
    const reportContent = `
      Jacobi Method Report
      --------------------
      Matrix:
      ${matrix.map(row => row.join(' ') + ' ' + b[matrix.indexOf(row)]).join('\n')}
      
      Solution:
      ${solution ? solution.join('\n') : 'No solution'}

      Iterations: ${iterationsProgress}
      Complexity: O(n² * ${iterationsProgress}) = O(${complexity})
    `;

    setReport(reportContent);
  };

  const calculateJacobi = () => {
    try {
      // Conversion de la matrice et du vecteur B en nombres
      const parsedMatrix = matrix.map(row => row.map(Number));
      const parsedB = b.map(Number);
  
      let solution;
      let iterationCount = 0;
      const maxIterations = choice === 'iterationNumber' ? iterationNumber : 10000;
  
      // Store intermediate results for the report
      const iterationDetails = [];
  
      // Fonction pour mettre à jour les itérations et afficher les progressions
      const updateIterationData = (iterations, currentX) => {
        setIterationsProgress(iterations); // Display the number of iterations
        iterationCount = iterations; // Keep the global counter in sync
        const iterationComplexity = (iterations * parsedMatrix.length * parsedMatrix.length).toFixed(2);
        setIterationComplexities(prev => [...prev, iterationComplexity]);
        iterationDetails.push({
          iteration: iterations,
          x: currentX.map(num => num.toFixed(4)),
        });
      };
      
  
      // Résolution de la méthode de Jacobi en fonction du choix
      if (choice === 'epsilon') {
        solution = solveJacobiWithEpsilon(parsedMatrix, parsedB, epsilon, (iterations, x) => updateIterationData(iterations, x));
      } else if (choice === 'iterationNumber') {
        solution = solveJacobiWithMaxIteration(parsedMatrix, parsedB, iterationNumber, (iterations, x) => updateIterationData(iterations, x));
      }
  
      // **Calcul et stockage de la complexité totale**
      const n = parsedMatrix.length;
      const totalComplexity = (iterationCount * n * n).toFixed(2); // O(n²) par itération
      setComplexity(totalComplexity); // Mise à jour de la complexité totale
  
      setSolution(solution.solution); // Affichage de la solution
      setError(null); // Réinitialisation de l'erreur
  
      // Génération du rapport
      const matrixWithB = parsedMatrix.map((row, index) => {
        return [...row, parsedB[index]];
      });
  
      const maxWidths = matrixWithB[0].map((_, colIndex) =>
        Math.max(...matrixWithB.map(row => row[colIndex].toString().length))
      );
  
      const formattedMatrix = matrixWithB
        .map(row =>
          row
            .map((cell, colIndex) => cell.toString().padStart(maxWidths[colIndex]))
            .join(' ')
        )
        .join('\n\n');
  
      const formattedIterations = iterationDetails
        .map(
          detail =>
            `Iteration ${detail.iteration}:\n    x = [${detail.x.join(', ')}]`
        )
        .join('\n\n\n');
  
      const reportContent = `
  Jacobi Method Report
  --------------------
  Matrix (A | B):
  ${formattedMatrix}
  
  Solution:\n
  ${solution ? solution.solution.join('\n') : 'No solution'}
  
  Iterations: ${iterationCount}
  Complexity: O(n² * ${iterationCount}) = O(${totalComplexity})
  
  Iteration Details:
  ------------------
  \n${formattedIterations}
      `;
  
      setReport(reportContent); // Mise à jour du rapport
    } catch (err) {
      setError(err.message || 'An error occurred during calculation.'); // Gestion des erreurs
      setSolution(null);
    }
  };
  
  
  
  const handleContinue = () => {
    setModalVisible(false);
    navigate('/file');
  };
  return (
    <div className="app-container">
      <div className="navbar">
        <div className="navbar-title">Jaco-Mat</div>
        <Link to="/">
          <img src={logo} alt="Logo Designer" className="navbar-logo" />
        </Link>
        <ul className="navbar-menu">
          <li className="navbar-item"><a href="/">Home</a></li>
          <li className="navbar-item"><a href="/interface">Start</a></li>
          <li className="navbar-item"><a href="/aboutus">About Us</a></li>
        </ul>
      </div>

      <div className="main-content">
        <h1><b>Generate Your Matrix </b></h1>
        <form className="matrix-form" onSubmit={handleSubmit}>
          <label>
            <b>Matrix Size:</b>
            <input
              type="number"
              value={size}
              onChange={handleChange}
              className="matrix-input"
              min="1"
              max="10"
            />
          </label>
          <label>
            <b>Matrix Type:</b>
            <select value={matrixType} onChange={handleMatrixTypeChange} className="matrix-type-select">
              <option value="lowerTriangular">Lower Triangular</option>
              <option value="upperTriangular">Upper Triangular</option>
              <option value="positiveDefinite">Symmetric Positive Definite</option>
              <option value="dominantDiagonal">Dominant Diagonal</option>
              <option value="band">Band Matrix</option>
            </select>
          </label>
          <button type="submit" className="matrix-button">Generate Matrix</button>
          {matrixType === 'band' && (
            <label>
              <b>Bandwidth :</b>
              <input
                type="number"
                value={bandwidth}
                onChange={(e) => setBandwidth(parseInt(e.target.value))}
                min="1"
                max={size}
                className="matrix-input"
              />
            </label>
          )}
        </form>

        {modalVisible && (
          <div className="custom-modal-overlay">
            <div className="custom-modal">
              <h2>Warning</h2>
              <p>The matrix size is too large! Please use a CSV file instead.</p>
              <div className="custom-modal-buttons">
                <button onClick={handleContinue}>
                  Continue
                </button>
                <button className="cancel-button" onClick={() => setModalVisible(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {matrix.length > 0 && !modalVisible && (
          <>
            <div className="matrix-actions">
              <button onClick={fillMatrixRandomly} className="matrix-action-button">Fill Randomly</button>
              <button onClick={fillMatrixConvergent} className="matrix-action-button">Fill Convergent</button>
              <button onClick={fillMatrixWithZeros} className="matrix-action-button">Fill with Zeros</button>
            </div>
            <h2>Generated Matrix and Vector:</h2>
<div className="matrix-table-container">
  <table className="matrix-table">
    <tbody>
      {/* Tableau pour afficher la matrice */}
      {matrix.map((row, rowIndex) => (
        <tr key={rowIndex}>
          {row.map((cell, cellIndex) => {
            const isDisabled =
              (matrixType === 'lowerTriangular' && cellIndex > rowIndex) ||
              (matrixType === 'upperTriangular' && cellIndex < rowIndex) ||
              (matrixType === 'band' && Math.abs(rowIndex - cellIndex) > bandwidth);

            return (
              <td key={cellIndex} className="matrix-cell">
                <input
                  type="text"
                  value={cell}
                  onChange={(e) => handleCellChange(e, rowIndex, cellIndex)} // Mise à jour de la cellule
                  className={`matrix-cell-input ${isDisabled ? 'disabled' : ''}`}
                  placeholder={`a${rowIndex + 1}${cellIndex + 1}`}
                  disabled={isDisabled}
                />
              </td>
            );
          })}
          <td className="matrix-cell b-column">
            <input
              type="text"
              value={b[rowIndex] || 0} // Affichage et gestion du vecteur b
              onChange={(e) => handleBChange(e, rowIndex)} // Mise à jour du vecteur b
              className="matrix-cell-input"
              placeholder={`b${rowIndex + 1}`}
            />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


            <div className="choice-container">
              <label>
                <input
                  type="radio"
                  value="epsilon"
                  checked={choice === 'epsilon'}
                  onChange={() => setChoice('epsilon')}
                />
                Epsilon
              </label>
              {choice === 'epsilon' && (
                <input
                  type="number"
                  value={epsilon}
                  onChange={(e) => setEpsilon(parseFloat(e.target.value))}
                  min="0.01"
                  max="0.99"
                  step="0.01"
                  className="matrix-input"
                />
              )}
              <label>
                <input
                  type="radio"
                  value="iterationNumber"
                  checked={choice === 'iterationNumber'}
                  onChange={() => setChoice('iterationNumber')}
                />
                Iteration Number
              </label>
              {choice === 'iterationNumber' && (
                <input
                  type="number"
                  value={iterationNumber}
                  onChange={(e) => setIterationNumber(parseInt(e.target.value))}
                  min="1"
                  max="2000"
                  className="matrix-input"
                />
              )}
            </div>

            <div className="jacobi-button-container">
              <button
                className="jacobi-button"
                onClick={calculateJacobi}
                disabled={!isMatrixFilled() || !isChoiceMade()}
              >
                Calculate Jacobi Solution
              </button>
            </div>


            {solution && (
  <div className="solution-container fade-in">
    <h2 className="solution-title">Jacobi Solution:</h2>
    <table className="solution-table">
      <thead>
        <tr>
          <th colSpan={solution.length}>Solution Vector</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          {solution.map((value, index) => (
            <td key={index} className="solution-cell">{value.toFixed(4)}</td>
          ))}
        </tr>
      </tbody>
    </table>
  </div>
)}


{report && (
        <div className="report-container">
          <button onClick={downloadReport} className="download-button">
            Download Report
          </button>
        </div>
      )}



{error && <div className="error-message fade-in">{error}</div>}

          </>
        )}
      </div>

      <div className="footer">
        <p>&copy; 2024 Matrix Solver. All rights reserved.</p>
      </div>
    </div>
  );
}

export default MatrixApp;
