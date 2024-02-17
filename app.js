const express = require('express');
const app = express();
const ejs = require('ejs');


const {texToAll, denToAll, neToAll, newToAll, nesToAll, nelToAll, lbpsToAll, nmToAll} = require('./controllers/functions/count');



app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true}));
app.use(express.json());








app.get('/', (req, res) => {
    res.render("index");
});

app.get('/convert', (req, res)=>{
    res.render('counts/main', {data: false});
});


app.post('/convert', (req, res)=>{
    const count = req.body.count;
    const system = req.body.system;

    switch (system) {
        case "tex":
            res.render('counts/main', {data: texToAll(count), counter: 1});
            break;
        case "den":
            res.render('counts/main', {data: denToAll(count), counter: 1});
            break;
        
        case "ne":
            res.render('counts/main', {data: neToAll(count), counter: 1});
            break;

        case "new":
            res.render('counts/main', {data: newToAll(count), counter: 1});
            break;

        case "nes":
            res.render('counts/main', {data: nesToAll(count), counter: 1});
            break;

        case "nel":
            res.render('counts/main', {data: nelToAll(count), counter: 1});
            break;
        
        case "lbps":
            res.render('counts/main', {data: lbpsToAll(count), counter: 1});
            break;
        case "nm":
            res.render('counts/main', {data: nmToAll(count), counter: 1});
            break;
            
        default:
            res.render('counts/main', {data: false});
    }
});




module.exports = app;