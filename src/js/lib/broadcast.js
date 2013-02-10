"use strict";

/**
 * Broadcast Object
 *
 * @constructor
 */
function Broadcast(){
  this.pid = null;
  this.start_date = null;
  this.end_date = null;
  this.duration = 0;
  this.title = null;
  this.episode_pid = null;
  this.image = null;
}

/**
 * Factory from JSON record
 *
 * @todo almost identical as `Channel.fromJSON` — factorization or ODM usage
 * @static
 * @throws Error if the item parameter is not a valid object
 * @param {Object} item Some object from a JSON response
 */
Broadcast.fromJSON = function fromJSON(item){
  var broadcast = new Broadcast();

  if (typeof item !== 'object'){
    throw new Error('item is not a valid object.');
  }

  Object.keys(broadcast).forEach(function(key){
    if (item[key] !== undefined){
      broadcast[key] = item[key];
    }
  });

  return broadcast;
};


Broadcast.getList = function getList(baseuri, channel, date, callback){
  $.getJSON(baseuri + '/schedule/'+channel.id+'/'+ Broadcast.getDateParam( date ), function(response){
    var broadcasts = [];

    broadcasts = response[ Object.keys(response)[0] ].map(function(broadcast){
      return Broadcast.fromJSON(broadcast);
    });

    callback(broadcasts);
  });
};

Broadcast.getDateParam = function getDateParam(date){
  return date.toISOString().replace(/T.+$/, '');
};