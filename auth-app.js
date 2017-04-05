var https = require("https");
var cred = require("./cred");

var btCred = new Buffer(`${cred.consumerKey}:${cred.consumerSecret}`).toString("base64");

function bearerHandler(res){
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
    });
}

var options = {
  host: "api.twitter.com",
  path: "/oauth2/token",
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    "Authorization": `Basic ${btCred}`
  }
};

https.request(options, bearerHandler)
  .on("error", function eHandler(e) {
    console.log(`problem with request: ${e.message}`);
  })
  .end("grant_type=client_credentials");
