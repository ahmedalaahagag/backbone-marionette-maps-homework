(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var App, AppView, MainRegion, MapsModule,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

MainRegion = require('./regions/MainRegion');

AppView = require('./views/AppView');

MapsModule = require('./modules/maps/MapsModule');

App = (function(_super) {
  __extends(App, _super);

  function App() {
    this.initialize = __bind(this.initialize, this);
    return App.__super__.constructor.apply(this, arguments);
  }

  App.prototype.initialize = function() {
    console.log('Initializing app...');
    this.addInitializer((function(_this) {
      return function(options) {
        return (new AppView()).render();
      };
    })(this));
    this.addInitializer((function(_this) {
      return function(options) {
        return _this.addRegions({
          mapsRegion: {
            selector: "#maps",
            regionClass: MainRegion,
            module: _this.submodules.Maps
          }
        });
      };
    })(this));
    this.addInitializer((function(_this) {
      return function(options) {
        return Backbone.history.start();
      };
    })(this));
    this.module('Maps', MapsModule);
    return this.start();
  };

  return App;

})(Backbone.Marionette.Application);

module.exports = new App();


},{"./modules/maps/MapsModule":4,"./regions/MainRegion":9,"./views/AppView":10}],2:[function(require,module,exports){
window.App = require('./app');

$(function() {
  return App.initialize();
});


},{"./app":1}],3:[function(require,module,exports){
var BaseModule,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

module.exports = BaseModule = (function(_super) {
  __extends(BaseModule, _super);

  function BaseModule() {
    return BaseModule.__super__.constructor.apply(this, arguments);
  }

  BaseModule.prototype.onStart = function() {
    this.mapsView = new this.MapsView({
      collection: this.collection
    });
    return this.region.show(this.mapsView);
  };

  return BaseModule;

})(Marionette.Module);


},{}],4:[function(require,module,exports){
var BaseModule, Coordinate, Coordinates, MapsModule,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

BaseModule = require('../BaseModule');

Coordinate = require('./models/Coordinate');

Coordinates = require('./collections/Coordinates');

module.exports = MapsModule = (function(_super) {
  __extends(MapsModule, _super);

  function MapsModule() {
    return MapsModule.__super__.constructor.apply(this, arguments);
  }

  MapsModule.prototype.initialize = function() {
    this.MapsView = require('./views/MapsView');
    console.log('Initializing Maps Module');
    return this.startWithParent = true;
  };

  MapsModule.prototype.onStart = function() {
    var canvas, lat, latlng, lng, mapOptions;
    console.log('Starting Maps Module');
    MapsModule.__super__.onStart.call(this);
    Coordinate = new Coordinates();
    canvas = "map-canvas";
    lat = parseFloat(Coordinate.getCoordinates().get('latitude'));
    lng = parseFloat(Coordinate.getCoordinates().get('longitude'));
    latlng = new google.maps.LatLng(lat, lng);
    mapOptions = {
      zoom: 11,
      center: latlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    window.map = new google.maps.Map(document.getElementById(canvas), mapOptions);
    return new google.maps.Marker({
      position: latlng,
      map: window.map,
      title: ""
    });
  };

  MapsModule.prototype.onStop = function() {
    return console.log('Stopping Maps Module');
  };

  return MapsModule;

})(BaseModule);


},{"../BaseModule":3,"./collections/Coordinates":5,"./models/Coordinate":6,"./views/MapsView":7}],5:[function(require,module,exports){
var Coordinate, Coordinates,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Coordinate = require('../models/Coordinate');

module.exports = Coordinates = (function(_super) {
  __extends(Coordinates, _super);

  Coordinates.prototype.model = Coordinate;

  function Coordinates() {
    this.coordinate = new Coordinate();
  }

  Coordinates.prototype.initialize = function() {
    return this.setCoordinates(this.coordinate.getCurrentLangLat());
  };

  Coordinates.prototype.setCoordinates = function(NewCoordinates) {
    return this.coordinate = NewCoordinates;
  };

  Coordinates.prototype.getCoordinates = function() {
    return this.coordinate;
  };

  return Coordinates;

})(Backbone.Collection);


},{"../models/Coordinate":6}],6:[function(require,module,exports){
var Coordinate,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

module.exports = Coordinate = (function(_super) {
  __extends(Coordinate, _super);

  function Coordinate() {
    return Coordinate.__super__.constructor.apply(this, arguments);
  }

  Coordinate.prototype.defaults = {
    longitude: 13.4199019,
    latitude: 52.4960722
  };

  Coordinate.prototype.getCurrentLangLat = function() {
    return [this.longitude, this.latitude];
  };

  return Coordinate;

})(Backbone.Model);


},{}],7:[function(require,module,exports){
var Coordinates, MapsView,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Coordinates = require('../collections/Coordinates');

module.exports = MapsView = (function(_super) {
  __extends(MapsView, _super);

  function MapsView() {
    return MapsView.__super__.constructor.apply(this, arguments);
  }

  MapsView.prototype.template = require('./templates/maps');

  MapsView.prototype.ui = {
    form: 'form#maps-input',
    input: 'form#longitude input',
    input: 'form#latitude input'
  };

  MapsView.prototype.events = {
    'submit': 'setPin'
  };

  MapsView.prototype.setPin = function(e) {
    var lat, latlng, lng, marker;
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
      map: window.map,
      title: ""
    });
    return window.map.setCenter(marker.getPosition());
  };

  MapsView.prototype.onRender = function() {
    return this.ui.input.focus();
  };

  return MapsView;

})(Backbone.Marionette.CompositeView);


},{"../collections/Coordinates":5,"./templates/maps":8}],8:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};

