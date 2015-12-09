function initialize(){
 
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

$('#street').blur(function(){
  var coor = getLatLng($(this).val())
  if(coor[0]){
    map.setCenter(new google.maps.LatLng(coor[0], coor[1]))  
    map.setZoom(coor[2])
  }
  else {}
    })

}

google.maps.event.addDomListener(window, 'load', initialize);

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