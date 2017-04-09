function __userQuery(res) {
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

function __followerQuery() {
  var writefileName = "./lists/twitter-followers.json";
  const status = {
    code: res.statusCode,
    message: res.statusMessage,
  }
  if(status.code !== 200) {
    console.log(status.code, status.message);
  }

  var rawData = "";
  res.on("data", function whenData() {

  })
}

module.exports = {
  userQuery: __userQuery,
  // followQuery: __followerQuery,
}