buf.push("<div id=\"map-canvas\"></div><div id=\"maps\"><form id=\"maps-input\"><input type=\"text\" id=\"longitude\" placeholder=\"longitude\" autofocus=\"autofocus\" class=\"form-control\"/><input type=\"text\" id=\"latitude\" placeholder=\"latitude\" class=\"form-control\"/><button id=\"btnSubmit\" type=\"submit\" class=\"btn-danger\">Set marker</button></form></div>");;return buf.join("");
};
},{"jade/runtime":15}],9:[function(require,module,exports){
var EmptyRegionView, MainRegion,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

EmptyRegionView = require('../views/EmptyRegionView');

module.exports = MainRegion = (function(_super) {
  __extends(MainRegion, _super);

  function MainRegion() {
    return MainRegion.__super__.constructor.apply(this, arguments);
  }

  MainRegion.prototype.initialize = function(options) {
    this.module = options.module;
    this.module.region = this;
    return this.initShow();
  };

  MainRegion.prototype.initShow = function() {
    this.emptyView = new EmptyRegionView();
    return this.show(this.emptyView);
  };

  return MainRegion;

})(Backbone.Marionette.Region);


},{"../views/EmptyRegionView":11}],10:[function(require,module,exports){
var AppView,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

module.exports = AppView = (function(_super) {
  __extends(AppView, _super);

  function AppView() {
    return AppView.__super__.constructor.apply(this, arguments);
  }

  AppView.prototype.template = require('./templates/app');

  AppView.prototype.el = "#app";

  return AppView;

})(Marionette.LayoutView);


},{"./templates/app":12}],11:[function(require,module,exports){
var EmptyRegionView,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

module.exports = EmptyRegionView = (function(_super) {
  __extends(EmptyRegionView, _super);

  function EmptyRegionView() {
    return EmptyRegionView.__super__.constructor.apply(this, arguments);
  }

  EmptyRegionView.prototype.template = require('./templates/emptyregion');

  return EmptyRegionView;

})(Marionette.ItemView);


},{"./templates/emptyregion":13}],12:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};

buf.push("<div class=\"row\"><div id=\"maps\"></div></div>");;return buf.join("");
};
},{"jade/runtime":15}],13:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};

