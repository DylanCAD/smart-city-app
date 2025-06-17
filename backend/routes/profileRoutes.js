const express = require('express');
const router = express.Router();
const db = require('../config/db');
const bcrypt = require('bcryptjs');
const authenticate = require('../middleware/authMiddleware');

// GET profil
router.get('/', authenticate, (req, res) => {
  const sql = "SELECT username, email, role FROM users WHERE id = ?";
  db.query(sql, [req.user.id], (err, results) => {
    if (err) return res.sendStatus(500);
    res.json(results[0]);
  });
});

// PUT profil
router.put('/', authenticate, (req, res) => {
  const { username, password } = req.body;
  const updates = [];
  const values = [];

  if (username) {
    updates.push("username = ?");
    values.push(username);
  }

  if (password) {
    const hashed = bcrypt.hashSync(password, 10);
    updates.push("password = ?");
    values.push(hashed);
  }

  if (updates.length === 0) return res.sendStatus(400);

  const sql = `UPDATE users SET ${updates.join(", ")} WHERE id = ?`;
  values.push(req.user.id);

  db.query(sql, values, (err) => {
    if (err) return res.sendStatus(500);
    res.sendStatus(200);
  });
});

module.exports = router;
