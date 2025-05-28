const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const secret = "votre_clé_secrète"; // mets ça dans un fichier .env plus tard

exports.register = (req, res) => {
  const { username, email, password, role } = req.body;

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).send("Erreur de hachage");

    User.create(username, email, hashedPassword, role || 'citizen', (err, result) => {
      if (err) return res.status(500).send("Erreur création utilisateur");
      res.status(201).send({ message: "Inscription réussie" });
    });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findByEmail(email, (err, results) => {
    if (err || results.length === 0) return res.status(404).send("Utilisateur introuvable");

    const user = results[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err || !isMatch) return res.status(401).send("Mot de passe incorrect");

      const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, secret, { expiresIn: '2h' });
      res.status(200).json({ token });
    });
  });
};
