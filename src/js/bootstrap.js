"use strict";

(function($, document){
  var controllers = [ChannelsController];

  controllers.forEach(function(Controller){
    new Controller($);
  });
})(Zepto, document);