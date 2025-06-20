const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { check, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');


// 🛡️ Limiteur pour la route POST /login
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: {
    message: "Trop de tentatives de connexion. Réessaie dans 15 minutes."
  },
  standardHeaders: true,
  legacyHeaders: false
}); 

// 📌 POST /api/register
router.post(
  '/register',
  [
    check('email')
      .isEmail().withMessage("Email invalide"),

    check('username')
      .isLength({ min: 3 }).withMessage("Nom d'utilisateur trop court (min 3 caractères)"),

    check('password')
      .isLength({ min: 12 }).withMessage("Mot de passe trop court (min 12 caractères)")
      .matches(/[a-z]/).withMessage("Il faut au moins une minuscule")
      .matches(/[A-Z]/).withMessage("Il faut au moins une majuscule")
      .matches(/[0-9]/).withMessage("Il faut au moins un chiffre")
      .matches(/[^a-zA-Z0-9]/).withMessage("Il faut un caractère spécial"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    authController.register(req, res);
  }
);

// 📌 POST /api/login avec protection brute-force
router.post('/login', loginLimiter, authController.login);

module.exports = router;
