// Calcul de la complexité
// Fonction pour calculer la complexité en fonction de la taille de la matrice et du nombre d'itérations
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
    // Vérifie si l'élément diagonal est strictement supérieur à la somme des autres éléments de la ligne
    if (Math.abs(matrix[i][i]) <= sum) {
      return false;
    }
  }
  return true;
};

// Fonction pour résoudre le système avec une tolérance (epsilon)
export const solveJacobiWithEpsilon = (matrix, b, epsilon, callback) => {
  const n = matrix.length;
  let x = new Array(n).fill(0); // Solution initiale (vecteur nul)
  let xPrev = new Array(n).fill(0); // Solution précédente (vecteur nul)
  let diff = epsilon + 1; // Initialisation de la différence avec une valeur supérieure à epsilon
  let iterations = 0; // Compteur d'itérations

  // Vérifie si la matrice est dominante diagonale avant de commencer les itérations
  if (!isDiagonallyDominant(matrix)) {
    throw new Error("La matrice n'est pas convergente. Veuillez essayer avec une autre matrice.");
  }

  while (diff > epsilon) {
    iterations++; // Incrémentation du compteur d'itérations

    // Calcul de la nouvelle solution
    for (let i = 0; i < n; i++) {
      let sum = 0;
      for (let j = 0; j < n; j++) {
        if (i !== j) sum += matrix[i][j] * xPrev[j];
      }
      x[i] = (b[i] - sum) / matrix[i][i];
    }

    // Calcul de la différence entre les solutions successives
    diff = 0;
    for (let i = 0; i < n; i++) {
      diff += Math.abs(x[i] - xPrev[i]);
    }

    // Mise à jour de la solution précédente
    xPrev = [...x];

    // Appel du callback
    callback(iterations, x);
  }

  // Calcul de la complexité
  const complexity = calculateComplexity(n, iterations);

  return {
    solution: x,
    iterations,
    complexity,
  };
};

// Fonction pour résoudre le système avec un nombre maximal d'itérations
export const solveJacobiWithMaxIteration = (matrix, b, maxIteration, callback) => {
  const n = matrix.length;
  let x = new Array(n).fill(0); // Solution initiale (vecteur nul)
  let xPrev = new Array(n).fill(0); // Solution précédente (vecteur nul)
  let iter = 0; // Compteur d'itérations

  // Vérifie si la matrice est dominante diagonale avant de commencer les itérations
  if (!isDiagonallyDominant(matrix)) {
    throw new Error("La matrice n'est pas convergente. Veuillez essayer avec une autre matrice.");
  }

  while (iter < maxIteration) {
    iter++; // Incrémentation du compteur d'itérations

    // Calcul de la nouvelle solution
    for (let i = 0; i < n; i++) {
      let sum = 0;
      for (let j = 0; j < n; j++) {
        if (i !== j) sum += matrix[i][j] * xPrev[j];
      }
      x[i] = (b[i] - sum) / matrix[i][i];
    }

    // Vérification de la convergence
    let diff = 0;
    for (let i = 0; i < n; i++) {
      diff += Math.abs(x[i] - xPrev[i]);
    }

    // Si la différence est inférieure à un certain seuil, on considère que la méthode a convergé
    if (diff < 0.01) break;

    // Mise à jour de la solution précédente
    xPrev = [...x];

    // Appel du callback
    callback(iter, x);
  }

  // Calcul de la complexité
  const complexity = calculateComplexity(n, iter);

  return {
    solution: x,
    iterations: iter,
    complexity,
  };
};
