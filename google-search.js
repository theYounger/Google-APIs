var http = require("http");

function redditRes(res) {
  res.on("data", function resStream(chunk) {
    console.log(`in ${this}`);
    console.log(`BODY: ${chunk}`);
  });
  res.on("end", function resEnd() {
    console.log("No more data in response.");
  });
}

var options = {
  host: "www.reddit.com",
  path: "/r/The_Donald/.json",
  method: "GET",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  }
};

var req = http.request(options, redditRes);

req.end();
