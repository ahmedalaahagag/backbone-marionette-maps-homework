MainRegion = require './regions/MainRegion'
AppView = require './views/AppView'
MapsModule = require('./modules/maps/MapsModule')


class App extends Backbone.Marionette.Application
  initialize: =>
    console.log 'Initializing app...'

    @addInitializer( (options) =>
      (new AppView()).render()
    )

    @addInitializer( (options) =>
      @addRegions({ 
        mapsRegion: {
          selector: "#maps",
          regionClass : MainRegion
          module: @submodules.Maps
        }
      })
    )

    @addInitializer( (options) =>
      Backbone.history.start()
    )

    @module('Maps', MapsModule)

    @start()

module.exports = new App()
