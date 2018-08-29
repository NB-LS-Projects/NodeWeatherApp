const https = require('https');
const querystring = require('querystring');
const api = require('./api.json');
const printMessage = require('./print.js');
const printError = require('./errors.js')


function getWeather(query) {
  try {
    const parameters = {
      APPID: api.key,
      units: 'imperial'
    }

    const zipCode = parseInt(query);
    if (!isNaN(zipCode)) {
      parameters.zip = `${zipCode},us`
    } else {
      parameters.q = `${query},us`
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?${querystring.stringify(parameters)}`
    console.log(url);

    const request = https.get(url, response => {
      if (response.statusCode === 200) {
        let body = ""

        //Get Data
        response.on('data', data => {
          body += data.toString();
        });

        //Parse Data into JSON
        response.on('end', () => {
          try {
            const data = JSON.parse(body);
            // console.log(data);
            printMessage.print(data);
          } catch (error) {
            printError.printJsonError(error);
          }
        });
      } else {
        let location = query;
        printError.printStatusError(location, response.statusCode);
      }


    });

    request.on('error', error => {
      printError.print(error);
    });
  } catch {
    printError.print(error);
  }
}



module.exports.get = getWeather;
