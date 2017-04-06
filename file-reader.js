var fs = require("fs");

module.exports = (function() {
  function __getFileData(file) {
    var data = fs.readFileSync(file).toString();
    return data.split("\r\n");
  }

  function __getUserIDs(d) {
    var IDs = []  ;
    for(let i = 1; i < d.length; i++) {
      var result = /.*,(\d+),/g.exec(d[i]);
      IDs.push(result[1]);
    }
    return IDs;
  }

  return {
    test: "test",
    getFileData: __getFileData,
    getUserIDs: __getUserIDs
  }
})();