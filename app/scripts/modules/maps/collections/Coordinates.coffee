Coordinate = require('../models/Coordinate')

module.exports = class Coordinates extends Backbone.Collection
  model: Coordinate

  constructor: ->
    this.coordinate = new Coordinate();

  initialize : ->
    this.setCoordinates(this.coordinate.getCurrentLangLat());

  setCoordinates: (NewCoordinates) ->
    this.coordinate = NewCoordinates;

  getCoordinates: ->
    return this.coordinate;