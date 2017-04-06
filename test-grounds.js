var ASQ = require("asynquence");

ASQ()
  .then(function(done) {
    console.log("working");
    done("hi");
  })
  .then(function(done, msg) {
    console.log(msg);
    done();
  })
