var cred = require("./cred.js");
var https = require("https");

function bearerHandler(res) {
  const statusCode = res.statusCode;
  var location = res.headers.location;

  if(statusCode == 301) {
    location = /(.*:\/\/)?(.+\.com)(.+)/.exec(location);
    options = {
      host: location[2],
      path: location[3],
      method: "GET"
    }
    var req = https.request(options, bearerHandler);
    req.on("error", (e) => {
      console.log(`problem with request: ${e.message}`);
    });
    req.end();
    res.resume();
    return;
  }

  var rawData = "";
  res.
    on("data", (chunk) => {
      rawData += chunk;
    })
    .on("end", () => {
      var parsedData = JSON.parse(rawData);
      console.log(parsedData);
  });
}

var options = {
  host: "reddit.com",
  path: "/r/the_donald.json",
  method: "GET"
}

var req = https.request(options, bearerHandler);

req.on("error", (e) => {
  console.log(`problem with request: ${e.message}`);
});

req.end();

// var options = {
//   hostname: "api.twitter.com",
//   path: "/oath2/token",
//   method: "POST",
//   auth: "849490865861079040-7ryarIWufD8NrTN8209YvW3ZLWjAUJA",
//   headers: {
//     "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
//   }
// }

// req.write("grant_type=client_credentials");