buf.push("<div class=\"module-box\"><div class=\"blank\"></div></div>");;return buf.join("");
};
},{"jade/runtime":15}],14:[function(require,module,exports){

},{}],15:[function(require,module,exports){
(function (global){
!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.jade=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/**
 * Merge two attribute objects giving precedence
 * to values in object `b`. Classes are special-cased
 * allowing for arrays and merging/joining appropriately
 * resulting in a string.
 *
 * @param {Object} a
 * @param {Object} b
 * @return {Object} a
 * @api private
 */

exports.merge = function merge(a, b) {
  if (arguments.length === 1) {
    var attrs = a[0];
    for (var i = 1; i < a.length; i++) {
      attrs = merge(attrs, a[i]);
    }
    return attrs;
  }
  var ac = a['class'];
  var bc = b['class'];

  if (ac || bc) {
    ac = ac || [];
    bc = bc || [];
    if (!Array.isArray(ac)) ac = [ac];
    if (!Array.isArray(bc)) bc = [bc];
    a['class'] = ac.concat(bc).filter(nulls);
  }

  for (var key in b) {
    if (key != 'class') {
      a[key] = b[key];
    }
  }

  return a;
};

/**
 * Filter null `val`s.
 *
 * @param {*} val
 * @return {Boolean}
 * @api private
 */

function nulls(val) {
  return val != null && val !== '';
}

/**
 * join array as classes.
 *
 * @param {*} val
 * @return {String}
 */
exports.joinClasses = joinClasses;
function joinClasses(val) {
  return Array.isArray(val) ? val.map(joinClasses).filter(nulls).join(' ') : val;
}

/**
 * Render the given classes.
 *
 * @param {Array} classes
 * @param {Array.<Boolean>} escaped
 * @return {String}
 */
exports.cls = function cls(classes, escaped) {
  var buf = [];
  for (var i = 0; i < classes.length; i++) {
    if (escaped && escaped[i]) {
      buf.push(exports.escape(joinClasses([classes[i]])));
    } else {
      buf.push(joinClasses(classes[i]));
    }
  }
  var text = joinClasses(buf);
  if (text.length) {
    return ' class="' + text + '"';
  } else {
    return '';
  }
};

/**
 * Render the given attribute.
 *
 * @param {String} key
 * @param {String} val
 * @param {Boolean} escaped
 * @param {Boolean} terse
 * @return {String}
 */
exports.attr = function attr(key, val, escaped, terse) {
  if ('boolean' == typeof val || null == val) {
    if (val) {
      return ' ' + (terse ? key : key + '="' + key + '"');
    } else {
      return '';
    }
  } else if (0 == key.indexOf('data') && 'string' != typeof val) {
    return ' ' + key + "='" + JSON.stringify(val).replace(/'/g, '&apos;') + "'";
  } else if (escaped) {
    return ' ' + key + '="' + exports.escape(val) + '"';
  } else {
    return ' ' + key + '="' + val + '"';
  }
};

/**
 * Render the given attributes object.
 *
 * @param {Object} obj
 * @param {Object} escaped
 * @return {String}
 */
exports.attrs = function attrs(obj, terse){
  var buf = [];

  var keys = Object.keys(obj);

  if (keys.length) {
    for (var i = 0; i < keys.length; ++i) {
      var key = keys[i]
        , val = obj[key];

      if ('class' == key) {
        if (val = joinClasses(val)) {
          buf.push(' ' + key + '="' + val + '"');
        }
      } else {
        buf.push(exports.attr(key, val, false, terse));
      }
    }
  }

  return buf.join('');
};

/**
 * Escape the given string of `html`.
 *
 * @param {String} html
 * @return {String}
 * @api private
 */

exports.escape = function escape(html){
  var result = String(html)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
  if (result === '' + html) return html;
  else return result;
};

/**
 * Re-throw the given `err` in context to the
 * the jade in `filename` at the given `lineno`.
 *
 * @param {Error} err
 * @param {String} filename
 * @param {String} lineno
 * @api private
 */

exports.rethrow = function rethrow(err, filename, lineno, str){
  if (!(err instanceof Error)) throw err;
  if ((typeof window != 'undefined' || !filename) && !str) {
    err.message += ' on line ' + lineno;
    throw err;
  }
  try {
    str =  str || require('fs').readFileSync(filename, 'utf8')
  } catch (ex) {
    rethrow(err, null, lineno)
  }
  var context = 3
    , lines = str.split('\n')
    , start = Math.max(lineno - context, 0)
    , end = Math.min(lines.length, lineno + context);

  // Error context
  var context = lines.slice(start, end).map(function(line, i){
    var curr = i + start + 1;
    return (curr == lineno ? '  > ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'Jade') + ':' + lineno
    + '\n' + context + '\n\n' + err.message;
  throw err;
};

},{"fs":2}],2:[function(require,module,exports){

},{}]},{},[1])
(1)
});
}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"fs":14}]},{},[2])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2hhZ2FnL3dvcmsvaG9tZXdvcmsvbWFwcy9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9oYWdhZy93b3JrL2hvbWV3b3JrL21hcHMvYXBwL3NjcmlwdHMvYXBwLmNvZmZlZSIsIi9ob21lL2hhZ2FnL3dvcmsvaG9tZXdvcmsvbWFwcy9hcHAvc2NyaXB0cy9pbmRleC5jb2ZmZWUiLCIvaG9tZS9oYWdhZy93b3JrL2hvbWV3b3JrL21hcHMvYXBwL3NjcmlwdHMvbW9kdWxlcy9CYXNlTW9kdWxlLmNvZmZlZSIsIi9ob21lL2hhZ2FnL3dvcmsvaG9tZXdvcmsvbWFwcy9hcHAvc2NyaXB0cy9tb2R1bGVzL21hcHMvTWFwc01vZHVsZS5jb2ZmZWUiLCIvaG9tZS9oYWdhZy93b3JrL2hvbWV3b3JrL21hcHMvYXBwL3NjcmlwdHMvbW9kdWxlcy9tYXBzL2NvbGxlY3Rpb25zL0Nvb3JkaW5hdGVzLmNvZmZlZSIsIi9ob21lL2hhZ2FnL3dvcmsvaG9tZXdvcmsvbWFwcy9hcHAvc2NyaXB0cy9tb2R1bGVzL21hcHMvbW9kZWxzL0Nvb3JkaW5hdGUuY29mZmVlIiwiL2hvbWUvaGFnYWcvd29yay9ob21ld29yay9tYXBzL2FwcC9zY3JpcHRzL21vZHVsZXMvbWFwcy92aWV3cy9NYXBzVmlldy5jb2ZmZWUiLCIvaG9tZS9oYWdhZy93b3JrL2hvbWV3b3JrL21hcHMvYXBwL3NjcmlwdHMvbW9kdWxlcy9tYXBzL3ZpZXdzL3RlbXBsYXRlcy9tYXBzLmphZGUiLCIvaG9tZS9oYWdhZy93b3JrL2hvbWV3b3JrL21hcHMvYXBwL3NjcmlwdHMvcmVnaW9ucy9NYWluUmVnaW9uLmNvZmZlZSIsIi9ob21lL2hhZ2FnL3dvcmsvaG9tZXdvcmsvbWFwcy9hcHAvc2NyaXB0cy92aWV3cy9BcHBWaWV3LmNvZmZlZSIsIi9ob21lL2hhZ2FnL3dvcmsvaG9tZXdvcmsvbWFwcy9hcHAvc2NyaXB0cy92aWV3cy9FbXB0eVJlZ2lvblZpZXcuY29mZmVlIiwiL2hvbWUvaGFnYWcvd29yay9ob21ld29yay9tYXBzL2FwcC9zY3JpcHRzL3ZpZXdzL3RlbXBsYXRlcy9hcHAuamFkZSIsIi9ob21lL2hhZ2FnL3dvcmsvaG9tZXdvcmsvbWFwcy9hcHAvc2NyaXB0cy92aWV3cy90ZW1wbGF0ZXMvZW1wdHlyZWdpb24uamFkZSIsIi9ob21lL2hhZ2FnL3dvcmsvaG9tZXdvcmsvbWFwcy9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L2xpYi9fZW1wdHkuanMiLCIvaG9tZS9oYWdhZy93b3JrL2hvbWV3b3JrL21hcHMvbm9kZV9tb2R1bGVzL2phZGUvcnVudGltZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLElBQUEsb0NBQUE7RUFBQTs7aVNBQUE7O0FBQUEsVUFBQSxHQUFhLE9BQUEsQ0FBUSxzQkFBUixDQUFiLENBQUE7O0FBQUEsT0FDQSxHQUFVLE9BQUEsQ0FBUSxpQkFBUixDQURWLENBQUE7O0FBQUEsVUFFQSxHQUFhLE9BQUEsQ0FBUSwyQkFBUixDQUZiLENBQUE7O0FBQUE7QUFNRSx3QkFBQSxDQUFBOzs7OztHQUFBOztBQUFBLGdCQUFBLFVBQUEsR0FBWSxTQUFBLEdBQUE7QUFDVixJQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVkscUJBQVosQ0FBQSxDQUFBO0FBQUEsSUFFQSxJQUFDLENBQUEsY0FBRCxDQUFpQixDQUFBLFNBQUEsS0FBQSxHQUFBO2FBQUEsU0FBQyxPQUFELEdBQUE7ZUFDZixDQUFLLElBQUEsT0FBQSxDQUFBLENBQUwsQ0FBZSxDQUFDLE1BQWhCLENBQUEsRUFEZTtNQUFBLEVBQUE7SUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQWpCLENBRkEsQ0FBQTtBQUFBLElBTUEsSUFBQyxDQUFBLGNBQUQsQ0FBaUIsQ0FBQSxTQUFBLEtBQUEsR0FBQTthQUFBLFNBQUMsT0FBRCxHQUFBO2VBQ2YsS0FBQyxDQUFBLFVB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cUMsVUFBVSxDQUFDLFdBQWxELENBQUE7Ozs7QUNBQSxJQUFBLGVBQUE7RUFBQTtpU0FBQTs7QUFBQSxNQUFNLENBQUMsT0FBUCxHQUF1QjtBQUNyQixvQ0FBQSxDQUFBOzs7O0dBQUE7O0FBQUEsNEJBQUEsUUFBQSxHQUFVLE9BQUEsQ0FBUSx5QkFBUixDQUFWLENBQUE7O3lCQUFBOztHQUQ2QyxVQUFVLENBQUMsU0FBMUQsQ0FBQTs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIk1haW5SZWdpb24gPSByZXF1aXJlICcuL3JlZ2lvbnMvTWFpblJlZ2lvbidcbkFwcFZpZXcgPSByZXF1aXJlICcuL3ZpZXdzL0FwcFZpZXcnXG5NYXBzTW9kdWxlID0gcmVxdWlyZSgnLi9tb2R1bGVzL21hcHMvTWFwc01vZHVsZScpXG5cblxuY2xhc3MgQXBwIGV4dGVuZHMgQmFja2JvbmUuTWFyaW9uZXR0ZS5BcHBsaWNhdGlvblxuICBpbml0aWFsaXplOiA9PlxuICAgIGNvbnNvbGUubG9nICdJbml0aWFsaXppbmcgYXBwLi4uJ1xuXG4gICAgQGFkZEluaXRpYWxpemVyKCAob3B0aW9ucykgPT5cbiAgICAgIChuZXcgQXBwVmlldygpKS5yZW5kZXIoKVxuICAgIClcblxuICAgIEBhZGRJbml0aWFsaXplciggKG9wdGlvbnMpID0+XG4gICAgICBAYWRkUmVnaW9ucyh7IFxuICAgICAgICBtYXBzUmVnaW9uOiB7XG4gICAgICAgICAgc2VsZWN0b3I6IFwiI21hcHNcIixcbiAgICAgICAgICByZWdpb25DbGFzcyA6IE1haW5SZWdpb25cbiAgICAgICAgICBtb2R1bGU6IEBzdWJtb2R1bGVzLk1hcHNcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApXG5cbiAgICBAYWRkSW5pdGlhbGl6ZXIoIChvcHRpb25zKSA9PlxuICAgICAgQmFja2JvbmUuaGlzdG9yeS5zdGFydCgpXG4gICAgKVxuXG4gICAgQG1vZHVsZSgnTWFwcycsIE1hcHNNb2R1bGUpXG5cbiAgICBAc3RhcnQoKVxuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBBcHAoKVxuIiwid2luZG93LkFwcCA9IHJlcXVpcmUoJy4vYXBwJylcblxuJCAtPlxuICBBcHAuaW5pdGlhbGl6ZSgpXG4iLCJtb2R1bGUuZXhwb3J0cyA9IGNsYXNzIEJhc2VNb2R1bGUgZXh0ZW5kcyBNYXJpb25ldHRlLk1vZHVsZVxuICBvblN0YXJ0OiAtPlxuICAgIEBtYXBzVmlldyA9IG5ldyBATWFwc1ZpZXcoY29sbGVjdGlvbjogQGNvbGxlY3Rpb24pXG4gICAgQHJlZ2lvbi5zaG93KEBtYXBzVmlldykiLCJCYXNlTW9kdWxlID0gcmVxdWlyZSAnLi4vQmFzZU1vZHVsZSdcbkNvb3JkaW5hdGUgPSByZXF1aXJlKCcuL21vZGVscy9Db29yZGluYXRlJylcbkNvb3JkaW5hdGVzID0gcmVxdWlyZSgnLi9jb2xsZWN0aW9ucy9Db29yZGluYXRlcycpXG5cbm1vZHVsZS5leHBvcnRzID0gY2xhc3MgTWFwc01vZHVsZSBleHRlbmRzIEJhc2VNb2R1bGVcbiAgaW5pdGlhbGl6ZTogLT5cbiAgICBATWFwc1ZpZXcgPSByZXF1aXJlICcuL3ZpZXdzL01hcHNWaWV3J1xuXG4gICAgY29uc29sZS5sb2cgJ0luaXRpYWxpemluZyBNYXBzIE1vZHVsZSdcbiAgICBAc3RhcnRXaXRoUGFyZW50ID0gdHJ1ZVxuXG4gIG9uU3RhcnQ6IC0+XG4gICAgY29uc29sZS5sb2cgJ1N0YXJ0aW5nIE1hcHMgTW9kdWxlJ1xuICAgIHN1cGVyKClcbiAgICBDb29yZGluYXRlID0gbmV3IENvb3JkaW5hdGVzKCk7XG4gICAgY2FudmFzID0gXCJtYXAtY2FudmFzXCJcbiAgICBsYXQgPSBwYXJzZUZsb2F0KENvb3JkaW5hdGUuZ2V0Q29vcmRpbmF0ZXMoKS5nZXQoJ2xhdGl0dWRlJykpO1xuICAgIGxuZyA9IHBhcnNlRmxvYXQoQ29vcmRpbmF0ZS5nZXRDb29yZGluYXRlcygpLmdldCgnbG9uZ2l0dWRlJykpO1xuICAgIGxhdGxuZyA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmcobGF0LCBsbmcpO1xuICAgIG1hcE9wdGlvbnMgPSB7XG4gICAgICB6b29tOiAxMSxcbiAgICAgIGNlbnRlcjogbGF0bG5nLFxuICAgICAgbWFwVHlwZUlkOiBnb29nbGUubWFwcy5NYXBUeXBlSWQuUk9BRE1BUFxuICAgIH1cbiAgICB3aW5kb3cubWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjYW52YXMpLCBtYXBPcHRpb25zKTtcbiAgICBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcbiAgICAgIHBvc2l0aW9uOiBsYXRsbmcsXG4gICAgICBtYXAgOiB3aW5kb3cubWFwICxcbiAgICAgIHRpdGxlOlwiXCJcbiAgICB9KTtcblxuICBvblN0b3A6IC0+XG4gICAgY29uc29sZS5sb2cgJ1N0b3BwaW5nIE1hcHMgTW9kdWxlJyIsIkNvb3JkaW5hdGUgPSByZXF1aXJlKCcuLi9tb2RlbHMvQ29vcmRpbmF0ZScpXG5cbm1vZHVsZS5leHBvcnRzID0gY2xhc3MgQ29vcmRpbmF0ZXMgZXh0ZW5kcyBCYWNrYm9uZS5Db2xsZWN0aW9uXG4gIG1vZGVsOiBDb29yZGluYXRlXG5cbiAgY29uc3RydWN0b3I6IC0+XG4gICAgdGhpcy5jb29yZGluYXRlID0gbmV3IENvb3JkaW5hdGUoKTtcblxuICBpbml0aWFsaXplIDogLT5cbiAgICB0aGlzLnNldENvb3JkaW5hdGVzKHRoaXMuY29vcmRpbmF0ZS5nZXRDdXJyZW50TGFuZ0xhdCgpKTtcblxuICBzZXRDb29yZGluYXRlczogKE5ld0Nvb3JkaW5hdGVzKSAtPlxuICAgIHRoaXMuY29vcmRpbmF0ZSA9IE5ld0Nvb3JkaW5hdGVzO1xuXG4gIGdldENvb3JkaW5hdGVzOiAtPlxuICAgIHJldHVybiB0aGlzLmNvb3JkaW5hdGU7IiwibW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBDb29yZGluYXRlIGV4dGVuZHMgQmFja2JvbmUuTW9kZWxcbiAgZGVmYXVsdHM6IHtcbiAgICBsb25naXR1ZGU6IDEzLjQxOTkwMTksXG4gICAgbGF0aXR1ZGU6IDUyLjQ5NjA3MjJcbiAgfVxuXG4gIGdldEN1cnJlbnRMYW5nTGF0OiAtPlxuICAgIHJldHVybiBbdGhpcy5sb25naXR1ZGUsdGhpcy5sYXRpdHVkZV0iLCJDb29yZGluYXRlcyA9IHJlcXVpcmUoJy4uL2NvbGxlY3Rpb25zL0Nvb3JkaW5hdGVzJylcblxubW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBNYXBzVmlldyBleHRlbmRzIEJhY2tib25lLk1hcmlvbmV0dGUuQ29tcG9zaXRlVmlld1xuICB0ZW1wbGF0ZTogcmVxdWlyZSAnLi90ZW1wbGF0ZXMvbWFwcydcblxuICB1aTpcbiAgICBmb3JtOiAnZm9ybSNtYXBzLWlucHV0J1xuICAgIGlucHV0OiAnZm9ybSNsb25naXR1ZGUgaW5wdXQnXG4gICAgaW5wdXQ6ICdmb3JtI2xhdGl0dWRlIGlucHV0J1xuXG4gIGV2ZW50czpcbiAgICAnc3VibWl0JzogJ3NldFBpbidcblxuICBzZXRQaW46IChlKSAtPlxuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB0aGlzLmxvbmdpdHVkZSA9IHBhcnNlRmxvYXQoJChcIiNsb25naXR1ZGVcIikudmFsKCkpO1xuICAgIHRoaXMubGF0aXR1ZGUgPSBwYXJzZUZsb2F0KCQoXCIjbGF0aXR1ZGVcIikudmFsKCkpO1xuICAgIHRoaXMuY29vcmRpbmF0ZXMgPSBuZXcgQ29vcmRpbmF0ZXMoKTtcbiAgICB0aGlzLmNvb3JkaW5hdGVzLnNldENvb3JkaW5hdGVzKHtcbiAgICAgIGxvbmdpdHVkZTogdGhpcy5sb25naXR1ZGUsXG4gICAgICBsYXRpdHVkZTogdGhpcy5sYXRpdHVkZVxuICAgIH0pO1xuICAgIGxhdCA9IHRoaXMuY29vcmRpbmF0ZXMuZ2V0Q29vcmRpbmF0ZXMoKS5sYXRpdHVkZTtcbiAgICBsbmcgPSB0aGlzLmNvb3JkaW5hdGVzLmdldENvb3JkaW5hdGVzKCkubG9uZ2l0dWRlO1xuICAgIGxhdGxuZyA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmcobGF0LCBsbmcpO1xuICAgIG1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xuICAgICAgcG9zaXRpb246IGxhdGxuZyxcbiAgICAgIG1hcCA6IHdpbmRvdy5tYXAsXG4gICAgICB0aXRsZTpcIlwiXG4gICAgfSk7XG4gICAgd2luZG93Lm1hcC5zZXRDZW50ZXIobWFya2VyLmdldFBvc2l0aW9uKCkpO1xuXG4gIG9uUmVuZGVyOiAtPlxuICAgIEB1aS5pbnB1dC5mb2N1cygpXG4iLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcblxuYnVmLnB1c2goXCI8ZGl2IGlkPVxcXCJtYXAtY2FudmFzXFxcIj48L2Rpdj48ZGl2IGlkPVxcXCJtYXBzXFxcIj48Zm9ybSBpZD1cXFwibWFwcy1pbnB1dFxcXCI+PGlucHV0IHR5cGU9XFxcInRleHRcXFwiIGlkPVxcXCJsb25naXR1ZGVcXFwiIHBsYWNlaG9sZGVyPVxcXCJsb25naXR1ZGVcXFwiIGF1dG9mb2N1cz1cXFwiYXV0b2ZvY3VzXFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIi8+PGlucHV0IHR5cGU9XFxcInRleHRcXFwiIGlkPVxcXCJsYXRpdHVkZVxcXCIgcGxhY2Vob2xkZXI9XFxcImxhdGl0dWRlXFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIi8+PGJ1dHRvbiBpZD1cXFwiYnRuU3VibWl0XFxcIiB0eXBlPVxcXCJzdWJtaXRcXFwiIGNsYXNzPVxcXCJidG4tZGFuZ2VyXFxcIj5TZXQgbWFya2VyPC9idXR0b24+PC9mb3JtPjwvZGl2PlwiKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCJFbXB0eVJlZ2lvblZpZXcgPSByZXF1aXJlICcuLi92aWV3cy9FbXB0eVJlZ2lvblZpZXcnXG5cbm1vZHVsZS5leHBvcnRzID0gY2xhc3MgTWFpblJlZ2lvbiBleHRlbmRzIEJhY2tib25lLk1hcmlvbmV0dGUuUmVnaW9uXG4gIGluaXRpYWxpemU6IChvcHRpb25zKSAtPlxuICAgIEBtb2R1bGUgPSBvcHRpb25zLm1vZHVsZVxuICAgIEBtb2R1bGUucmVnaW9uID0gQFxuXG4gICAgQGluaXRTaG93KClcblxuICBpbml0U2hvdzogLT5cbiAgICBAZW1wdHlWaWV3ID0gbmV3IEVtcHR5UmVnaW9uVmlldygpXG4gICAgQHNob3coQGVtcHR5VmlldykiLCJtb2R1bGUuZXhwb3J0cyA9IGNsYXNzIEFwcFZpZXcgZXh0ZW5kcyBNYXJpb25ldHRlLkxheW91dFZpZXdcbiAgdGVtcGxhdGU6IHJlcXVpcmUgJy4vdGVtcGxhdGVzL2FwcCdcbiAgZWw6IFwiI2FwcFwiIiwibW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBFbXB0eVJlZ2lvblZpZXcgZXh0ZW5kcyBNYXJpb25ldHRlLkl0ZW1WaWV3XG4gIHRlbXBsYXRlOiByZXF1aXJlICcuL3RlbXBsYXRlcy9lbXB0eXJlZ2lvbidcbiIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xuXG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcInJvd1xcXCI+PGRpdiBpZD1cXFwibWFwc1xcXCI+PC9kaXY+PC9kaXY+XCIpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xuXG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcIm1vZHVsZS1ib3hcXFwiPjxkaXYgY2xhc3M9XFxcImJsYW5rXFxcIj48L2Rpdj48L2Rpdj5cIik7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IixudWxsLCIoZnVuY3Rpb24gKGdsb2JhbCl7XG4hZnVuY3Rpb24oZSl7aWYoXCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHMpbW9kdWxlLmV4cG9ydHM9ZSgpO2Vsc2UgaWYoXCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kKWRlZmluZShlKTtlbHNle3ZhciBmO1widW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3c/Zj13aW5kb3c6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIGdsb2JhbD9mPWdsb2JhbDpcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZiYmKGY9c2VsZiksZi5qYWRlPWUoKX19KGZ1bmN0aW9uKCl7dmFyIGRlZmluZSxtb2R1bGUsZXhwb3J0cztyZXR1cm4gKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkoezE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIE1lcmdlIHR3byBhdHRyaWJ1dGUgb2JqZWN0cyBnaXZpbmcgcHJlY2VkZW5jZVxuICogdG8gdmFsdWVzIGluIG9iamVjdCBgYmAuIENsYXNzZXMgYXJlIHNwZWNpYWwtY2FzZWRcbiAqIGFsbG93aW5nIGZvciBhcnJheXMgYW5kIG1lcmdpbmcvam9pbmluZyBhcHByb3ByaWF0ZWx5XG4gKiByZXN1bHRpbmcgaW4gYSBzdHJpbmcuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGFcbiAqIEBwYXJhbSB7T2JqZWN0fSBiXG4gKiBAcmV0dXJuIHtPYmplY3R9IGFcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmV4cG9ydHMubWVyZ2UgPSBmdW5jdGlvbiBtZXJnZShhLCBiKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgdmFyIGF0dHJzID0gYVswXTtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGEubGVuZ3RoOyBpKyspIHtcbiAgICAgIGF0dHJzID0gbWVyZ2UoYXR0cnMsIGFbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gYXR0cnM7XG4gIH1cbiAgdmFyIGFjID0gYVsnY2xhc3MnXTtcbiAgdmFyIGJjID0gYlsnY2xhc3MnXTtcblxuICBpZiAoYWMgfHwgYmMpIHtcbiAgICBhYyA9IGFjIHx8IFtdO1xuICAgIGJjID0gYmMgfHwgW107XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGFjKSkgYWMgPSBbYWNdO1xuICAgIGlmICghQXJyYXkuaXNBcnJheShiYykpIGJjID0gW2JjXTtcbiAgICBhWydjbGFzcyddID0gYWMuY29uY2F0KGJjKS5maWx0ZXIobnVsbHMpO1xuICB9XG5cbiAgZm9yICh2YXIga2V5IGluIGIpIHtcbiAgICBpZiAoa2V5ICE9ICdjbGFzcycpIHtcbiAgICAgIGFba2V5XSA9IGJba2V5XTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYTtcbn07XG5cbi8qKlxuICogRmlsdGVyIG51bGwgYHZhbGBzLlxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gbnVsbHModmFsKSB7XG4gIHJldHVybiB2YWwgIT0gbnVsbCAmJiB2YWwgIT09ICcnO1xufVxuXG4vKipcbiAqIGpvaW4gYXJyYXkgYXMgY2xhc3Nlcy5cbiAqXG4gKiBAcGFyYW0geyp9IHZhbFxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5leHBvcnRzLmpvaW5DbGFzc2VzID0gam9pbkNsYXNzZXM7XG5mdW5jdGlvbiBqb2luQ2xhc3Nlcyh2YWwpIHtcbiAgcmV0dXJuIEFycmF5LmlzQXJyYXkodmFsKSA/IHZhbC5tYXAoam9pbkNsYXNzZXMpLmZpbHRlcihudWxscykuam9pbignICcpIDogdmFsO1xufVxuXG4vKipcbiAqIFJlbmRlciB0aGUgZ2l2ZW4gY2xhc3Nlcy5cbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBjbGFzc2VzXG4gKiBAcGFyYW0ge0FycmF5LjxCb29sZWFuPn0gZXNjYXBlZFxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5leHBvcnRzLmNscyA9IGZ1bmN0aW9uIGNscyhjbGFzc2VzLCBlc2NhcGVkKSB7XG4gIHZhciBidWYgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjbGFzc2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGVzY2FwZWQgJiYgZXNjYXBlZFtpXSkge1xuICAgICAgYnVmLnB1c2goZXhwb3J0cy5lc2NhcGUoam9pbkNsYXNzZXMoW2NsYXNzZXNbaV1dKSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBidWYucHVzaChqb2luQ2xhc3NlcyhjbGFzc2VzW2ldKSk7XG4gICAgfVxuICB9XG4gIHZhciB0ZXh0ID0gam9pbkNsYXNzZXMoYnVmKTtcbiAgaWYgKHRleHQubGVuZ3RoKSB7XG4gICAgcmV0dXJuICcgY2xhc3M9XCInICsgdGV4dCArICdcIic7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG59O1xuXG4vKipcbiAqIFJlbmRlciB0aGUgZ2l2ZW4gYXR0cmlidXRlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBrZXlcbiAqIEBwYXJhbSB7U3RyaW5nfSB2YWxcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gZXNjYXBlZFxuICogQHBhcmFtIHtCb29sZWFufSB0ZXJzZVxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5leHBvcnRzLmF0dHIgPSBmdW5jdGlvbiBhdHRyKGtleSwgdmFsLCBlc2NhcGVkLCB0ZXJzZSkge1xuICBpZiAoJ2Jvb2xlYW4nID09IHR5cGVvZiB2YWwgfHwgbnVsbCA9PSB2YWwpIHtcbiAgICBpZiAodmFsKSB7XG4gICAgICByZXR1cm4gJyAnICsgKHRlcnNlID8ga2V5IDoga2V5ICsgJz1cIicgKyBrZXkgKyAnXCInKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgfSBlbHNlIGlmICgwID09IGtleS5pbmRleE9mKCdkYXRhJykgJiYgJ3N0cmluZycgIT0gdHlwZW9mIHZhbCkge1xuICAgIHJldHVybiAnICcgKyBrZXkgKyBcIj0nXCIgKyBKU09OLnN0cmluZ2lmeSh2YWwpLnJlcGxhY2UoLycvZywgJyZhcG9zOycpICsgXCInXCI7XG4gIH0gZWxzZSBpZiAoZXNjYXBlZCkge1xuICAgIHJldHVybiAnICcgKyBrZXkgKyAnPVwiJyArIGV4cG9ydHMuZXNjYXBlKHZhbCkgKyAnXCInO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAnICcgKyBrZXkgKyAnPVwiJyArIHZhbCArICdcIic7XG4gIH1cbn07XG5cbi8qKlxuICogUmVuZGVyIHRoZSBnaXZlbiBhdHRyaWJ1dGVzIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcGFyYW0ge09iamVjdH0gZXNjYXBlZFxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5leHBvcnRzLmF0dHJzID0gZnVuY3Rpb24gYXR0cnMob2JqLCB0ZXJzZSl7XG4gIHZhciBidWYgPSBbXTtcblxuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG5cbiAgaWYgKGtleXMubGVuZ3RoKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICB2YXIga2V5ID0ga2V5c1tpXVxuICAgICAgICAsIHZhbCA9IG9ialtrZXldO1xuXG4gICAgICBpZiAoJ2NsYXNzJyA9PSBrZXkpIHtcbiAgICAgICAgaWYgKHZhbCA9IGpvaW5DbGFzc2VzKHZhbCkpIHtcbiAgICAgICAgICBidWYucHVzaCgnICcgKyBrZXkgKyAnPVwiJyArIHZhbCArICdcIicpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBidWYucHVzaChleHBvcnRzLmF0dHIoa2V5LCB2YWwsIGZhbHNlLCB0ZXJzZSkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBidWYuam9pbignJyk7XG59O1xuXG4vKipcbiAqIEVzY2FwZSB0aGUgZ2l2ZW4gc3RyaW5nIG9mIGBodG1sYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaHRtbFxuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy5lc2NhcGUgPSBmdW5jdGlvbiBlc2NhcGUoaHRtbCl7XG4gIHZhciByZXN1bHQgPSBTdHJpbmcoaHRtbClcbiAgICAucmVwbGFjZSgvJi9nLCAnJmFtcDsnKVxuICAgIC5yZXBsYWNlKC88L2csICcmbHQ7JylcbiAgICAucmVwbGFjZSgvPi9nLCAnJmd0OycpXG4gICAgLnJlcGxhY2UoL1wiL2csICcmcXVvdDsnKTtcbiAgaWYgKHJlc3VsdCA9PT0gJycgKyBodG1sKSByZXR1cm4gaHRtbDtcbiAgZWxzZSByZXR1cm4gcmVzdWx0O1xufTtcblxuLyoqXG4gKiBSZS10aHJvdyB0aGUgZ2l2ZW4gYGVycmAgaW4gY29udGV4dCB0byB0aGVcbiAqIHRoZSBqYWRlIGluIGBmaWxlbmFtZWAgYXQgdGhlIGdpdmVuIGBsaW5lbm9gLlxuICpcbiAqIEBwYXJhbSB7RXJyb3J9IGVyclxuICogQHBhcmFtIHtTdHJpbmd9IGZpbGVuYW1lXG4gKiBAcGFyYW0ge1N0cmluZ30gbGluZW5vXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5leHBvcnRzLnJldGhyb3cgPSBmdW5jdGlvbiByZXRocm93KGVyciwgZmlsZW5hbWUsIGxpbmVubywgc3RyKXtcbiAgaWYgKCEoZXJyIGluc3RhbmNlb2YgRXJyb3IpKSB0aHJvdyBlcnI7XG4gIGlmICgodHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyB8fCAhZmlsZW5hbWUpICYmICFzdHIpIHtcbiAgICBlcnIubWVzc2FnZSArPSAnIG9uIGxpbmUgJyArIGxpbmVubztcbiAgICB0aHJvdyBlcnI7XG4gIH1cbiAgdHJ5IHtcbiAgICBzdHIgPSAgc3RyIHx8IHJlcXVpcmUoJ2ZzJykucmVhZEZpbGVTeW5jKGZpbGVuYW1lLCAndXRmOCcpXG4gIH0gY2F0Y2ggKGV4KSB7XG4gICAgcmV0aHJvdyhlcnIsIG51bGwsIGxpbmVubylcbiAgfVxuICB2YXIgY29udGV4dCA9IDNcbiAgICAsIGxpbmVzID0gc3RyLnNwbGl0KCdcXG4nKVxuICAgICwgc3RhcnQgPSBNYXRoLm1heChsaW5lbm8gLSBjb250ZXh0LCAwKVxuICAgICwgZW5kID0gTWF0aC5taW4obGluZXMubGVuZ3RoLCBsaW5lbm8gKyBjb250ZXh0KTtcblxuICAvLyBFcnJvciBjb250ZXh0XG4gIHZhciBjb250ZXh0ID0gbGluZXMuc2xpY2Uoc3RhcnQsIGVuZCkubWFwKGZ1bmN0aW9uKGxpbmUsIGkpe1xuICAgIHZhciBjdXJyID0gaSArIHN0YXJ0ICsgMTtcbiAgICByZXR1cm4gKGN1cnIgPT0gbGluZW5vID8gJyAgPiAnIDogJyAgICAnKVxuICAgICAgKyBjdXJyXG4gICAgICArICd8ICdcbiAgICAgICsgbGluZTtcbiAgfSkuam9pbignXFxuJyk7XG5cbiAgLy8gQWx0ZXIgZXhjZXB0aW9uIG1lc3NhZ2VcbiAgZXJyLnBhdGggPSBmaWxlbmFtZTtcbiAgZXJyLm1lc3NhZ2UgPSAoZmlsZW5hbWUgfHwgJ0phZGUnKSArICc6JyArIGxpbmVub1xuICAgICsgJ1xcbicgKyBjb250ZXh0ICsgJ1xcblxcbicgKyBlcnIubWVzc2FnZTtcbiAgdGhyb3cgZXJyO1xufTtcblxufSx7XCJmc1wiOjJ9XSwyOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxufSx7fV19LHt9LFsxXSlcbigxKVxufSk7XG59KS5jYWxsKHRoaXMsdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KSJdfQ==
