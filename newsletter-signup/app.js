const express = require("express");
const bodyParser = require("body-parser");
const sendFile = require("express/lib/response");
const request = require("request");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  var firstName = req.body.fname;
  var lastName = req.body.lname;
  var email = req.body.email;

  // request data to mailchimp api
  var data = {
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

  // send the data as json format to mailchimp api
  var jsonData = JSON.stringify(data);

  const url = "https://us20.api.mailchimp.com/3.0/lists/3876d8fb4d";

  // set the url, method, headers and data
  var options = {
    method: "POST",
    auth: "abdulla1999:2b72cc5e4f503319920e23c6cee66537-us20",
  };

  // send the request
  var request = https.request(url, options, function (response) {
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

app.post("/failure", function (req, res) {
  res.redirect("/");
});

app.listen(3000);

// 2b72cc5e4f503319920e23c6cee66537-us20

// 3876d8fb4d
