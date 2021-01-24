// Core
require("dotenv").config();
const path = require("path");
const result = require("dotenv").config({
  path: path.resolve(process.cwd(), "./.env.local"),
});
if (result.error) {
  throw result.error;
}
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const fs = require("fs");

const pathToViews = path.join(__dirname, "views");

app.set("views", pathToViews);
app.set("view engine", "ejs");

// Global variable
global.__basedir = __dirname;

//Parse each call
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Removing security check that can block in localhost (it blocks if https is missing)
if (process.env.NODE_ENV === "development") {
  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
}

app.use("/api", require("./routes/api/index.js"));
app.use("/authentication", require("./routes/authentication/index.js"));
app.use("/payment", require("./routes/payment/index.js"));

app.get("/", (req, res) => {
  res.render("homepage");
});

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "../build")));

// Handles any requests that don't match the ones above
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
  // res.sendFile(path.resolve(process.cwd(), "./build/index.html")));
  // res.status(200).json("HomePage for SSR2");
});

const port = process.env.PORT || 3000;
app.listen(port);

console.log("App is listening on port " + port, "log at", Date.now().getTime());
