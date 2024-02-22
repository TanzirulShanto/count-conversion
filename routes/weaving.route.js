const express = require('express');
const { getWeavingSectionalWarpingRoute, postWeavingSectionalWarpingRoute1,
    postWeavingSectionalWarpingRoute2, 
    getWeavingHighSpeedWarping,
    postWeavingHighSpeedWarpingRoute} = require('../controllers/weaving.controller');
const router = express.Router();





router.get('/sectional-warping-1', getWeavingSectionalWarpingRoute);
router.post('/sectional-warping-1', postWeavingSectionalWarpingRoute1);
router.post('/sectional-warping-2', postWeavingSectionalWarpingRoute2);

router.get('/high-speed-warping', getWeavingHighSpeedWarping);
router.post('/high-speed-warping', postWeavingHighSpeedWarpingRoute);






module.exports = router;