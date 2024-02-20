const express = require('express');
const router = express.Router();





router.get('/sectional-warping-1', (req, res) => {
    res.render('weaving/sectional-warping-1');
});




router.post('/sectional-warping-1', (req, res) => {
    const stripeNumber = req.body.stripeNumber;
    const stripeNumbers = []
    for(let i=1;i<=stripeNumber;i++){
        stripeNumbers.push("Stripe-" + i);
    }

     res.render('weaving/sectional-warping-2', {stripes: stripeNumbers, total: stripeNumber});
});


router.post('/sectional-warping-2', (req, res) => {

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
        input: {
            "Warp Count": [warpCount, " Ne"],
            "Weft Count": [weftCount, " Ne"],
            "EPI": [epi, ""],
            "PPI": [ppi, ""],
            "Fabric Width": [fabricWidth, " inches"],
            "Fabric Length": [fabricLength, " m"],
            "Drum Capacity": [drumCapacity, " m"],
            "Prebeam Capacity": [drumCapacity, " m"],
            "Creel Capacity": [weftCount, ""],
            "Waste Percentage": [wastePercentage, "%"]
        }
        ,
        outcome: {
            "Width of One Repeat" : [widthOfOneRepeat, " inches"],
            "Total Ends" : [totalEnds, ""],
            "Total Ends in One Repeat":[totalEndsInOneRepeat, ""],
            "Number of Reapeat per Section": [numberOfRepeatPerSection, ""],
            "Total Ends per Section" : [totalEndsPerSection, ""],
            "Creel Capacity Utilization" : [creelCapacityUtilization, "%"],
            "Total Number of Sets": [totalnumberOfSection, ""],
            "Total Warp Length": [totalLength, " m"],
            "Total Number of Sets": [totalSets, ""],
            "Warp Length per Set": [lengthPerSet, ""],
            "Drum Capacity Utilization": [drumCapacityUtilization, "%"],
            "Number of Prebeams per Set": [lengthPerPrebeam, ""],
            "Total Number of Prebeams": [totalNumberOfPrebeams, ""]
        },
    }
    const csv_input = `Input Data\n
        Warp Count,${warpCount}\n
        Weft Count,${weftCount}\n
        EPI
        PPI
        Fabric Width,
        Fabric Length,
        Drum Capactiy,

        `
    res.render('weaving/warping-output', {outcome: obj.outcome, input: obj.input, counter1: 1, counter2: 1});
});













module.exports = router;