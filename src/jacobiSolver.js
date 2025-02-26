// Calcul de la complexité
// Fonction pour calculer la complexité algorithmique du processus itératif
const calculerComplexite = (tailleMatrice, iterations) => {
  // La complexité totale est O(n² * iterations)
  return tailleMatrice * tailleMatrice * iterations;
};

// Fonction pour vérifier si la matrice est dominante par ses diagonales
const estDiagonaleDominante = (matrice) => {
  const n = matrice.length;
  for (let i = 0; i < n; i++) {
    let somme = 0;
    for (let j = 0; j < n; j++) {
      if (i !== j) somme += Math.abs(matrice[i][j]);
    }
    // Si l'élément diagonal n'est pas strictement supérieur à la somme des autres éléments de la ligne
    if (Math.abs(matrice[i][i]) <= somme) {
      return false;
    }
  }
  return true;
};

// Fonction de résolution du système linéaire avec un critère d'arrêt basé sur l'erreur (epsilon)
export const resoudreJacobiAvecEpsilon = (matrice, b, epsilon, callback) => {
  const n = matrice.length;
  let x = new Array(n).fill(0); // Solution initiale (vecteur nul)
  let xPrecedent = new Array(n).fill(0); // Solution précédente (vecteur nul)
  let difference = epsilon + 1; // Initialisation de la différence avec une valeur supérieure à epsilon
  let iterations = 0; // Compteur d'itérations

  // Vérification de la dominance diagonale de la matrice avant de lancer l'algorithme
  if (!estDiagonaleDominante(matrice)) {
    throw new Error('La matrice n\'est pas convergente. Veuillez essayer une autre matrice.');
  }

  while (difference > epsilon) {
    iterations++; // Incrémentation du compteur d'itérations

    // Calcul de la nouvelle approximation de la solution
    for (let i = 0; i < n; i++) {
      let somme = 0;
      for (let j = 0; j < n; j++) {
        if (i !== j) somme += matrice[i][j] * xPrecedent[j];
      }
      x[i] = (b[i] - somme) / matrice[i][i];
    }

    // Calcul de la différence entre les solutions successives
    difference = 0;
    for (let i = 0; i < n; i++) {
      difference += Math.abs(x[i] - xPrecedent[i]);
    }

    // Mise à jour de la solution précédente
    xPrecedent = [...x];

    // Appel du callback pour suivre l'évolution des itérations
    callback(iterations, x);
  }

  // Calcul de la complexité de l'algorithme
  const complexite = calculerComplexite(n, iterations);

  return {
    solution: x,
    iterations,
    complexite,
  };
};

// Fonction de résolution avec un nombre maximal d'itérations
export const resoudreJacobiAvecMaxIteration = (matrice, b, maxIteration, callback) => {
  const n = matrice.length;
  let x = new Array(n).fill(0); // Solution initiale (vecteur nul)
  let xPrecedent = new Array(n).fill(0); // Solution précédente (vecteur nul)
  let iter = 0; // Compteur d'itérations

  // Vérification de la dominance diagonale de la matrice avant d'appliquer l'algorithme
  if (!estDiagonaleDominante(matrice)) {
    throw new Error('La matrice n\'est pas convergente. Veuillez essayer une autre matrice.');
  }

  while (iter < maxIteration) {
    iter++; // Incrémentation du compteur d'itérations

    // Calcul de la nouvelle approximation de la solution
    for (let i = 0; i < n; i++) {
      let somme = 0;
      for (let j = 0; j < n; j++) {
        if (i !== j) somme += matrice[i][j] * xPrecedent[j];
      }
      x[i] = (b[i] - somme) / matrice[i][i];
    }

    // Vérification de la convergence par un critère de tolérance
    let difference = 0;
    for (let i = 0; i < n; i++) {
      difference += Math.abs(x[i] - xPrecedent[i]);
    }

    // Si la différence est inférieure à un seuil fixé, on considère que l'algorithme a convergé
    if (difference < 0.01) break;

    // Mise à jour de la solution précédente
    xPrecedent = [...x];

    // Appel du callback pour suivre l'évolution des itérations
    callback(iter, x);
  }

  // Calcul de la complexité de l'algorithme
  const complexite = calculerComplexite(n, iter);

  return {
    solution: x,
    iterations: iter,
    complexite,
  };
};
