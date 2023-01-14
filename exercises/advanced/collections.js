/**
 * Using Promise.all, write a function, combineFirstLineOfManyFiles, that:
 *    1. Reads each file at the path in the `filePaths` array
 *    2. Plucks the first line of each file
 *    3. Joins each first line into a new file
 *      - The lines should be in the same order with respect to the input array
 *      - i.e. the second line in the new file should be the first line of `filePaths[1]`
 *    4. Writes the new file to the file located at `writePath`
 */
var fs = require('fs');
var Promise = require('bluebird');

var pluckFirstLineFromFileAsync = function(filePath) {
  return new Promise((resolve, reject) => {
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

var combineFirstLineOfManyFiles = function(filePaths, writePath) {
  // TODO
  //filePaths array
  var data = filePaths.map((path) => {
    return new Promise((resolve, reject) => {
      fs.readFile(path, 'utf-8', (err, data) => {
        if (err) {
          reject(err);
        } else {
          var firstLine = (data.match(/^(.*)$/m) || [])[1] || '';
          resolve(firstLine);
        }
      });
    });
  });

  return new Promise.all(data)
    .then((results) => {
      var combined = results[0];
      for (let i = 1; i < results.length; i++) {
        combined += '\n' + results[i];
      }
      return combined;
    }).then((combined) => fs.writeFileSync(writePath, combined));
//I am very hungry
//'\n' + array[2]
};

// Export these functions so we can unit test them
module.exports = {
  combineFirstLineOfManyFiles: combineFirstLineOfManyFiles
};