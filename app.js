const express = require("express");
const exhbs = require("express-handlebars");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

const Rest = require("./models/restaurant");
const routes = require("./routes");
const port = 3000;
require("./config/mongoose");

const app = express();

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

//啟動server
app.listen(port, () => {
  console.log(`This Server is start on http://localhost:${port}`);
});
