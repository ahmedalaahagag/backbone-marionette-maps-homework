module.exports = class BaseModule extends Marionette.Module
  onStart: ->
    @mapsView = new @MapsView(collection: @collection)
    @region.show(@mapsView)