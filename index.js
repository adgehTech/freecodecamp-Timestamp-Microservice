// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/:date?", function (req, res) {
  const date = req.params.date;

  if (!date) {
    // Handle the case when date is empty
    const currentUnix = new Date().getTime();
    const currentUtc = new Date().toUTCString();
    res.json({ unix: currentUnix, utc: currentUtc });
  } else {
    // Handle the case when a date is provided
    const dateObj = new Date(date);

    if (dateObj.toString() === "Invalid Date") {
      if (/^\d+$/.test(date)) {
        // Handle the case when a Unix timestamp is provided
        const unix = parseInt(date);
        const dateObj = new Date(unix);
        const utc = dateObj.toUTCString();
        res.json({ unix, utc });
      }
      res.json({ error: "Invalid Date" });
    } else {
      // Handle the case when a valid date is provided
      const unix = dateObj.getTime();
      const utc = dateObj.toUTCString();
      res.json({ unix, utc });
    }
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
