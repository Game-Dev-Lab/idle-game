// app.js
const express = require('express');
const dotenv = require('dotenv');

// Charger les variables d'environnement à partir du fichier .env
dotenv.config();

// Initialiser l'application Express
const app = express();

// Middleware de base pour les requêtes JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route basique pour tester que tout fonctionne
app.get('/', (req, res) => {
  res.status(200).send('Node.js server is running!');
});

// Démarrer le serveur
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});