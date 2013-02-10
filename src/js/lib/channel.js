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
 * @throws Error if the item parameter is not a valid object
 * @param {Object} item Some object from a JSON response
 */
Channel.fromJSON = function fromJSON(item){
  var channel = new Channel();

  if (typeof item !== 'object'){
    throw new Error('item is not a valid object.');
  }

  Object.keys(channel).forEach(function(key){
    if (item[key] !== undefined){
      channel[key] = item[key];
    }
  });

  return channel;
};

/**
 * Retrieves a list of channels from a remote API
 *
 * @param callback
 */
Channel.getList = function getList(callback, baseuri){
  $.getJSON(baseuri + '/channels', function(response){
    var channels = [];

    // Object to Array conversion
    channels = Object.keys(response).map(function(key){
      return Channel.fromJSON(response[key]);
    });

    callback(channels);
  });
};