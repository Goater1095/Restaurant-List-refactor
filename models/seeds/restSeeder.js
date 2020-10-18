const db = require("../../config/mongoose");
const restList = require("../../restaurant.json");

// 載入model
const Rest = require("../restaurant");

db.once("open", () => {
  for (let object of restList.results) {
    Rest.create(object);
  }
  console.log("Done!");
});
