var express = require('express');
var pg = require('pg');
var stormpath = require('express-stormpath');
var bodyParser = require('body-parser');
var json2csv = require('express-json2csv');
var moment = require('moment');

var app = express()

var https_redirect = function(req, res, next) {
    if (process.env.NODE_ENV === 'production') {
        if (req.headers['x-forwarded-proto'] != 'https') {
            return res.redirect('https://' + req.headers.host + req.url);
        } else {
            return next();
        }
    } else {
        return next();
    }
};

app.use(https_redirect);

app.use(json2csv)

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
  var user_phone = ''
  req.user.getCustomData(function(err, data){
    user_phone = data.phone
  })  
  res.render('landing', {"user" : req.user.givenName + ' ' + req.user.surname, 'user_f': req.user.givenName, 'email': req.user.email, 'phone': user_phone});
});

app.get('/map', stormpath.groupsRequired(['Utilities', 'Admins'], false), function (req, res) {
  res.render('map');
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

app.get('/api/v1/project/:id', stormpath.groupsRequired(['Utilities', 'Admins'], false), function (req, res) {
pg.connect(process.env.DATABASE_URL, function(err, client, done) {
        client.query({text: 'SELECT * FROM masterplanprojects WHERE projectid = $1;', values: [req.params.id]}, function(err, result) {
            done();
            if (err) {
                res.json({"success": false, "results": err});
            } else {

                res.json({"success" : true, "results" : result.rows});
            }
        });
    });
});

app.get('/project/:id', stormpath.groupsRequired(['Utilities', 'Admins'], false), function (req, res) {
pg.connect(process.env.DATABASE_URL, function(err, client, done) {
        client.query({text: 'SELECT * FROM masterplanprojects WHERE projectid = $1;', values: [req.params.id]}, function(err, result) {
            done();
            if (err) {
                res.render('error', {"success": false, "results": "error"});
            } else {

                var data = result.rows

                if (data.length > 0) {
                  res.render('project', {
                       "utility" : result.rows[0].utility,
                       "contact" : result.rows[0].contact,
                       "phone" : result.rows[0].phone,
                       "email" :  result.rows[0].email,
                       "datecreated" : moment(result.rows[0].datecreated).format('M/D/YYYY'),
                       "name" : result.rows[0].name,
                       "description" : result.rows[0].description,
                       "impacts" : result.rows[0].impacts,
                       "startdate" : moment(result.rows[0].startdate).format('M/D/YYYY'),
                       "enddate" : moment(result.rows[0].enddate).format('M/D/YYYY'),
                       "type" : result.rows[0].type,
                       "streetcut" : result.rows[0].streetcut,
                       "daysinrow" : result.rows[0].daysinrow,
                       "street" : result.rows[0].street,
                       "intersection1" : result.rows[0].intersection1,
                       "intersection2" : result.rows[0].intersection2,
                       "feature": result.rows[0].feature
                  });
                }
                else {
                  res.render('error', {})
                }
            }
        });
    });
});

app.get('/listsearch', stormpath.groupsRequired(['Utilities', 'Admins'], false), function (req, res) {
pg.connect(process.env.DATABASE_URL, function(err, client, done) {
        client.query({text: 'SELECT * FROM masterplanprojects WHERE description ILIKE $1;', values: ['%' + req.query.q + '%']}, function(err, result) {
            done();
            if (err) {
                res.json({"success": false, "results": "error"});
            } else {
                var formattedData = []
                var inputData = result.rows

                for (var i = inputData.length - 1; i >= 0; i--) {
                  var row = {
                       "utility" : inputData[i].utility,
                       "datecreated" : moment(inputData[i].datecreated).format('M/D/YYYY'),
                       "name" : inputData[i].name,
                       "description" : inputData[i].description,
                       "impacts" : inputData[i].impacts,
                       "startdate" : moment(inputData[i].startdate).format('M/D/YYYY'),
                       "enddate" : moment(inputData[i].enddate).format('M/D/YYYY'),
                       "type" : inputData[i].type,
                       "streetcut" : inputData[i].streetcut,
                       "daysinrow" : inputData[i].daysinrow,
                       "street" : inputData[i].street,
                       "intersection1" : inputData[i].intersection1,
                       "intersection2" : inputData[i].intersection2
                    }
                    formattedData.push(row)
                }


                res.render('list', {"success": true, "results": formattedData});
            }
        });
    });
});

app.get('/list', stormpath.groupsRequired(['Utilities', 'Admins'], false), function (req, res) {
pg.connect(process.env.DATABASE_URL, function(err, client, done) {
        client.query('SELECT * FROM masterplanprojects ORDER BY utility;', function(err, result) {
            done();
            if (err) {
                res.json({"success": false, "results": "error"});
            } else {
                var formattedData = []
                var inputData = result.rows

                for (var i = inputData.length - 1; i >= 0; i--) {
                  var row = {
                       "projectid" : inputData[i].projectid,
                       "utility" : inputData[i].utility,
                       "datecreated" : moment(inputData[i].datecreated).format('M/D/YYYY'),
                       "name" : inputData[i].name,
                       "description" : inputData[i].description,
                       "impacts" : inputData[i].impacts,
                       "startdate" : moment(inputData[i].startdate).format('M/D/YYYY'),
                       "enddate" : moment(inputData[i].enddate).format('M/D/YYYY'),
                       "type" : inputData[i].type,
                       "streetcut" : inputData[i].streetcut,
                       "daysinrow" : inputData[i].daysinrow,
                       "street" : inputData[i].street,
                       "intersection1" : inputData[i].intersection1,
                       "intersection2" : inputData[i].intersection2
                    }
                    formattedData.push(row)
                }


                res.render('list', {"success": true, "results": formattedData});
            }
        });
    });
});


app.post('/submit', function (req, res) {
    pg.connect(process.env.DATABASE_URL, function(err, client, done) {
            client.query({
                    text: 'INSERT INTO masterplanprojects (utility, contact, email, phone, name, description, impacts, startdate, enddate, type, streetcut, daysinrow, street, intersection1, intersection2, feature) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16) returning' +
                    ' utility, contact, email, phone, name, description, impacts, startdate, enddate, type, streetcut, daysinrow, street, intersection1, intersection2, feature',
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
                      req.body.crossstreet2,
                      req.body.coordinates
                    ]
                },function(err, result) {
                    done();
                    if (err) {
                        res.render('error')  
                    } else {
                        res.render('success',
                          {
                      "OriginURL" : req.headers.referer,
                      "Utility" : result.rows[0].utility,
                      "Contact" : result.rows[0].contact,
                      "Email" : result.rows[0].email,
                      "Phone" : result.rows[0].phone,
                      "Name" : result.rows[0].name,
                      "Description" : result.rows[0].description,
                      "Impacts" : result.rows[0].impacts,
                      "StartDate" : result.rows[0].startdate,
                      "EndDate" : result.rows[0].enddate,
                      "Type" : result.rows[0].type,
                      "StreetCut" : result.rows[0].streetcut,
                      "DaysinROW" : result.rows[0].daysinrow,
                      "Street" : result.rows[0].street,
                      "Intersection1" : result.rows[0].intersection1,
                      "Intersection2" : result.rows[0].intersection2,
                      "Feature" : result.rows[0].feature
          }

                          )           }
                });
    });
})

app.get('/api/v1/projectcsv', stormpath.groupsRequired(['Utilities', 'Admins'], false), function (req, res) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
        client.query('SELECT projectid, datecreated, utility, contact, email, phone, name, description, impacts, startdate, enddate, type, streetcut, daysinrow, street, intersection1, intersection2, feature FROM masterplanprojects ORDER BY utility DESC;', 
        function(err, result) {
            done();
 
            if (err) {
                res.render('error');
            } else {

              var columns = [
              {
                prop : 'projectid',
                label: 'ID'
              },
              {
                prop: 'datecreated',
                label: 'Date Entered'
              },
              {
                prop: 'utility',
                label: 'Utility'
              },
              {
                  prop: 'contact',
                  label: 'Contact'
              }, 
              {
                  prop: 'email',
                  label: 'Email'
              },
              {
                  prop: 'phone',
                  label: 'Phone'
              }, 
              {
                  prop: 'name',
                  label: 'Name'
              },
              {
                  prop: 'description',
                  label: 'Description'
              },{
                  prop: 'impacts',
                  label: 'Impacts'
              },{
                  prop: 'startdate',
                  label: 'Start Date'
              },{
                  prop: 'enddate',
                  label: 'End Date'
              },{
                  prop: 'type',
                  label: 'Type'
              }, {
                  prop: 'streetcut',
                  label: 'Street Cut'
              }, {
                  prop: 'daysinrow',
                  label: 'Days in ROW'
              }, {
                  prop: 'street',
                  label: 'Street'
              }, {
                  prop: 'intersection1',
                  label: 'Intersection Start'
              }, {
                  prop: 'intersection2',
                  label: 'Intersection End'
              }
              ]

              res.csv('masterplan-projects', result.rows, columns);
        
            }
        });
    });
});

