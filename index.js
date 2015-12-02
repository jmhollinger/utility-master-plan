var express = require('express');
var stormpath = require('express-stormpath');
var bodyParser = require('body-parser');
var request = require('request');

var app = express()

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'jade');

app.use(stormpath.init(app, {
    web: {
    login: {
      enabled: true
    },
    logout: {
      enabled: true
    },
    register: {
      enabled: false
    }
  }
}));

app.get('/', stormpath.groupsRequired(['Utilities', 'Admins'], false), function (req, res) {
  res.render('landing', {"user" : req.user.givenName + ' ' + req.user.surname, 'user_f': req.user.givenName });
});


app.get('/cgas', stormpath.groupsRequired(['CGAS', 'Admins'], false), function (req, res) {
  res.render('form', {"utility": "Columbia Gas", "user": req.user.givenName + ' ' + req.user.surname, 'user_f': req.user.givenName  });
});

app.get('/ku', stormpath.groupsRequired(['KU', 'Admins'], false), function (req, res) {
  res.render('form', {"utility": "Kentucky Utilities", "user": req.user.givenName + ' ' + req.user.surname, 'user_f': req.user.givenName  });
});

app.get('/datalink', stormpath.groupsRequired(['DataLink', 'Admins'], false), function (req, res) {
  res.render('form', {"utility": "DataLink", "user": req.user.givenName + ' ' + req.user.surname, 'user_f': req.user.givenName  });
});

app.get('/kywired', stormpath.groupsRequired(['KyWired', 'Admins'], false), function (req, res) {
  res.render('form', {"utility": "Kentucky Wired Network", "user": req.user.givenName + ' ' + req.user.surname, 'user_f': req.user.givenName  });
});

app.get('/level3', stormpath.groupsRequired(['Level3', 'Admins'], false), function (req, res) {
  console.log(req.user.getCustomData)
  console.log(req.user.customData)
  res.render('form', {"utility": "Level 3 Communications", "user": req.user.givenName + ' ' + req.user.surname, 'user_f': req.user.givenName, 'email': req.user.email, 'phone': req.user.getCustomData.phone });
});

app.get('/lfucg-ss', stormpath.groupsRequired(['LFUCG-SS', 'Admins'], false), function (req, res) {
  res.render('form', {"utility": "LFUCG - Sanitary Sewers", "user": req.user.givenName + ' ' + req.user.surname, 'user_f': req.user.givenName  });
});

app.get('/windstream', stormpath.groupsRequired(['Windstream', 'Admins'], false), function (req, res) {
  res.render('form', {"utility": "Windstream", "user": req.user.givenName + ' ' + req.user.surname, 'user_f': req.user.givenName  });
});

app.get('/kawc', stormpath.groupsRequired(['KAWC', 'Admins'], false), function (req, res) {
  res.render('form', {"utility": "Kentucky American Water Company", "user": req.user.givenName + ' ' + req.user.surname, 'user_f': req.user.givenName  });
});

app.get('/twc', stormpath.groupsRequired(['TWC', 'Admins'], false), function (req, res) {
  res.render('form', {"utility": "Time Warner", "user": req.user.givenName + ' ' + req.user.surname, 'user_f': req.user.givenName  });
});

app.get('/crowncastle', stormpath.groupsRequired(['CrownCastle', 'Admins'], false), function (req, res) {
  res.render('form', {"utility": "Crown Castle", "user": req.user.givenName + ' ' + req.user.surname, 'user_f': req.user.givenName });
});

app.get('/crowncastle', stormpath.groupsRequired(['Other', 'Admins'], false), function (req, res) {
  res.render('form', {"utility": "", "user": req.user.givenName + ' ' + req.user.surname, 'user_f': req.user.givenName });
});

app.post('/submit', function (req, res) {

function format_date(date){
var arr = date.split("/")
return arr[2] + '-' + arr[0] + '-' + arr[1] 
}

var spreadsheetkey = '1zmrxXEmIHvRRyIAlKCOP7pJVKsFXQRlIWIO0SR3m7D4'  

var properties = {
        "Utility" : req.body.utility,
        "SubmittedBy" : req.body.submitter,
        "Name" : req.body.name,
        "Description" : req.body.desc,
        "StartDate" : req.body.start,
        "EndDate" : req.body.end,
        "Type" : req.body.type,
        "StreetCut" : req.body.streetcut,
        "DaysinROW" : req.body.daysinrow
      }

var feature = '{"type": "Feature", "properties":' + JSON.stringify(properties) + ', "geometry": ' + req.body.coordinates + '}'

var data_google = {
  "entry.372192304" : req.body.utility,
  "entry.1854949369" : req.body.submitter, 
  "entry.1791471663" : req.body.name,
  "entry.959945629" : req.body.desc,
  "entry.2073523555" : format_date(req.body.start),
  "entry.1949851848" : format_date(req.body.end),
  "entry.1836361517" : req.body.type,
  "entry.1678818035" : req.body.streetcut,
  "entry.1974169754" : req.body.daysinrow,
  "entry.2073488365" : feature
}

request.post('https://docs.google.com/forms/d/'+ spreadsheetkey +'/formResponse', {form:data_google}, function(err,httpResponse,body){ 
  if (httpResponse.statusCode === 200 && body.match("Your response has been recorded.")) {
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
        "GoogleResponse" : httpResponse.statusCode,
        "Feature" : feature
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