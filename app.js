const express = require("express");
const request = require("request");
const path = require("path");

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.listen(port, function () {
  console.log("Server running on port: " + port);
});
