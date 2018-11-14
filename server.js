const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const dns = require('dns');


var port = process.env.PORT || 3000;

var app = express();
app.use(cors());
app.use(bodyParser.json());
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'hbs');



app.get('/', (req, res) => {
res.status(200).sendFile(path.join(__dirname, 'public', 'index.html'));
});



  app.post('/api/shorturl/new', urlencodedParser, (req, res) => {
    console.log(req.body.url);
    console.log(req.body);
    var url = req.body.url;
    url = url.replace(/(^\w+:|^)\/\//, '');
    console.log(url);
    dns.lookup(url, (err, address, family) => {
    if(err) {
      return res.send({"error":"invalid URL"})
    }
    else {
      return res.send({"original_url": req.body.url,"short_url":1});
    }
  })
  })



app.listen(port, () => {
  console.log(`the server is up on ${port}`);
})
