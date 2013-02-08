"use strict";

/**
 * Channel Object
 *
 * @constructor
 */
function Channel(){
  this.id = null;
  this.name = '';
  this.sort_order = 0;
  this.image = null;
}

/**
 * Factory from JSON record
 *
 * @static
 * @param {Object} item Some object from a JSON response
 */
Channel.fromJSON = function fromJSON(item){
  var channel = new Channel();

  Object.keys(channel).forEach(function(key){
    if (item[key] !== undefined){
      channel[key] = item[key];
    }
  });
};

/**
 * Retrieves a list of channels from a remote API
 *
 * @param callback
 */
Channel.getList = function getList(callback){
  $.getJSON('http://rd-broadcast-bookmarks.herokuapp.com/channels', function(response){
    var channels = [];

    // Object to Array conversion
    channels = Object.keys(response).map(function(key){
      return Channel.fromJSON(response[key]);
    });

    callback(channels);
  });
};