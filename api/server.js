const express = require('express');
//const path = require('path');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(express.static('public'));
app.use(cors());

app.get('/main', function (req, res) {
  const objQuests = JSON.parse(fs.readFileSync("data/MainPageInfo.json"));
   res.json(objQuests);
});

app.get('/info', function (req, res) {
   const objQuests = JSON.parse(fs.readFileSync("data/GeneralQuestsInfo.json"));
   const objFinishedQuests = JSON.parse(fs.readFileSync("data/FinishedQuestsLeafs.json"));
   res.json({"first": objQuests, "second": objFinishedQuests});
});

const port = process.env.PORT || 4000;

app.listen(port, ()=>{
        console.log('Listening on port ' + port);
});
