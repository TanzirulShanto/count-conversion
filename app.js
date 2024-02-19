const express = require('express');
const app = express();
const ejs = require('ejs');
const cors = require('cors');
const weavingRoute = require('./routes/weaving.route');
const countRoute = require('./routes/count.route');



app.set("view engine", "ejs");
app.use(cors());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use(weavingRoute);
app.use(countRoute);




app.get('/', (req, res) => {
    res.render("index");
});



app.get('/weaving/sectional-warping-1', (req, res) => {
    res.render('weaving/sectional-warping-1');
});


app.post('/weaving/sectional-warping-1', (req, res) => {
    const stripeNumber = req.body.stripeNumber;
    const stripeNumbers = []
    for(let i=1;i<=stripeNumber;i++){
        stripeNumbers.push("Stripe-" + i);
    }

     res.render('weaving/sectional-warping-2', {stripes: stripeNumbers, total: stripeNumber});
});


app.post('/weaving/sectional-warping-2', (req, res) => {

    const data = req.body;
    
    const stripesWidth = [];
    let counter = 1;
    for(let key in data){
        stripesWidth.push(Number(data[key]));
        if (counter==data.stripeNumber){
            break;
        }
        counter++;
    }
    const warpCount = Number(data.warpCount);
    const weftCount = Number(data.weftCount);
    const epi = Number(data.epi);
    const ppi = Number(data.ppi);
    const fabricWidth = Number(data.fabricWidth);
    const fabricLength = Number(data.fabricLength);
    const drumCapacity = Number(data.drumCapacity);
    const prebeamCapacity = Number(data.prebeamCapacity);
    const creelCapacity = Number(data.creelCapacity);
    const wastePercentage = Number(data.wastePercentage);

    // cal culations

    let widthOfOneRepeat = 0;
    for(let i of stripesWidth){
        widthOfOneRepeat += i;
    }


    const totalEnds = fabricWidth * epi;
    const totalEndsInOneRepeat = epi * widthOfOneRepeat;
    const numberOfRepeatPerSection = Math.floor(creelCapacity/totalEndsInOneRepeat);
    const totalEndsPerSection = numberOfRepeatPerSection * totalEndsInOneRepeat;

    const creelCapacityUtilization = ((totalEndsPerSection/creelCapacity)*100).toFixed(2);
    
    const totalnumberOfSection = Math.ceil(totalEnds/(numberOfRepeatPerSection*totalEndsInOneRepeat));

    const totalLength = Math.ceil(fabricLength + (fabricLength*wastePercentage)/100);
    const totalSets = Math.ceil(totalLength/drumCapacity);

    const lengthPerSet = totalLength/totalSets;
    const drumCapacityUtilization = ((lengthPerSet/drumCapacity)*100).toFixed(2);

    const numberOfPrebeamsPerDrum = Math.ceil(lengthPerSet/prebeamCapacity);
    const totalNumberOfPrebeams = numberOfPrebeamsPerDrum * totalSets;
    const lengthPerPrebeam = lengthPerSet/numberOfPrebeamsPerDrum;



    const obj = {
        outcome: {
            widthOfOneRepeat,
            totalEnds,
            totalEndsInOneRepeat,
            numberOfRepeatPerSection,
            totalEndsPerSection,
            creelCapacityUtilization,
            totalnumberOfSection,
            totalLength,
            totalSets,
            lengthPerSet,
            drumCapacityUtilization,
            lengthPerPrebeam,
            totalNumberOfPrebeams
        }
    }
    


    res.send(obj);
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