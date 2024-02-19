const express = require('express');
const router = express();
const { getCountRoute, postCountConvertRoute } = require('../controllers/count.controller');



router.get('/convert', getCountRoute);
router.post('/convert', postCountConvertRoute);






module.exports = router ;