const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();
const axios = require('axios');
var parser = require('xml2json');

const cors = require("cors");
//app.options("*", cors({ origin: 'http://localhost:3001', optionsSuccessStatus: 200 }));
//app.use(cors({ origin: "http://localhost:3001", optionsSuccessStatus: 200 }));
app.use(cors());

app.get("/drones", (req, res) => {
  //  if(req.params.id == 1)
  //  console.log("heelo");
  //  if(req.params.id == 2)
  //  console.log("world");

    axios({
        method: 'get',
        url: 'https://assignments.reaktor.com/birdnest/drones',
        responseType: 'xml'
      })
        .then(function (response) {
         var json = parser.toJson(response.data);
         var jsonData = JSON.parse(json);
         //const map = new Map(Object.entries(JSON.parse(json)));
        console.log(jsonData.report.deviceInformation);  
        const map1 = new Map(Object.entries(jsonData.report.capture));
        console.log(map1);
        const m = jsonData.report.capture;
        //res.send({message:[...map1]});
        res.send(m);
        //res.json({ message: [...map1]});
        });
  });
  

app.get('/pilots/:serialNumber', (req, res) => {
  axios({
    method: 'get',
    url: `https://assignments.reaktor.com/birdnest/pilots/${req.params.serialNumber}`,
    responseType: 'xml'
  })
    .then(function (response) {
    var json = JSON.parse(response.data);
     //res.json({ message: json});
     res.send(json);
    });
});



app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });