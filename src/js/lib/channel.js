function Channel(){

}

Channel.getList = function getList(callback){
  $.getJSON('http://rd-broadcast-bookmarks.herokuapp.com/channels', function(response){
    var channels = [];

    // mapping object values to channel array
    channels = Object.keys(response).map(function(key){
      return response[key];
    });

    callback(channels);
  });
};