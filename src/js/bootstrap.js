"use strict";

(function($, document){
  var settings = {};
  var memoryStorage = {};
  var controllers = [AppStatesController, ChannelsController, BroadcastsController];
  var broadcaster = $(document);

  Array.prototype.slice.call(document.body.attributes).forEach(function(attr){
    attr.name.replace(/^data-(.+)$/, function(m, key){
      settings[ key ] = attr.value;
    });
  });

  rivets.configure({
    adapter: {
      subscribe: function(obj, keypath, callback){
      },
      unsubscribe: function(obj, keypath, callback){
      },
      read: function(obj, keypath){
        return keypath in obj ? obj[keypath] : obj;
      },
      publish: function(obj, keypath, value){
        obj[keypath] = value;
      }
    }
  });

  controllers.forEach(function(Controller){
    var c = new Controller($, settings);

    c.storage = memoryStorage;
    c.broadcaster = broadcaster;

    c.init();
  });
})(Zepto, document);