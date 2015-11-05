var express = require('express');
var stormpath = require('express-stormpath');
var bodyParser = require('body-parser');
var request = require('request');

var app = express()

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'jade');

app.use(stormpath.init(app, {
  enableLogin: true,
  enableLogout: true,
  enableRegistration: false
}));

app.get('/', stormpath.groupsRequired(['utilities', 'admins'], false), function (req, res) {
  res.render('landing');
});

app.get('/cgas', stormpath.groupsRequired(['columbia_gas', 'admins'], false), function (req, res) {
  res.render('form', {"utility": "Columbia Gas"});
});

app.get('/ku', stormpath.groupsRequired(['utilities'], false), function (req, res) {
  res.render('form', {"utility": "Kentucky Utilities"});
});

app.get('/kawc', stormpath.groupsRequired(['utilities'], false), function (req, res) {
  res.render('form', {"utility": "Kentucky American Water Company"});
});

app.get('/crowncastle', stormpath.groupsRequired(['utilities'], false), function (req, res) {
  res.render('form', {"utility": "Crown Castle"});
});

app.post('/submit', function (req, res) {

var spreadsheetkey = '1zmrxXEmIHvRRyIAlKCOP7pJVKsFXQRlIWIO0SR3m7D4'  

var data_google = {
  "entry.372192304" : req.body.utility,
  "entry.1854949369" : req.body.submitter, 
  "entry.1791471663" : req.body.name,
  "entry.959945629" : req.body.desc,
  "entry.2073523555" : req.body.start,
  "entry.1949851848" : req.body.end,
  "entry.1836361517" : req.body.type,
  "entry.1678818035" : req.body.streetcut,
  "entry.1974169754" : req.body.daysinrow,
  "entry.2073488365" : req.body.coordinates
}

request.post('https://docs.google.com/forms/d/'+ spreadsheetkey +'/formResponse', {form:data_google}, function(err,httpResponse,body){ 
  if (httpResponse.statusCode === 200) {
    res.render('success',
      {
        "OriginURL" : req.headers.referer,
        "Utility" : req.body.utility,
        "Submitter" : req.body.submitter,
        "Name" : req.body.name,
        "Description" : req.body.desc,
        "StartDate" : req.body.start,
        "EndDate" : req.body.end,
        "Type" : req.body.type,
        "StreetCut" : req.body.streetcut,
        "DaysinROW" : req.body.daysinrow,
        "Coordinates" : req.body.coordinates,
        "GoogleResponse" : httpResponse.statusCode
          }
      );
  }
  else {
    res.render('error',
      {
        "OriginURL" : req.headers.referer,
        "GoogleResponse" : httpResponse.statusCode
          }
      );
  }
})
});

app.on('stormpath.ready', function() {
  app.listen(process.env.PORT || 3000);
});