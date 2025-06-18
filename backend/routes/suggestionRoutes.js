const express = require('express');
const router = express.Router();
const suggestionController = require('../controllers/suggestionController');
const authenticate = require('../middleware/authMiddleware');

// 👤 Soumettre une suggestion
router.post('/', authenticate, suggestionController.submit);

// 👮‍♂️ Récupérer toutes les suggestions (pour l’admin)
router.get('/', authenticate, suggestionController.getAll);

module.exports = router;
