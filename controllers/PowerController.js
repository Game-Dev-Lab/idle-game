const PowerModel = require('../models/PowerModel');

// Récupérer tous les pouvoirs
exports.getPowers = (req, res) => {
  PowerModel.getAllPowers((err, powers) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur lors de la récupération des pouvoirs' });
    }
    res.json(powers); 
  });
};

// Ajouter un nouveau pouvoir
exports.createPower = (req, res) => {
  const { name, description, price, generation_rate, type } = req.body;
  PowerModel.addPower(name, description, price, generation_rate, type, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur lors de l\'ajout du pouvoir' });
    }
    res.status(201).json({ message: 'Pouvoir ajouté avec succès', id: result.insertId });
  });
};
