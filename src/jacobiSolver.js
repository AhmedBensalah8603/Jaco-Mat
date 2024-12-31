// Calcul de complexité
// Fonction pour calculer la complexité
const calculateComplexity = (matrixSize, iterations) => {
  // La complexité totale est O(n² * iterations)
  return matrixSize * matrixSize * iterations;
};

// Fonction pour vérifier si la matrice est dominante diagonale
const isDiagonallyDominant = (matrix) => {
  const n = matrix.length;
  for (let i = 0; i < n; i++) {
    let sum = 0;
    for (let j = 0; j < n; j++) {
      if (i !== j) sum += Math.abs(matrix[i][j]);
    }
    // Si l'élément diagonal n'est pas plus grand que la somme des autres éléments de la ligne
    if (Math.abs(matrix[i][i]) <= sum) {
      return false;
    }
  }
  return true;
};

// Fonction pour résoudre avec epsilon (tolérance)
export const solveJacobiWithEpsilon = (matrix, b, epsilon, callback) => {
  const n = matrix.length;
  let x = new Array(n).fill(0); // Initial solution (zero vector)
  let xPrev = new Array(n).fill(0); // Previous solution (zero vector)
  let diff = epsilon + 1; // Initialize the difference to a value greater than epsilon
  let iterations = 0; // Iteration counter

  // Check if the matrix is diagonally dominant before iterating
  if (!isDiagonallyDominant(matrix)) {
    throw new Error('The matrix is not convergent. Please try using a different matrix.');
  }

  while (diff > epsilon) {
    iterations++; // Increment the iteration counter

    // Calculate the new solution
    for (let i = 0; i < n; i++) {
      let sum = 0;
      for (let j = 0; j < n; j++) {
        if (i !== j) sum += matrix[i][j] * xPrev[j];
      }
      x[i] = (b[i] - sum) / matrix[i][i];
    }

    // Calculate the difference between successive solutions
    diff = 0;
    for (let i = 0; i < n; i++) {
      diff += Math.abs(x[i] - xPrev[i]);
    }

    // Update the previous solution
    xPrev = [...x];

    // Invoke the callback
    callback(iterations, x);
  }

  // Calculate the complexity
  const complexity = calculateComplexity(n, iterations);

  return {
    solution: x,
    iterations,
    complexity,
  };
};
export const solveJacobiWithMaxIteration = (matrix, b, maxIteration, callback) => {
  const n = matrix.length;
  let x = new Array(n).fill(0); // Initial solution (zero vector)
  let xPrev = new Array(n).fill(0); // Previous solution (zero vector)
  let iter = 0; // Iteration counter

  // Check if the matrix is diagonally dominant before iterating
  if (!isDiagonallyDominant(matrix)) {
    throw new Error('The matrix is not convergent. Please try using a different matrix.');
  }

  while (iter < maxIteration) {
    iter++; // Increment the iteration counter

    // Calculate the new solution
    for (let i = 0; i < n; i++) {
      let sum = 0;
      for (let j = 0; j < n; j++) {
        if (i !== j) sum += matrix[i][j] * xPrev[j];
      }
      x[i] = (b[i] - sum) / matrix[i][i];
    }

    // Check convergence
    let diff = 0;
    for (let i = 0; i < n; i++) {
      diff += Math.abs(x[i] - xPrev[i]);
    }

    // If the difference is below a certain tolerance, consider the method converged
    if (diff < 0.01) break;

    // Update the previous solution
    xPrev = [...x];

    // Invoke the callback
    callback(iter, x);
  }

  // Calculate the complexity
  const complexity = calculateComplexity(n, iter);

  return {
    solution: x,
    iterations: iter,
    complexity,
  };
};
