(function($, document){
  var controllers = [ChannelsController];

  controllers.forEach(function(controller){
    new controller($);
  });
})(Zepto, document);