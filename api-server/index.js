var express = require('express');
var request = require('request');
var cors = require('cors');
const translator = require('google-translate-api');
var app = express();

var port = process.env.PORT || 3030;

const corsOptions = {
  origin: "http://localhost:3005",
  credentials: true
}

app.use(cors(corsOptions));
app.use(express.json());

var client_id = 'MI0E72S4jFKpD2s1Lq74';
var client_secret = 'Vmbqw9iKDD';

app.post('/node/translate', function (req, res) {
   var req_query = req.body.query || '';
   
   var api_url = 'https://openapi.naver.com/v1/papago/n2mt';
   var options = {
       url: api_url,
       form: {
           'source': 'en',
           'target': 'ko', 
           'text': req_query
        },
       headers: {
           'X-Naver-Client-Id': client_id, 
           'X-Naver-Client-Secret': client_secret
        }
    };
   
    request.post(options, function (error, response, body) {
     if (!error && response.statusCode == 200) {
       res.writeHead(200, {
           'Content-Type': 'text/json;charset=utf-8'
        });
       res.end(body);
     } else {
       res.status(response.statusCode).end();
       console.log('error = ' + response.statusCode);
     }
   });

 });
 
 app.listen(port, function () {
   console.log(`http://127.0.0.1:3000/translate app listening on port ${port}!`);
 });