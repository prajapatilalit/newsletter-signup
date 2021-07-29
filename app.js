const express = require("express");
const request = require("request");
const https = require("https");
const path = require("path");

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us6.api.mailchimp.com/3.0/lists/4ea1eff89f";
  const option = {
    method: "POST",
    auth: "lalit1:1beac3e1451ad274e5b75559edaffa6f-us6",
  };

  const request = https.request(url, option, function (response) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end();
});

app.listen(port, function () {
  console.log("Server running on port: " + port);
});

// Api key:
// 1beac3e1451ad274e5b75559edaffa6f-us6

// Audiance id
// 4ea1eff89f
