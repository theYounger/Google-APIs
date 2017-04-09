var Sequelize = require("sequelize");
var options = {
  host: "localhost",
  port: "5432",
  dialect: "postgres",
  pool: {
    min: 0,
    max: 10,
    idle: 30000,
  },
}
var sequel = new Sequelize("twitter", "kyle", "hello8o896825", options);
// var sequelProto = sequel.__proto__;
// sequelProto.Sequelize =


module.exports = sequel;