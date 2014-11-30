var express = require('express'),
  bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.use('/secretSanta', express.static(__dirname + '/client/dev/dist'));
app.use('/resources', express.static(__dirname + '/client/resources'));

app.use(function (req, res) {
  res.sendStatus(404);
});

var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('secret santa matching happens on port', port);
});
