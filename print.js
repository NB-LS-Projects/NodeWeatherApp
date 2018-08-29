


function printWeather(data) {
    let message = `The current temperature in ${data.name} is ${data.main.temp.toFixed(1)}F`
    console.log(message);
}



module.exports.print = printWeather;
