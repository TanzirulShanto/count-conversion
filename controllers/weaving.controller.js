


// functions for sectional warping
exports.getWeavingSectionalWarpingRoute =  (req, res) => {
    res.render('weaving/sectional-warping-1');
}

exports.postWeavingSectionalWarpingRoute1 = (req, res) => {
    const stripeNumber = req.body.stripeNumber;
    const stripeNumbers = []
    for(let i=1;i<=stripeNumber;i++){
        stripeNumbers.push("Stripe-" + i);
    }

     res.render('weaving/sectional-warping-2', {stripes: stripeNumbers, total: stripeNumber});
}

exports.postWeavingSectionalWarpingRoute2 = (req, res) => {

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
    
    const totalNumberOfSection = Math.ceil(totalEnds/totalEndsPerSection)

    const creelCapacityUtilization = ((totalEndsPerSection/creelCapacity)*100).toFixed(2);
    
    const totalnumberOfSection = Math.ceil(totalEnds/(numberOfRepeatPerSection*totalEndsInOneRepeat));



    // const totalLength = Math.ceil(fabricLength + (fabricLength*wastePercentage)/100);
    const totalLength = Number((fabricLength/(1-(wastePercentage/100))).toFixed(3));
    const totalSets = Math.ceil(totalLength/drumCapacity);

    const lengthPerSet = Number((totalLength/totalSets).toFixed(3));
    const drumCapacityUtilization = ((lengthPerSet/drumCapacity)*100).toFixed(2);

    const numberOfPrebeamsPerDrum = Math.ceil(lengthPerSet/prebeamCapacity);
    const totalNumberOfPrebeams = numberOfPrebeamsPerDrum * totalSets;
    const lengthPerPrebeam = Number((lengthPerSet/numberOfPrebeamsPerDrum).toFixed(2));

    const weightOfWarpInPounds = ((totalEnds*totalLength*1.0936)/(warpCount*840)).toFixed(2);
    const weightOfWarpKG = (weightOfWarpInPounds*0.4536).toFixed(2);

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
            "Creel Capacity": [creelCapacity, ""],
            "Waste Percentage": [wastePercentage, "%"]
        }
        ,
        outcome: {
            "Width of One Repeat" : [widthOfOneRepeat, " inches"],
            
            "Total Ends in One Repeat":[totalEndsInOneRepeat, ""],
            "Total Ends" : [totalEnds, ""],
            "Total Number of Section": [totalNumberOfSection, ""],
            "Number of Reapeat per Section": [numberOfRepeatPerSection, ""],
            "Total Ends per Section" : [totalEndsPerSection, ""],
            "Creel Capacity Utilization" : [creelCapacityUtilization, "%"],

            "Total Number of Sets": [totalnumberOfSection, ""],
            "Total Warp Length": [totalLength, " m"],
            "Total Number of Sets": [totalSets, ""],
            "Warp Length per Set": [lengthPerSet, " m"],
            "Drum Capacity Utilization": [drumCapacityUtilization, "%"],
            "Length per Prebeam": [lengthPerPrebeam, " m"],
            "Total Number of Prebeams": [totalNumberOfPrebeams, ""],
            "Weight Of Warp Yarn ": [weightOfWarpInPounds, " lbs"],
            "Weight Of Warp Yarn": [weightOfWarpKG, " kg"],
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
    res.render('weaving/warping-output', {headingTitle: "Sectional Warping", outcome: obj.outcome, input: obj.input, counter1: 1, counter2: 1});
}

// functions for high speed warping

exports.getWeavingHighSpeedWarping = (req, res) => {
    return res.render('weaving/high-speed-warping');
}

exports.postWeavingHighSpeedWarpingRoute = (req, res) => {
    const data = req.body;


    const warpCount = Number(data.warpCount);
    const weftCount = Number(data.weftCount);
    const epi = Number(data.epi);
    const ppi = Number(data.ppi);
    const fabricWidth = Number(data.fabricWidth);
    const fabricLength = Number(data.fabricLength);
    const selvage = Number(data.selvage);
    const warpBeamCapacity = Number(data.warpBeamCapacity);
    const creelCapacity = Number(data.creelCapacity);
    const warpWastePercentage = Number(data.warpWastePercentage);
    const weftWastePercentage = Number(data.weftWastePercentage);

    // intermediate
    const totalEnds = epi*fabricWidth+selvage;
    const totalWarpLength = fabricLength/(1-(warpWastePercentage/100)); // in meter

    const weightOfWarpInPounds = ((totalWarpLength*totalEnds*1.0936)/(840*warpCount)).toFixed(2);
    const weightOfWarpInKGs = (weightOfWarpInPounds*.4536).toFixed(2);
    
    const totalPicks = ppi*36*1.0936*fabricLength;
    const totalWeftLength = fabricWidth*totalPicks; // in yds

    const weightOfWeftInPounds = (totalWeftLength/(weftCount*840)).toFixed(2);
    const weightOfWeftInKGs = (weightOfWeftInPounds*0.4536);


    const numberOfPrebeamsPerSet = Math.ceil(totalEnds/creelCapacity);
    const numberOfEndsPerPrebeam = totalEnds/numberOfPrebeamsPerSet;

    const creelCapacityUtilization = ((numberOfEndsPerPrebeam/creelCapacity)*100).toFixed(2);

    // calculation
    const totalSets = Math.ceil(totalWarpLength/warpBeamCapacity);
    const lengthPerPrebeam = (totalWarpLength/totalSets).toFixed(3);



    const obj = {
        input: {
            "Warp Count": [warpCount, " Ne"],
            "Weft Count": [weftCount, " Ne"],
            "EPI": [epi, ""],
            "PPI": [ppi, ""],
            "Fabric Width": [fabricWidth, " inches"],
            "Fabric Length": [fabricLength, " m"],
            "Number of Yarn for Selvage": [selvage, ""],
            "Weaver's Beam Capacity": [warpBeamCapacity, " m"],
            "Creel Capacity": [creelCapacity, ""],
            "Warp Waste Percentage": [warpWastePercentage, "%"],
            "Weft Waste Percentage": [weftWastePercentage, "%"],
        },
        outcome: {
            "Total Number of Ends": [totalEnds, ""],
            "Total Sets": [totalSets, ""],
            "Number of Prebeam per Set": [numberOfPrebeamsPerSet, ""],
            "Number of Ends per Prebeam": [numberOfEndsPerPrebeam, ""],
            "Length Per Prebeam": [lengthPerPrebeam, " m"],
            "Creel Capacity Utilization": [creelCapacityUtilization, " %"],
            "Total Number of Prebeams": [totalSets*numberOfEndsPerPrebeam, ""],
            "Weight of Warp Yarn": [weightOfWarpInPounds, " lbs"],
            "Weight of Weft Yarn": [weightOfWeftInPounds, " lbs"],
            "Weight of Warp Yarn ": [weightOfWarpInKGs, " kg"],
            "Weight of Weft Yarn ": [weightOfWeftInKGs, " kg"],
            
        },
    }

    res.render('weaving/warping-output', {headingTitle: "High Speed Warping", outcome: obj.outcome, input: obj.input, counter1: 1, counter2: 1});
}