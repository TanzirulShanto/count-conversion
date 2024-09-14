const express = require('express');
const { resistanceCalculatorGetRequest } = require('../controllers/others.controller');
const router = express.Router();

router.get('/resistance-calculator', resistanceCalculatorGetRequest);

module.exports = router;