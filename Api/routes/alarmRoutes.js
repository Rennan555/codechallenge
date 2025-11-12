// Imports
const express = require('express');
const router = express.Router();
const { createAlarm, getAlarms } = require('../controllers/alarmController');

// POST criar alarme
router.post('/', createAlarm);

// GET retornar alarmes
router.get('/', getAlarms);

module.exports = router;
