const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const PowerController = require('./controllers/PowerController');

dotenv.config();

const app = express();

// Middleware
app.use(cors()); // Activer CORS pour toutes les routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Route basique pour tester que tout fonctionne
app.get('/', (req, res) => {
  res.status(200).send('Node.js server is running!');
});

// Routes liées aux pouvoirs (Powers)
app.get('/powers', PowerController.getPowers); // Route pour récupérer les pouvoirs
app.post('/powers', PowerController.createPower); // Route pour ajouter un pouvoir

// Exemple de route pour récupérer les joueurs
app.get('/players', (req, res) => {
  const query = 'SELECT * FROM players';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send('Erreur de requête à la base de données');
    }
    res.status(200).json(results);
  });
});

// Démarrer le serveur
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
