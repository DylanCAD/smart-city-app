const express = require('express');
const router = express.Router();
const db = require('../config/db');
const authenticate = require('../middleware/authMiddleware');

// 🔐 Middleware pour autoriser uniquement les admins
const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') return res.sendStatus(403);
  next();
};

// GET — Tous les utilisateurs
router.get('/', authenticate, authorizeAdmin, (req, res) => {
  db.query('SELECT id, username, email, role FROM users', (err, results) => {
    if (err) return res.status(500).json({ message: 'Erreur DB' });
    res.json(results);
  });
});

// PUT — Modifier un utilisateur
router.put('/:id', authenticate, authorizeAdmin, (req, res) => {
  const { username, role } = req.body;
  const sql = 'UPDATE users SET username = ?, role = ? WHERE id = ?';
  db.query(sql, [username, role, req.params.id], (err) => {
    if (err) return res.status(500).json({ message: 'Erreur DB' });
    res.sendStatus(200);
  });
});

// DELETE — Supprimer un utilisateur
router.delete('/:id', authenticate, authorizeAdmin, (req, res) => {
  db.query('DELETE FROM users WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ message: 'Erreur DB' });
    res.sendStatus(200);
  });
});

module.exports = router;
