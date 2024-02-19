const {texToAll, denToAll, neToAll, newToAll, nesToAll, nelToAll, lbpsToAll, nmToAll} = require('./../controllers/functions/count');


exports.getCountRoute = (req, res) => {
    res.render('counts/main', {data: false, isCountZero: false});
}

exports.postCountConvertRoute = (req, res)=>{
    const count = req.body.count;
    const system = req.body.system;

    if(!count){
        return res.render('counts/main', {data: false, isCountZero: true});
    }
    switch (system) {
        case "tex":
            res.render('counts/main', {data: texToAll(count), counter: 1, isCountZero: false});
            break;
        case "den":
            res.render('counts/main', {data: denToAll(count), counter: 1, isCountZero: false});
            break;
        
        case "ne":
            res.render('counts/main', {data: neToAll(count), counter: 1, isCountZero: false});
            break;

        case "new":
            res.render('counts/main', {data: newToAll(count), counter: 1, isCountZero: false});
            break;

        case "nes":
            res.render('counts/main', {data: nesToAll(count), counter: 1, isCountZero: false});
            break;

        case "nel":
            res.render('counts/main', {data: nelToAll(count), counter: 1, isCountZero: false});
            break;
        
        case "lbps":
            res.render('counts/main', {data: lbpsToAll(count), counter: 1, isCountZero: false});
            break;
        case "nm":
            res.render('counts/main', {data: nmToAll(count), counter: 1, isCountZero: false});
            break;
            
        default:
            res.render('counts/main', {data: false, isCountZero: false});
    }
}