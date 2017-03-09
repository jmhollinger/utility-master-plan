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

app.get('/map', stormpath.groupsRequired(['Utilities', 'Admins'], false), function (req, res) {
  res.render('map');
});

app.get('/', stormpath.groupsRequired(['Utilities', 'Admins'], false), function (req, res) {
  var user_phone = ''
  req.user.getCustomData(function(err, data){
    user_phone = data.phone
  })  
  res.render('landing', {"user" : req.user.givenName + ' ' + req.user.surname, 'user_f': req.user.givenName, 'email': req.user.email, 'phone': user_phone});
});

app.get('/lightower', stormpath.groupsRequired(['Lightower', 'Admins'], false), function (req, res) {
  var user_phone = ''
  req.user.getCustomData(function(err, data){
    user_phone = data.phone
  })  
  res.render('form', {"utility": "Lightower", "u_readonly" : true ,"user": req.user.givenName + ' ' + req.user.surname, 'user_f': req.user.givenName, 'email': req.user.email, 'phone': user_phone});
});

app.get('/ky-backhaul', stormpath.groupsRequired(['KY-Backhaul', 'Admins'], false), function (req, res) {
  var user_phone = ''
  req.user.getCustomData(function(err, data){
    user_phone = data.phone
  })  
  res.render('form', {"utility": "KY Backhaul", "u_readonly" : true ,"user": req.user.givenName + ' ' + req.user.surname, 'user_f': req.user.givenName, 'email': req.user.email, 'phone': user_phone});
});


app.get('/cgas', stormpath.groupsRequired(['CGAS', 'Admins'], false), function (req, res) {
  var user_phone = ''
  req.user.getCustomData(function(err, data){
    user_phone = data.phone
  })  
  res.render('form', {"utility": "Columbia Gas", "u_readonly" : true ,"user": req.user.givenName + ' ' + req.user.surname, 'user_f': req.user.givenName, 'email': req.user.email, 'phone': user_phone});
});

app.get('/ku', stormpath.groupsRequired(['KU', 'Admins'], false), function (req, res) {
  var user_phone = ''
  req.user.getCustomData(function(err, data){
    user_phone = data.phone
  })
  res.render('form', {"utility": "Kentucky Utilities", "u_readonly" : true ,"user": req.user.givenName + ' ' + req.user.surname, 'user_f': req.user.givenName, 'email': req.user.email, 'phone': user_phone });
});

app.get('/datalink', stormpath.groupsRequired(['DataLink', 'Admins'], false), function (req, res) {
  var user_phone = ''
  req.user.getCustomData(function(err, data){
    user_phone = data.phone
  })  
  res.render('form', {"utility": "DataLink", "u_readonly" : true , "user": req.user.givenName + ' ' + req.user.surname, 'user_f': req.user.givenName, 'email': req.user.email, 'phone': user_phone  });
});

app.get('/kywired', stormpath.groupsRequired(['KyWired', 'Admins'], false), function (req, res) {
  var user_phone = ''
  req.user.getCustomData(function(err, data){
    user_phone = data.phone
  })
  res.render('form', {"utility": "Kentucky Wired Network", "u_readonly" : true , "user": req.user.givenName + ' ' + req.user.surname, 'user_f': req.user.givenName, 'email': req.user.email, 'phone': user_phone  });
});

app.get('/level3', stormpath.groupsRequired(['Level3', 'Admins'], false), function (req, res) {
  var user_phone = ''
  req.user.getCustomData(function(err, data){
    user_phone = data.phone
  })
  res.render('form', {"utility": "Level 3 Communications", "u_readonly" : true , "user": req.user.givenName + ' ' + req.user.surname, 'user_f': req.user.givenName, 'email': req.user.email, 'phone': user_phone });
});

app.get('/lfucg-ss', stormpath.groupsRequired(['LFUCG-SS', 'Admins'], false), function (req, res) {
  var user_phone = ''
  req.user.getCustomData(function(err, data){
    user_phone = data.phone
  })  
  res.render('form', {"utility": "LFUCG - Sanitary Sewers", "u_readonly" : true , "user": req.user.givenName + ' ' + req.user.surname, 'user_f': req.user.givenName, 'email': req.user.email, 'phone': user_phone  });
});

app.get('/windstream', stormpath.groupsRequired(['Windstream', 'Admins'], false), function (req, res) {
  var user_phone = ''
  req.user.getCustomData(function(err, data){
    user_phone = data.phone
  })  
  res.render('form', {"utility": "Windstream", "u_readonly" : true , "user": req.user.givenName + ' ' + req.user.surname, 'user_f': req.user.givenName, 'email': req.user.email, 'phone': user_phone  });
});

app.get('/kawc', stormpath.groupsRequired(['KAWC', 'Admins'], false), function (req, res) {
  var user_phone = ''
  req.user.getCustomData(function(err, data){
    user_phone = data.phone
  })  
  res.render('form', {"utility": "Kentucky American Water Company", "u_readonly" : true , "user": req.user.givenName + ' ' + req.user.surname, 'user_f': req.user.givenName, 'email': req.user.email, 'phone': user_phone  });
});

app.get('/twc', stormpath.groupsRequired(['TWC', 'Admins'], false), function (req, res) {
  var user_phone = ''
  req.user.getCustomData(function(err, data){
    user_phone = data.phone
  })  
  res.render('form', {"utility": "Time Warner", "u_readonly" : true , "user": req.user.givenName + ' ' + req.user.surname, 'user_f': req.user.givenName, 'email': req.user.email, 'phone': user_phone  });
});

