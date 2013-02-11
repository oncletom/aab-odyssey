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
  this.subtitle = '';
}

Broadcast.prototype.start_hour = function start_hour(){
  return this.start_hourtime().split(':')[0];
};

Broadcast.prototype.start_hourtime = function start_hourtime(){
  var hourtime = null;

  this.start_date.replace(/T(\d{2}:\d{2})/, function(m, block){
    hourtime = block;
  });

  return hourtime;
};

Broadcast.prototype.duration_in_minutes = function duration_in_minutes(){
  var duration = this.duration / 60;

  return duration;
};

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

Broadcast.isAvailable = function isAvailable(baseuri, channel, date, success, error){
  $.ajax({
    type: 'HEAD',
    url: baseuri + '/schedule/'+channel.id+'/'+ Utils.date.getDateParam( date ),
    global: false,
    success: success,
    error: error
  });
};


Broadcast.getList = function getList(baseuri, channel, date, callback){
  $.getJSON(baseuri + '/schedule/'+channel.id+'/'+ Utils.date.getDateParam( date ), function(response){
    var broadcasts = [];
    var tracker = {};

    // grabbing the broadcasts for the first and unique key item
    broadcasts = response[ Object.keys(response)[0] ].map(function(data){
      var broadcast = Broadcast.fromJSON(data);

      if (!tracker[ broadcast.start_hour() ]){
        tracker[ broadcast.start_hour() ] = true;
        broadcast.subtitle = broadcast.start_hour() + ':00';
      }

      return broadcast;
    });

    callback(broadcasts);
  });
};