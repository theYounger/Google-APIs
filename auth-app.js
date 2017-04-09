const https = require("https");
const cred = require("./cred");

const consumerCred = new Buffer(`${cred.getConsumerKey()}:${cred.getConsumerSecret()}`).toString("base64");

function getBearerToken(res){
  const status = {
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
      const bearerToken = JSON.parse(rawData);
      const tokenType = bearerToken.token_type
      if(tokenType !== "bearer") {
        var tokenTypeError = new Error(`Unexpected token type: ${tokenType}`)
        throw tokenTypeError;
      }
      if(bearerToken.access_token === cred.getBearerToken()) {
        console.log("Current bearer token is still valid.");
        return;
      }
      cred.setBearerToken(bearerToken.access_token);
      console.log("New bearer token received!");
    });
}

var options = {
  host: "api.twitter.com",
  path: "/oauth2/token",
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    "Authorization": `Basic ${consumerCred}`
  }
};

https.request(options, getBearerToken)
  .on("error", function whenError(error) {
    console.log(`problem with request: ${error.message}`);
  })
  .end("grant_type=client_credentials");
