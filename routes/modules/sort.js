const express = require("express");
const router = express.Router();
const Rest = require("../../models/restaurant");

router.get("/:keyword", (req, res) => {
  //為什麼 window 未定義????
  // console.log(window.location);
  const keyword = req.params.keyword;
  let [method, select] = keyword.split("-");
  Rest.find()
    .lean()
    .sort({ [select]: [method] })
    .then((rests) => res.render("index", { resList: rests }))
    .catch((error) => console.error(error));
});

module.exports = router;