app.get('/api/v1/projectmap', function (req, res) {
pg.connect(process.env.DATABASE_URL, function(err, client, done) {
        client.query('SELECT * FROM masterplanprojects ORDER BY utility DESC;', function(err, result) {
            done();
            if (err) {
                res.json({"success": false, "results": "error"});
            } else {
                var formattedData = []
                var inputData = result.rows

                for (var i = inputData.length - 1; i >= 0; i--) {
                  var row = {
                      "type": "Feature",
                      "properties": {
                       "Utility" : inputData[i].utility,
                       "DateCreated" : moment(inputData[i].datecreated).format('M/D/YYYY'),
                       "Name" : inputData[i].name,
                       "Description" : inputData[i].description,
                       "Impacts" : inputData[i].impacts,
                       "StartDate" : moment(inputData[i].startdate).format('M/D/YYYY'),
                       "EndDate" : moment(inputData[i].enddate).format('M/D/YYYY'),
                       "Type" : inputData[i].type,
                       "StreetCut" : inputData[i].streetcut,
                       "DaysinROW" : inputData[i].daysinrow,
                       "Street" : inputData[i].street,
                       "Intersection1" : inputData[i].intersection1,
                       "Intersection2" : inputData[i].intersection2,
                       "ProjectUrl" : "https://lfucg-master-plan.herokuapp.com/project/" + inputData[i].projectid
                      },
                      "geometry": inputData[i].feature
                    }
                    formattedData.push(row)
                }

                res.json(
                  {
                  "type": "FeatureCollection",
                  "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
                  "features": formattedData
                  }
                  );
            }
        });
    });
});


app.on('stormpath.ready', function() {
  app.listen(process.env.PORT || 3000);
});
