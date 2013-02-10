"use strict";

(function($, document){
  var settings = {};
  var memoryStorage = {};
  var controllers = [AppStatesController, ChannelsController];

  Array.prototype.slice.call(document.body.attributes).forEach(function(attr){
    attr.name.replace(/^data-(.+)$/, function(m, key){
      settings[ key ] = attr.value;
    });
  });

  controllers.forEach(function(Controller){
    var c = new Controller($, settings);
    c.storage = memoryStorage;
  });
})(Zepto, document);