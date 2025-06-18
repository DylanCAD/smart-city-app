const express = require('express');
const router = express.Router();
const sensorController = require('../controllers/sensorController');

router.get('/report', sensorController.getByDate);

router.get('/predict', sensorController.getLastReadings);

router.get('/export-json', sensorController.exportFilteredJSON);

module.exports = router;
