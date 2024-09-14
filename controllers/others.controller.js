const path = require('path');

exports.resistanceCalculatorGetRequest = (req, res) => {
    res.render(path.join(__dirname + '/../views/others/resistance-calc.ejs'));
}