const express = require("express");
const exhbs = require("express-handlebars");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

const Rest = require("./models/restaurant");
const routes = require("./routes");

const app = express();
const port = 3000;
// DB server set
mongoose.connect("mongodb://localhost/restaurant-list", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", () => {
  console.log("mongodb error!");
});
db.once("open", () => {
  console.log("mongodb connected!");
});

//set static folder
app.use(express.static("public"));
//set body-parser
app.use(bodyParser.urlencoded({ extended: true }));
//set method-override
app.use(methodOverride("_method"));
//將request 導入router
app.use(routes);

//set template engine
app.engine("hbs", exhbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");

//set route
app.get("/search", (req, res) => {
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

//路由不能使用/restaurants/new 會跟/restaurant/:id衝突??
// app.get("/new", (req, res) => {
//   res.render("new");
// });

//啟動server
app.listen(port, () => {
  console.log(`This Server is start on http://localhost:${port}`);
});
