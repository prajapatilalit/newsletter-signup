const express = require("express");
const request = require("request");

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname, "/signup.html");
});

app.listen(port, function () {
  console.log("Server running on port: " + port);
});
