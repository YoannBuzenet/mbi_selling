// Core
require("dotenv").config();
require("dotenv").config({ path: "../.env.local" });
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const axios = require("axios");
const securityCheckAPI = require("./services/securityCheckAPI");
const fs = require("fs");

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

app.get("/", (req, res) => {
  res.status(200).json("HomePage for SSR");
});

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "../build")));

// Handles any requests that don't match the ones above
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
  // res.status(200).json("HomePage for SSR2");
});

const port = process.env.PORT || 3000;
app.listen(port);

console.log("App is listening on port " + port);
