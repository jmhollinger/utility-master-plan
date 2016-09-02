function initialize(){

  var markers = [];
  
  var mapOptions = {
    overviewMapControl:true,
    rotateControl:true,
    scaleControl:true,
    mapTypeControl: true,
    mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR, position:google.maps.ControlPosition.TOP_CENTER},
    zoomControl: true,
    zoomControlOptions: {style: google.maps.ZoomControlStyle.DEFAULT}
    };

 var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

var infowindow = new google.maps.InfoWindow();


  var blue = {
    strokeColor: '#2980b9',
    strokeWeight: 2,
    fillColor: '#2980b9',
    fillOpacity: '0.5'
    };

  var plan = new google.maps.Data()

//Get Master Plan Data
var public_spreadsheet_url = "1EAVolIEUmF9-1pIbybOs9-LLiagiaa3yTRUeSLb_dck"

var tabletop = Tabletop.init( { 
  key: public_spreadsheet_url,          
  simpleSheet: true,
  callback: showInfo } )

function showInfo(data, tabletop) {
  var features = []
  for (var i = data.length - 1; i >= 0; i--) {
    var feature = JSON.parse(data[i].Feature)
    features.push(feature)
}
 
  var obj = {
  "type": "FeatureCollection",
  "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
  "features": features
  }

  plan.addGeoJson(obj)

 }  
  
  plan.setStyle(function(feature){});

  plan.setStyle(blue);

  plan.setMap(map)
  

  plan.addListener('click', function(event) {
  
  var content =  
  '<h4>' + event.feature.getProperty("Utility") + '</h4>'
  '<p>' + event.getProperty("Street") +  '</p>'
  '<p>' + event.getProperty("Intersection1") + ' - ' +  event.getProperty("Intersection2") +   '</p>' +
  '<strong>Name: </strong>' + event.feature.getProperty("Name") + 
  '<strong>Description: </strong>' + event.feature.getProperty("Description") + 
  '<strong>Impacts: </strong>' + event.feature.getProperty("Impacts") +  
  '<strong>Start Date: </strong>' + event.feature.getProperty("StartDate") + 
  '<strong>End Date: </strong>' + event.feature.getProperty("EndDate") +
  '<strong>Days in ROW: </strong>' + event.feature.getProperty("DaysinROW") + 
  '<strong>Type: </strong>' + event.feature.getProperty("Type") + 
 '<strong>Street Cut: </strong>' + event.feature.getProperty("StreetCut") 
  
    infowindow.setContent(content)

    var anchor = new google.maps.MVCObject();
        anchor.setValues({ //position of the point
            position: event.latLng,
            anchorPoint: new google.maps.Point(0, 0)
        });

    infowindow.open(map, anchor);
  });
   

  var defaultBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(37.921971, -84.663139),
      new google.maps.LatLng(38.155595, -84.334923)
      );
  
  map.fitBounds(defaultBounds);

  // Create the search box and link it to the UI element.
  var input = /** @type {HTMLInputElement} */(
      document.getElementById('pac-input'));

  var searchBox = new google.maps.places.SearchBox(
    /** @type {HTMLInputElement} */(input));

  // [START region_getplaces]
  // Listen for the event fired when the user selects an item from the
  // pick list. Retrieve the matching places for that item.
  google.maps.event.addListener(searchBox, 'places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }
    for (var i = 0, marker; marker = markers[i]; i++) {
      marker.setMap(null);
    }

    // For each place, get the icon, place name, and location.
    markers = [];
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0, place; place = places[i]; i++) {
      var image = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      var marker = new google.maps.Marker({
        map: map,
        icon: image,
        title: place.name,
        position: place.geometry.location
      });

      markers.push(marker);

      bounds.extend(place.geometry.location);
    }
    
    map.fitBounds(bounds);
    map.setZoom(15)
  });
  // [END region_getplaces]



  // Bias the SearchBox results towards places that are within the bounds of the
  // current map's viewport.
  google.maps.event.addListener(map, 'bounds_changed', function() {
    var bounds = map.getBounds();
    searchBox.setBounds(bounds);
  });
}

google.maps.event.addDomListener(window, 'load', initialize);

function dateFormat(input){
	if(input){
var parts = input.split('/')
return parts[1] + '/' + parts[2] + '/' + parts[0]
}
else{}
}