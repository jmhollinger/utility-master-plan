function initialize(){

  //For address searching.
  var markers = [];

  //Set your basic options.
  var mapOptions = {
    zoom: 12,
    center: {lat: 38.047594, lng: -84.496428},
    overviewMapControl:true,
    rotateControl:true,
    scaleControl:true,
    mapTypeControl: true,
    mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR, position:google.maps.ControlPosition.TOP_CENTER},
    zoomControl: true,
    zoomControlOptions: {style: google.maps.ZoomControlStyle.DEFAULT}
    };

  //Fill up the map-canvas.
  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  //Drawing Library Config.
  var drawingManager = new google.maps.drawing.DrawingManager({
    drawingControl: true,
    drawingControlOptions: {
      position: google.maps.ControlPosition.TOP_LEFT,
      drawingModes: [
        google.maps.drawing.OverlayType.POLYLINE
      ]},
    polylineOptions: {
      clickable: true
    }  

    });
  drawingManager.setMap(map);

  //Drawing library listener for completed lines
  google.maps.event.addListener(drawingManager, 'polylinecomplete', function(line) {

    drawingManager.setOptions({
      drawingControl: true,
      drawingControlOptions: {
      position: google.maps.ControlPosition.TOP_LEFT,
      drawingModes: [
      ]}
    });

    drawingManager.setDrawingMode(null)

    var points = []
    var points_obj = {}
    var p_array = line.getPath().getArray()
    $.each(p_array, function( index, value ) {
      var temp = []
      temp.push(value.lng(), value.lat())
      points.push(temp)
      return points
    });
  
    points_obj = 
    {
        "type": "LineString",
        "coordinates": points
    }

    
    $('#coordinates').val(JSON.stringify(points_obj))
    

    $('#clear-map').click(function(){
    line.setMap(null)

    drawingManager.setOptions({
      drawingControl: true,
      drawingControlOptions: {
      position: google.maps.ControlPosition.TOP_LEFT,
      drawingModes: [
      google.maps.drawing.OverlayType.POLYLINE
      ]}
    })
  
    $('#coordinates').val('')

  })
    

  });


//Listen for street selection and zoom map.
$('#street').bind('typeahead:selected', function() {
  var coor = getLatLng($(this).val())
  var point  = new google.maps.LatLng(coor[0], coor[1])
  if(coor[0]){
    map.setCenter(point)  
    map.setZoom(coor[2])
  }
  else {}
    })


  // Create the search box and link it to the HTML element.
    var input = /** @type {HTMLInputElement} */(
        document.getElementById('pac-input'));

    var searchBox = new google.maps.places.SearchBox(
      /** @type {HTMLInputElement} */(input));

    // Listen for search box changes.
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
      //Set zoom level for when an address is selected.
      map.setZoom(16)
        });
    
    // Bias the SearchBox results towards places that are within the bounds of the
    // current map's viewport.
    google.maps.event.addListener(map, 'bounds_changed', function() {
      var bounds = map.getBounds();
      searchBox.setBounds(bounds);
    });

}

google.maps.event.addDomListener(window, 'load', initialize);

//Function to get coordinates of selected street
function getLatLng (streetname) {
var latlng = []
  $.each(streets.streets, function( index, value ) {
    if (value.name === streetname){
      latlng = [value.lat, value.lng, 16]
      return false
    }
  })
return latlng
}