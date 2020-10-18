const express = require("express");
const router = express.Router();
const Rest = require("../../models/restaurant");

//set route
router.get("/", (req, res) => {
  const keyword = req.query.keyword.toLowerCase();
  // 不會使用mongoose-find的includes的功能
  Rest.find()
    .lean()
    .then((rests) => {
      const searchRes = rests.filter((rest) =>
        rest.name.toLowerCase().includes(keyword)
      );
      const searchRes2 = rests.filter((rest) =>
        rest.category.toLowerCase().includes(keyword)
      );
      const searchResult = searchRes.concat(searchRes2);
      res.render("index", { resList: searchResult, keyword });
    })
    .catch((error) => console.error(error));
});

module.exports = router;
