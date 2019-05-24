module.exports = class Coordinate extends Backbone.Model
  defaults: {
    longitude: 13.4199019,
    latitude: 52.4960722
  }

  getCurrentLangLat: ->
    return [this.longitude,this.latitude]