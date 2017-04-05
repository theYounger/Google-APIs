var http = require("https");

//for http.request

// function redditRes(res) {
//   res.on("data", function resStream(chunk) {
//     console.log(`in ${this}`);
//     console.log(`BODY: ${chunk}`);
//   });
//   res.on("end", function resEnd() {
//     console.log("No more data in response.");
//   });
// }

// var options = {
//   host: "www.reddit.com",
//   path: "/r/The_Donald/.json",
//   method: "GET",
//   headers: {
//     "Content-Type": "application/x-www-form-urlencoded",
//   }
// };

// var req = http.request(options, redditRes);

// http.get('http://nodejs.org/dist/index.json', (res) => {
//   const statusCode = res.statusCode;
//   const contentType = res.headers["content-type"];

//   res.setEncoding("utf8");
//   let rawData = "";
//   res.on("data", (chunk) => rawData += chunk);
//   res.on("end", () => {
//     try {
//       let parsedData = JSON.parse(rawData);
//       console.log(parsedData);
//     } catch (e) {
//       console.log(e.message);
//     }

//   });
// }).on("error", (e) => {
//   console.log("Got error: " + e.message);
// });

var req = http.get('https://www.reddit.com/r/The_Donald.json', (res) => {
  // const statusCode = res.statusCode;
  // const contentType = res.headers['content-type'];

  // let error;
  // if (statusCode !== 200) {
  //   error = new Error(`Request Failed.\n` +
  //                     `Status Code: ${statusCode}`);
  // } else if (!/^application\/json/.test(contentType)) {
  //   error = new Error(`Invalid content-type.\n` +
  //                     `Expected application/json but received ${contentType}`);
  // }
  // if (error) {
  //   console.log(error.message);
  //   // consume response data to free up memory
  //   res.resume();
  //   return;
  // }
  res.setEncoding('utf8');
  let rawData = '';
  res.on('data', (chunk) => rawData += chunk);
  res.on('end', () => {
    try {
      let parsedData = JSON.parse(rawData);
      console.log(parsedData);
    } catch (e) {
      console.log(e.message);
    }
  });
}).on('error', (e) => {
  console.log(`Got error: ${e.message}`);
});

// console.log(req);