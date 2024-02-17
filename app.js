const express = require('express');
const app = express();
const ejs = require('ejs');



app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true}));
app.use(express.json());




function texToAll(tex) {
    const den = tex*9;
    const ne = tex*590.5;
    const new_ = tex*885.8;
    const nes = tex*0;
    const lbps = tex*34.45;
    const mic = tex*0;
    const nel = tex*1653;
    const nm = tex*1000;

    const obj = {
        "Denier": den,
        "English Count": ne,
        "Worsted Count": new_,
        "Woollen Count": nes,
        "Jute Count": lbps,
        "Micronaire": mic,
        "Linen Count": nel,
        "Metric Count": nm
    }
    return obj;

}



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
            res.render('counts/main', {data: texToAll(count), counter: 1, fromSys: "Tex"});
            break;
    
        default:
            res.render('counts/main', {data: false});
    }
});




module.exports = app;