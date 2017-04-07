const fs = require("fs");

module.exports = (function() {
  function lineParser(CSVFile) {
    const CSVFileStr = fs.readFileSync(CSVFile).toString();
    const lineArr = CSVFileStr.split("\r\n");
    return lineArr;
  }

  function __getUsrIDs(CSVFile) {
    const lineArr = lineParser(CSVFile);
    var IDsArr = [];
    for(let i = 1; i < lineArr.length; i++) {
      const usrID = /.*,(\d+),/g.exec(lineArr[i]);
      IDsArr.push(usrID[1]);
    }
    return IDsArr;
  }

  return {
    getUsrIDs: __getUsrIDs
  }
})();
