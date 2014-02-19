var express = require('express'),
    request = require('request'),
    crypto  = require('crypto'),
    app     = express();

var options = {
  url: 'http://gateway.marvel.com/v1/public/characters',
  json: true,
  privkey: '',
  qs: {
    apikey: '',
    ts: Date.now()
  }
};
options.qs.hash = crypto.createHash('md5').update(options.qs.ts + options.privkey + options.qs.apikey).digest('hex');

app.get('/characters', function(req, res) {

  request(options, function(err, response, body) {
    if (!err && response.statusCode == 200) {
      res.end(JSON.stringify(body));
    } else {
      console.log(response.statusCode);
    }
  });

});

app.get('/', function(req, res) {
  res.end('funfou');
});

app.listen(9000, function () {
  console.log("App started at port 9000");
});

