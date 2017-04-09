var sequel = require("./index.js");
var twitterUsers = require("../lists/twitter-list.json");

var Users = sequel.define("users", {
      "user_id": sequel.Sequelize.BIGINT,
      "id_str": sequel.Sequelize.STRING,
      "name": sequel.Sequelize.STRING,
      "screen_name": sequel.Sequelize.STRING,
      "location": sequel.Sequelize.STRING,
      "description": sequel.Sequelize.STRING(1234),
      "url": sequel.Sequelize.STRING,
      "protected": sequel.Sequelize.BOOLEAN,
      "followers_count": sequel.Sequelize.INTEGER,
      "friends_count": sequel.Sequelize.INTEGER,
      "listed_count": sequel.Sequelize.INTEGER,
      "created_at": sequel.Sequelize.DATE,
      "favourites_count": sequel.Sequelize.INTEGER,
      "utc_offset": sequel.Sequelize.INTEGER,
      "time_zone": sequel.Sequelize.STRING,
      "geo_enabled": sequel.Sequelize.BOOLEAN,
      "verified": sequel.Sequelize.BOOLEAN,
      "statuses_count": sequel.Sequelize.INTEGER,
      "lang": sequel.Sequelize.STRING,
}, {
  freezeTableName: true,
});

var twitTable = twitterUsers.twitTable
Users.sync({force: true}).then(function whenSynced() {
  for(let i = 0; i < twitTable.length; i++) {
    Users.create({
      "user_id": twitTable[i].id,
      "id_str": twitTable[i].id_str,
      "name": twitTable[i].name,
      "screen_name": twitTable[i].screen_name,
      "location": twitTable[i].location,
      "description": twitTable[i].description,
      "url": twitTable[i].url,
      "protected": twitTable[i].protected,
      "followers_count": twitTable[i].followers_count,
      "friends_count": twitTable[i].friends_count,
      "listed_count": twitTable[i].listed_count,
      "created_at": twitTable[i].created_at,
      "favourites_count": twitTable[i].favourites_count,
      "utc_offset": twitTable[i].utc_offset,
      "time_zone": twitTable[i].time_zone,
      "geo_enabled": twitTable[i].geo_enabled,
      "verified": twitTable[i].verified,
      "statuses_count": twitTable[i].statuses_count,
      "lang": twitTable[i].lang,
    })
  }
})