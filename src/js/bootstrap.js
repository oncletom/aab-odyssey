"use strict";

(function($, document){
  var controllers = [AppStatesController, ChannelsController];

  controllers.forEach(function(Controller){
    new Controller($);
  });
})(Zepto, document);