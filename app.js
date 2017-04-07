const https = require("https");
const fs = require("fs");
const ASQ = require("asynquence");
const cred = require("./cred.js");
const CSVParser = require("./CSV-parser.js");
const usrIDsArr = CSVParser.getUsrIDs("./lists/twitter-list.csv");
var JSONObj = {
  dataArr: []
};

function apiQuerier(res) {
  var writefileName = "./lists/twitter-list.json";
  var status = {
    code: res.statusCode,
    message: res.statusMessage
  }
  if(status.code !== 200) {
    console.log(status.code, status.message);
  }

  var rawData = "";
  res
    .on("data", function whenData(chunk) {
      rawData += chunk;
    })
    .on("end", function whenEnd() {
      var parsedData = JSON.parse(rawData);
      var usr = {};

      for(let i in parsedData) {
        if(i === "status") {
          break;
        }
        if(typeof parsedData[i] !== "object") {
          usr[i] = parsedData[i];
        }
      }
      JSONObj.dataArr.push(usr);

      if(JSONObj.dataArr.length === condition)  {
        ASQ()
          .then(function writeJSONFile(done) {
            var JSONstr = JSON.stringify(JSONObj, null, "\t");
            fs.writeFile(writefileName, JSONstr, 'utf8', function writeDone() {
              console.log("Write file completed");
              done();
            });
          });
      }
    });
}

var options = {
  host: "api.twitter.com",
  method: "GET",
  headers: {
    "Authorization": `Bearer ${cred.bearerToken}`
  }
}
const condition = usrIDsArr.length;
for(let i = 0; i < condition; i++) {
  options.path = `/1.1/users/show.json?user_id=${usrIDsArr[i]}`
  https.request(options, apiQuerier)
    .on("error", function whenError(error) {
      console.log(`problem with request: ${error.massage}`);
    })
    .end();
}
