var str = "https://www.reddit.com/r/the_donald.json";

var host = /.+\.com/.exec(str);
var path = /.com(.+)/.exec(str);

host = str.match(/.+\.com/);
path = str.match(/.com(.+)/);

console.log(host)
console.log(path)