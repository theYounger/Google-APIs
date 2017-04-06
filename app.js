var https = require("https");
var fs = require("fs");
var ASQ = require("asynquence");
var cred = require("./cred");
var fileReader = require("./file-reader.js");
var fileResults = fileReader.getFileData("./lists/twitter-list.csv")
var userIDs = fileReader.getUserIDs(fileResults);
var obj = {
  table: []
};

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
      obj.table.push(pushData);
      if(obj.table.length === userIDs.length)  {
        ASQ()
          .then(function(done) {
            var str = JSON.stringify(obj, null, "\t");
            fs.writeFile("./lists/twitter-list.json", str, 'utf8', function() {
              console.log("Write file complete");
            })
          });
      }
    });
}

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
    .on("error", function(e) {
      console.log(`problem with request: ${e.massage}`);
    })
    .end();
}
