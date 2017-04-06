var cred = require("./cred");
var https = require("https");
var fs = require("fs");
var ASQ = require("asynquence");
var twitList = require("./csv-reader.js");
var fileData = twitList.getFileData("twitter-list.csv")
var userIDs = twitList.getUserIDs(fileData);

function queryHandler(res) {
  const status = {
    code: res.statusCode,
    message: res.statusMessage
  }
  if(status.code !== 200) {
    console.log(status.code, status.message);
  }

  var rawData = "";
  res
    .on("data", function(chunk) {
      rawData += chunk;
    })
    .on("end", function() {
      var parsedData = JSON.parse(rawData);
      var pushData = {};
      for(let i in parsedData) {
        if(i === "status") {
          break;
        }
        if(i !== "entities") {
          pushData[i] = parsedData[i];
        }
      }
      console.log(pushData);
      twitObj.twitTable.push(pushData);
      if(twitObj.twitTable.length === userIDs.length)  {
        ASQ()
          .then(function(done) {
            var str = JSON.stringify(twitObj, null, "\t");
            fs.writeFile("twitter-list.json", str, 'utf8', function() {
              console.log("write-file finished");
            })
          });
      }
    });
}

var twitObj = {
  twitTable: []
};
for(var i = 0; i < userIDs.length; i++) {
  var options = {
    host: "api.twitter.com",
    path: `/1.1/users/show.json?user_id=${userIDs[i]}`,
    method: "GET",
    headers: {
      "Authorization": `Bearer ${cred.bearerToken}`
    }
  }
  https.request(options, queryHandler)
    .on("error", function eHandler(e) {
      console.log(`problem with request: ${e.massage}`);
    })
    .end();
}
