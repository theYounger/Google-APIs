var fs = require("fs");
var writefileName = "./lists/twitter-list.json";
var copyNum = "";

function cb(exists) {
  if(!exists) {
    writefileName = `${writefileName}(${copyNum})`;
    fs.writeFile(writefileName, "hi", function() {
      console.log("write complete");
      return;
    });
  }
  fs.exists(`${writefileName}(${++copyNum})`, "sdfsdfsdf", cb);
}

  console.log('hi');
fs.exists(writefileName, "jksdjflsdfk", function() {
  console.log('hi');
})