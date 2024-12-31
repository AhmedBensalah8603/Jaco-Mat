import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import * as XLSX from 'xlsx'; // To handle XLSX files
import './file.css'; // Import styles
import logo from './Designer.png'; // Import logo

// Component for Jacobi method
function JacobiSolver({ matrix, vector, epsilon, maxIterations }) {
  const [iterationsData, setIterationsData] = useState([]); // Iteration history
  const [solution, setSolution] = useState([]); // Final solution
  const [iterations, setIterations] = useState(0); // Number of iterations
  const [complexity, setComplexity] = useState({
    complexityPerIteration: 0,
    totalComplexity: 0,
  });
  
  // Function to calculate complexity
const calculateComplexity = (matrix, maxIterations) => {
  const n = matrix.length; // Taille de la matrice
  const complexityPerIteration = n * n; // Pour une matrice dense, O(n^2)
  const totalComplexity = complexityPerIteration * maxIterations; // Complexité totale
  return { complexityPerIteration, totalComplexity };
};

  const jacobiMethod = () => {
    let n = matrix.length;
    let x = new Array(n).fill(0);
    let xNew = new Array(n).fill(0);
    let error = epsilon + 1;
    let iter = 0;
    let history = [];
  
    while (iter < maxIterations && error > epsilon) {
      for (let i = 0; i < n; i++) {
        let sum = 0;
        for (let j = 0; j < n; j++) {
          if (i !== j) sum += matrix[i][j] * x[j];
        }
        xNew[i] = (vector[i] - sum) / matrix[i][i];
      }
  
      error = 0;
      for (let i = 0; i < n; i++) {
        error = Math.max(error, Math.abs(xNew[i] - x[i]));
        x[i] = xNew[i];
      }
  
      history.push([...x]);
      iter++;
    }
  
    setSolution(x);
    setIterations(iter);
    setIterationsData(history);
  
    // Calculer la complexité
    const complexityResults = calculateComplexity(matrix, iter);
      setComplexity(complexityResults);

  };
  

  // Function to display the formatted solution
  const displaySolution = () => {
    
    if (solution.length > 0) {
      return (
        
        <div className="jacobi-solution-container">
          <h3 className="jacobi-solution-title">Complete Solution:</h3>
          <table className="jacobi-solution-table">
            <thead>
              <tr>
                <th>Variable</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {solution.map((val, index) => (
                <tr key={index}>
                  <td>X{index + 1}</td>
                  <td>{val.toFixed(6)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    return null;
  };

  // Function to display iterations
  const displayIterations = () => {
    return (
      <div className="jacobi-iterations-section">
        <h3 className="jacobi-iterations-title">Iteration Evolution:</h3>
        {iterationsData.length > 0 && (
          <table className="jacobi-iterations-table">
            <thead>
              <tr>
                <th>Iteration</th>
                {Array.from({ length: matrix.length }, (_, i) => (
                  <th key={i}>X{i + 1}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {iterationsData.map((iteration, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  {iteration.map((val, index) => (
                    <td key={index}>{val.toFixed(6)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {iterations > 0 && (
          <div className="jacobi-iterations-summary">
            Number of iterations: {iterations}
          </div>
        )}
      </div>
    );
  };

  // Function to generate and download the report as a .txt file
  const downloadReport = () => {
    const report = `
      Jacobi Method Report
      ------------------------
      Matrix: 
      ${matrix.map(row => row.join(' ')).join('\n')}
      
      Vector: 
      ${vector.join(' ')}
      
      Epsilon: ${epsilon}
      Max Iterations: ${maxIterations}
      
      Solution:
      ${solution.map((val, index) => `X${index + 1} = ${val.toFixed(6)}`).join('\n')}
      
      Total Iterations: ${iterations}
    `;

    const blob = new Blob([report], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'jacobi_solution_report.txt';
    link.click();
  };

  return (
    <div className="jacobi-method-section">
      <h2 className="jacobi-method-title">Solving using Jacobi Method</h2>
      <button className="jacobi-method-button" onClick={jacobiMethod}>
        Calculate
      </button>

      {/* Display formatted solution */}
      {displaySolution()}

      {/* Display iteration evolution */}
      {displayIterations()}
{/* Display complexity */}
{complexity.totalComplexity > 0 && (
      <div className="jacobi-complexity-container">
        <h3>Complexity Analysis:</h3>
        <p>Complexity per iteration: <strong>{complexity.complexityPerIteration}</strong> operations</p>
        <p>Total complexity: <strong>{complexity.totalComplexity}</strong> operations</p>
      </div>
    )}

    {/* Download Report Button */}
    {solution.length > 0 && (
      <button className="download-report-button" onClick={downloadReport}>
        Download Report
      </button>
    )}
  </div>
);
}

// Main component to handle file and parameters
function Filee() {
  const [file, setFile] = useState(null); // Loaded file
  const [choice, setChoice] = useState('epsilon'); // Parameter choice (epsilon or iteration number)
  const [epsilon, setEpsilon] = useState(0.1); // Default epsilon value
  const [iterationNumber, setIterationNumber] = useState(10); // Default iteration number
  const [matrix, setMatrix] = useState([]); // Matrix extracted from file
  const [vector, setVector] = useState([]); // Vector extracted from file

  // Function to handle file change
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
    readFile(file); // Read the file content
  };

  // Function to read XLSX file and extract matrix and vector
  const readFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const binaryString = e.target.result;
      const workbook = XLSX.read(binaryString, { type: 'binary' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      const mat = data.slice(0, data.length - 1); // First rows for the matrix
      const vec = data[data.length - 1]; // Last row for the vector

      setMatrix(mat);
      setVector(vec);
    };
    reader.readAsBinaryString(file);
  };

  // Function to handle form submission
  const handleSubmit = () => {
    if (!file) {
      alert('Please select a file.');
      return;
    }

    console.log('Data sent:', {
      file: file.name,
      choice,
      epsilon,
      iterationNumber,
    });
    alert('File and parameters successfully submitted!');
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

      {/* Main content */}
      <div className="file-upload-container">
      <h2>Choose a file and select a parameter</h2>
{/* File import */}
<input
  type="file"
  accept=".xlsx"
  onChange={handleFileChange}
  className="file-input"
/>


        {/* Parameter choice */}
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
              className="parameter-input"
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
              onChange={(e) => setIterationNumber(parseInt(e.target.value, 10))}
              min="1"
              max="1000"
              step="1"
              className="parameter-input"
            />
          )}
        </div>

        {/* Submit button */}
        <button className="submit-button" onClick={handleSubmit}>
          Submit
        </button>
      </div>

      {/* Jacobi method result */}
      <div className="result-container">
        {matrix.length > 0 && vector.length > 0 && (
          <JacobiSolver
            matrix={matrix}
            vector={vector}
            epsilon={epsilon}
            maxIterations={iterationNumber}
          />
        )}
      </div>

      {/* Footer */}
      <div className="footer">
        © 2024 Jaco-Mat. All rights reserved.
      </div>
    </div>
  );
}

export default Filee;
