const express = require("express");
const router = express.Router();
const Rest = require("../../models/restaurant");

router.get("/:method", (req, res) => {
  //為什麼 window 未定義????
  // console.log(window.location);
  // const keyword = req.query.keyword.toLowerCase();
  const method = req.params.method;

  Rest.find()
    .lean()
    .sort({ _id: `${method}` })
    .then((rests) => res.render("index", { resList: rests }))
    .catch((error) => console.error(error));
});

module.exports = router;
