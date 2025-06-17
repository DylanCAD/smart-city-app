const express = require('express');
const router = express.Router();
const sensorController = require('../controllers/sensorController');

router.get('/report', sensorController.getByDate);

router.get('/predict', sensorController.getLastReadings);

module.exports = router;
