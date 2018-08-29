const http = require('http');

function statusError(query, statusCode)  {
  const message = `There was an error getting the weather for ${query}: (${http.STATUS_CODES[statusCode]})`
  const statusCodeError = new Error(message);
  console.error(message);
}

function jsonError(error) {
  const message = `There was a problem parsing the JSON: ${error}`
  const jsonErrorMessage = new Error(message);
  console.error(jsonErrorMessage);
}

function printError(error) {
  console.error(error.message);
}




module.exports.printStatusError = statusError;
module.exports.printJsonError = jsonError;
module.exports.print = printError;
