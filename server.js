var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = require('./routes');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', router);
app.use(express.static(__dirname + '/public'));
app.use('/scripts', express.static(__dirname + '/node_modules'));

app.set('views', __dirname + '/views');

app.listen(3000, function () {
  console.log('Beulah is listening on port 3000!');
});
