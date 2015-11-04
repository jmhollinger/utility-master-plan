var express = require('express');
var stormpath = require('express-stormpath');

var app = express()

app.use(express.static('public'));

app.set('view engine', 'jade');

/*app.use(stormpath.init(app, {
  // Optional configuration options.
  website: true
}));*/

app.get('/cgas', function (req, res) {
  res.render('main', {"utility": "Columbia Gas"});
});

app.get('/ku', function (req, res) {
  res.render('main', {"utility": "Kentucky Utilities"});
});

app.get('/kawc', function (req, res) {
  res.render('main', {"utility": "Kentucky American Water Company"});
});

app.get('/crowncastle', function (req, res) {
  res.render('main', {"utility": "Crown Castle"});
});

app.get('/success', function (req, res) {
  var link = req.query.orig
  res.render('success',{"redirect" : link});
});

/*app.on('stormpath.ready', function() {
  app.listen(process.env.PORT || 3000);
});*/

app.listen(process.env.PORT || 3000);