app.get('/crowncastle', stormpath.groupsRequired(['CrownCastle', 'Admins'], false), function (req, res) {
  var user_phone = ''
  req.user.getCustomData(function(err, data){
    user_phone = data.phone
  })
  res.render('form', {"utility": "Crown Castle", "u_readonly" : true , "user": req.user.givenName + ' ' + req.user.surname, 'user_f': req.user.givenName, 'email': req.user.email, 'phone': user_phone });
});

app.get('/delta', stormpath.groupsRequired(['Delta', 'Admins'], false), function (req, res) {
  var user_phone = ''
  req.user.getCustomData(function(err, data){
    user_phone = data.phone
  })
  res.render('form', {"utility": "Delta Gas", "u_readonly" : true , "user": req.user.givenName + ' ' + req.user.surname, 'user_f': req.user.givenName, 'email': req.user.email, 'phone': user_phone });
});

app.get('/att', stormpath.groupsRequired(['ATT', 'Admins'], false), function (req, res) {
  var user_phone = ''
  req.user.getCustomData(function(err, data){
    user_phone = data.phone
  })
  res.render('form', {"utility": "AT&T", "u_readonly" : true , "user": req.user.givenName + ' ' + req.user.surname, 'user_f': req.user.givenName, 'email': req.user.email, 'phone': user_phone });
});

app.get('/other', stormpath.groupsRequired(['Other', 'Admins'], false), function (req, res) {
  var user_phone = ''
  req.user.getCustomData(function(err, data){
    user_phone = data.phone
  })
  res.render('form', {"utility": "", "u_readonly" : false , "user": req.user.givenName + ' ' + req.user.surname, 'user_f': req.user.givenName, 'email': req.user.email, 'phone': user_phone });
});


app.post('/submit', function (req, res) {
    pg.connect(process.env.DATABASE_URL, function(err, client, done) {
            client.query({
                    text: 'INSERT INTO (utility, contact, email, phone, name, description, impacts, startdate, enddate, type, streetcut, daysinrow, street, intersection1, intersection2) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)',
                    values: [
                      req.body.utility,
                      req.body.contact,
                      req.body.email,
                      req.body.phone,
                      req.body.name,
                      req.body.desc,
                      req.body.impacts,
                      req.body.start,
                      req.body.end,
                      req.body.type,
                      req.body.streetcut,
                      req.body.daysinrow,
                      req.body.street,
                      req.body.crossstreet1,
                      req.body.crossstreet2
                    ]
                },function(err, result) {
                    done();
                    if (err) {
                        res.json({"success": false,"results": err});
                    } else {
                        res.json({"success" : true, "results" : result.rows});
                    }
                });
    });
})

app.post('/submit-deprecated', function (req, res) {

function format_date(date){
var arr = date.split("/")
return arr[2] + '-' + arr[0] + '-' + arr[1] 
}

var spreadsheetkey = '1zmrxXEmIHvRRyIAlKCOP7pJVKsFXQRlIWIO0SR3m7D4'  

var properties = {
        "Utility" : req.body.utility,
        "Contact" : req.body.contact,
        "Email" : req.body.email,
        "Phone" : req.body.phone,
        "Name" : req.body.name,
        "Description" : req.body.desc,
        "Impacts" : req.body.impacts,
        "StartDate" : req.body.start,
        "EndDate" : req.body.end,
        "Type" : req.body.type,
        "StreetCut" : req.body.streetcut,
        "DaysinROW" : req.body.daysinrow,
        "Street" : req.body.street,
        "Intersection1" : req.body.crossstreet1,
        "Intersection2" : req.body.crossstreet2
      }

var feature = '{"type": "Feature", "properties":' + JSON.stringify(properties) + ', "geometry": ' + req.body.coordinates + '}'

var data_google = {
  "entry.372192304" : req.body.utility,
  "entry.1854949369" : req.body.contact,
  "entry.200295644" : req.body.email,
  "entry.964881409" : req.body.phone,
  "entry.1791471663" : req.body.name,
  "entry.959945629" : req.body.desc,
  "entry.640114638" : req.body.impacts,
  "entry.2073523555" : format_date(req.body.start),
  "entry.1949851848" : format_date(req.body.end),
  "entry.1836361517" : req.body.type,
  "entry.1678818035" : req.body.streetcut,
  "entry.1974169754" : req.body.daysinrow,
  "entry.995078440" : req.body.street,
  "entry.215094489" : req.body.crossstreet1,
  "entry.493746314" : req.body.crossstreet2,
  "entry.2073488365" : feature
}

request.post('https://docs.google.com/forms/d/'+ spreadsheetkey +'/formResponse', {form:data_google}, function(err,httpResponse,body){
  if (httpResponse.statusCode === 200 && body.match("Your response has been recorded.")) {
    res.render('success',
      {
        "OriginURL" : req.headers.referer,
        "Utility" : req.body.utility,
        "Contact" : req.body.contact,
        "Email" : req.body.email,
        "Phone" : req.body.phone,
        "Name" : req.body.name,
        "Description" : req.body.desc,
        "Impacts" : req.body.impacts,
        "StartDate" : req.body.start,
        "EndDate" : req.body.end,
        "Type" : req.body.type,
        "StreetCut" : req.body.streetcut,
        "DaysinROW" : req.body.daysinrow,
        "Street" : req.body.street,
        "Intersection1" : req.body.crossstreet1,
        "Intersection2" : req.body.crossstreet2,
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