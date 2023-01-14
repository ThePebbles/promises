/**
 * Implement these promise-returning functions.
 * Any successful value should be made available in the next `then` block chained
 * to the function invocation, while errors should be available in the `catch` block
 */

var fs = require('fs');
var request = require('needle');
var Promise = require('bluebird');
// http://bluebirdjs.com/docs/api/new-promise.html

// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFileAsync = function(filePath) {
  // TODO
  //readFile().then(callback(null, stuff)).catch
  // fs.readFile(filePath, 'utf-8', (err, data) => {
  //   if (err) {
  //     console.log('heres the error', err);
  //     callback(err);
  //   } else {
  //     var firstLine = (data.match(/^(.*)$/m) || [])[1] || '';
  //     console.log('here is the firstline: ', firstLine);
  //     callback(null, firstLine);
  //   }
  // });

  return new Promise((resolve, reject) => {
  /*     fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      reject(err);
    } else {
      var firstLine = (data.match(/^(.*)$/m) || [])[1] || '';
      resolve(firstLine);
    }
  }) */
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        var firstLine = (data.match(/^(.*)$/m) || [])[1] || '';
        resolve(firstLine);
      }
    });
  });
};

// This function should retrieve the status code of a GET request to `url`
var getStatusCodeAsync = function(url) {
  // TODO
  // request.get(url, (err, response) => {
  //   if (err) {
  //     callback(err);
  //   } else {
  //     callback(null, response.statusCode);
  //   }
  // });
  return new Promise ((resolve, reject) => {
    request.get(url, (err, response) => {
      if (err) {
        reject(err);
      } else {
        resolve(response.statusCode);
      }
    });
  });

};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCodeAsync: getStatusCodeAsync,
  pluckFirstLineFromFileAsync: pluckFirstLineFromFileAsync
};
