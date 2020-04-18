require("dotenv").config();
const express = require("express"),
  routes = require("./routes/index");
const app = express();
const port = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));

routes(app);

app.listen(port);

console.log("API server is listening on port " + port);
