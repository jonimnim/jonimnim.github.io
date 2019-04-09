window.onload = function(){
  var center = [30.352971500000002, 59.93466050000001];
  var view = new ol.View({
    center: ol.proj.fromLonLat(center),
    zoom: 10
  });
  var map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
          source: new ol.source.XYZ({
              url: 'http://mapsserver.regatav6.ru/rest/our/{z}/{x}/{y}',
              crossOrigin: 'Anonymous'
          })
      })
    ],
    view
  });

  var source = new ol.source.Vector({});
  var layer = new ol.layer.Vector({source});
  map.addLayer(layer);

  var feature = new ol.Feature(new ol.geom.Point(ol.proj.fromLonLat(center)));
  feature.setStyle(function () {
    var svgPin = '<svg   xmlns:svg="http://www.w3.org/2000/svg"   xmlns="http://www.w3.org/2000/svg"   width="24"   height="40.021511"   version="1.1">  <g     id="g4"     transform="matrix(0.23164411,0,0,0.23164411,-17.074282,-393.25985)">    <path       id="svg_2"       stroke-miterlimit="10"       d="m 125.64979,1861.3906 c -3.70055,-18.1967 -10.24105,-33.3336 -18.1585,-47.3708 -5.87116,-10.4132 -12.669839,-20.0231 -18.97129,-30.1112 -2.103671,-3.3659 -3.910915,-6.9326 -5.928527,-10.4323 -4.035223,-6.9899 -7.305476,-15.0986 -7.104671,-25.617 0.200805,-10.2793 3.174631,-18.5218 7.45847,-25.2632 7.047298,-11.0825 18.856538,-20.1761 34.701008,-22.5666 12.9567,-1.9507 25.10062,1.3483 33.70655,6.3779 7.03773,4.1118 12.48815,9.61 16.62856,16.0931 4.32209,6.7605 7.30548,14.7544 7.55409,25.1676 0.12431,5.3357 -0.74584,10.2793 -1.97936,14.3814 -1.24308,4.15 -3.25113,7.6211 -5.02969,11.3312 -3.48062,7.2385 -7.84095,13.8651 -12.22998,20.4916 -13.03319,19.765 -25.2823,39.9124 -30.64666,67.5183 z"       fill="#ed5e50"       stroke="white"       stroke-width="3"/>    <circle       id="svg_4"       cx="126.08965"       cy="1744.7708"       r="17.527405"       stroke-width="0"       fill="#5b1513"/>  </g></svg>';
    var svgSrc = 'data:image/svg+xml,' + encodeURIComponent(svgPin);

    return new ol.style.Style({
      image: new ol.style.Icon({
        src: svgSrc,
        snapToPixel: false
      })
    });
  });

  source.addFeature(feature);



  function updateCoordinate(position){
    var c = ol.proj.fromLonLat([position.coords.longitude, position.coords.latitude]);
    feature.getGeometry().setCoordinates(c);
    view.setCenter(c)
  }

  var geo_options = {
          enableHighAccuracy: true, 
          maximumAge        : 30000, 
          timeout           : 27000
        };
  var watchId = navigator.geolocation.watchPosition(updateCoordinate, null, geo_options);
};