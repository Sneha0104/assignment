const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();
const axios = require('axios');
var parser = require('xml2json');

app.get("/drones", (req, res) => {
    axios({
        method: 'get',
        url: 'https://assignments.reaktor.com/birdnest/drones',
        responseType: 'xml'
      })
        .then(function (response) {
         var json = parser.toJson(response.data);

          res.json({ message: json});
        });
  });
  

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });