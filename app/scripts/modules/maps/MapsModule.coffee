BaseModule = require '../BaseModule'
Coordinate = require('./models/Coordinate')
Coordinates = require('./collections/Coordinates')

module.exports = class MapsModule extends BaseModule
  initialize: ->
    @MapsView = require './views/MapsView'

    console.log 'Initializing Maps Module'
    @startWithParent = true

  onStart: ->
    console.log 'Starting Maps Module'
    super()
    Coordinate = new Coordinates();
    canvas = "map-canvas"
    lat = parseFloat(Coordinate.getCoordinates().get('latitude'));
    lng = parseFloat(Coordinate.getCoordinates().get('longitude'));
    latlng = new google.maps.LatLng(lat, lng);
    mapOptions = {
      zoom: 11,
      center: latlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    window.map = new google.maps.Map(document.getElementById(canvas), mapOptions);
    new google.maps.Marker({
      position: latlng,
      map : window.map ,
      title:""
    });

  onStop: ->
    console.log 'Stopping Maps Module'