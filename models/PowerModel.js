const db = require('../config/db'); 

// Récupérer tous les pouvoirs
exports.getAllPowers = (callback) => {
  const query = 'SELECT * FROM powers';
  db.query(query, (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
};

// Ajouter un pouvoir
exports.addPower = (name, description, price, generationRate, type, callback) => {
  const query = 'INSERT INTO powers (name, description, price, generation_rate, type) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [name, description, price, generationRate, type], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};
