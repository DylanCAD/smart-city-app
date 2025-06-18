const Suggestion = require('../models/Suggestion');

exports.submit = (req, res) => {
  const { title, message } = req.body;
  const userId = req.user.id;

  if (!title || !message) {
    return res.status(400).json({ message: "Titre et message requis." });
  }

  Suggestion.create(userId, title, message, (err) => {
    if (err) return res.status(500).json({ message: "Erreur serveur" });
    res.status(201).json({ message: "Suggestion envoyée avec succès." });
  });
};

exports.getAll = (req, res) => {
  Suggestion.getAll((err, results) => {
    if (err) return res.status(500).json({ message: "Erreur serveur" });
    res.json(results);
  });
};
