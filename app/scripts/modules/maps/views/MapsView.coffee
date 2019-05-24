Coordinates = require('../collections/Coordinates')

module.exports = class MapsView extends Backbone.Marionette.CompositeView
  template: require './templates/maps'

  ui:
    form: 'form#maps-input'
    input: 'form#longitude input'
    input: 'form#latitude input'

  events:
    'submit': 'setPin'

  setPin: (e) ->
    e.preventDefault();
    this.longitude = parseFloat($("#longitude").val());
    this.latitude = parseFloat($("#latitude").val());
    this.coordinates = new Coordinates();
    this.coordinates.setCoordinates({
      longitude: this.longitude,
      latitude: this.latitude
    });
    lat = this.coordinates.getCoordinates().latitude;
    lng = this.coordinates.getCoordinates().longitude;
    latlng = new google.maps.LatLng(lat, lng);
    marker = new google.maps.Marker({
      position: latlng,
      map : window.map,
      title:""
    });
    window.map.setCenter(marker.getPosition());

  onRender: ->
    @ui.input.focus()
