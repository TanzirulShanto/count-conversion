function lengthConversion(value, times){
    return value*times;
}

document.getElementById('from_').addEventListener('keyup', () => {
    let result = document.getElementById('from_').value;
    let fromUnit  = document.getElementById('from-unit')
    let valueFrom = fromUnit.options[fromUnit.selectedIndex].value;
    let toUnit = document.getElementById('to-unit').options.value;



    document.getElementById('to').value = result;
    console.log(fromUnit);
});


const select = document.getElementById('from_');


console.dir(select);
