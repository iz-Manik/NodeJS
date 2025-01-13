const fs = require("fs");

function log(filename) {
  return function (req, res, next) {
    fs.appendFile(filename, `${req.method} ${req.url}\n`, (err) => {
      if (err) {
        console.log(err);
      }
    });
  };
}

module.exports = log;