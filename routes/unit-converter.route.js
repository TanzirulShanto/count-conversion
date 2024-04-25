const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.render('units/main', {what: false});
});






module.exports = router;