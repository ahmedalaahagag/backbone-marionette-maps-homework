EmptyRegionView = require '../views/EmptyRegionView'

module.exports = class MainRegion extends Backbone.Marionette.Region
  initialize: (options) ->
    @module = options.module
    @module.region = @

    @initShow()

  initShow: ->
    @emptyView = new EmptyRegionView()
    @show(@emptyView)