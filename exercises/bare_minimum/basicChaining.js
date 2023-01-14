/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var getStatusCodeAsync = require('./promiseConstructor').getStatusCodeAsync;
var pluckFirstLineFromFileAsync = require('./promiseConstructor').pluckFirstLineFromFileAsync;
var request = require('needle');



var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  // TODO
  //var firstLine = (data.match(/^(.*)$/m) || [])[1] || '';
  var getResponseAsync = function(url) {
    return new Promise ((resolve, reject) => {
      request.get(url, (err, response, body) => {
        if (err) {
          reject(err);
        } else {
          console.log('the body is: ', body);
          resolve(body);
        }
      });
    });
  };

  return pluckFirstLineFromFileAsync(readFilePath)
    .then((url) => getResponseAsync('https://api.github.com/users/' + url))
    .then((response) => fs.writeFileSync(writeFilePath, JSON.stringify(response)));
  //send request for profile .then write response to writeFilePath

  // var getStatusCode = function (url, callback) {
  //   // TODO
  //   request.get(url).then(response).catch(err), (err, response) => {
  //     if (err) {
  //       callback(err);
  //     } else {
  //       callback(null, response.statusCode);
  //     }
  //   });
  // };
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
