const express = require('express');
const router = express();
const { getCountRoute, postCountConvertRoute, getCountCalculatorRequest } = require('../controllers/count.controller');



router.get('/convert', getCountRoute);
router.post('/convert', postCountConvertRoute);
router.get('/count-calculator', getCountCalculatorRequest);





module.exports = router ;