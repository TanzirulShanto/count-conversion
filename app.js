const express = require('express');
const app = express();
const ejs = require('ejs');
const cors = require('cors');
const weavingRoute = require('./routes/weaving.route');
const countRoute = require('./routes/count.route');
const unitsRoute = require('./routes/unit-converter.route');



app.set("view engine", "ejs");
app.use(cors());
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use(express.static('public'));

app.use('/weaving', weavingRoute);
app.use(countRoute);




app.get('/', (req, res) => {
    res.render("index");
});




app.use((req, res, next) => {
    res.render('err', {message:"Invalid Route", statusCode: 404});
});

// app.use((err, req, res, next) => {
//     res.status(500).json({
//         message: "Server Broke!!!"
//     });
// });


module.exports = app;