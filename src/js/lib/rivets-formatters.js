"use strict";
(function(r){
  r.formatters.date = function(value){
    return value.toLocaleDateString();
  };

  r.formatters.date_ymd = function(value){
    return value.toISOString().split('T')[0];
  };

  r.formatters.in_minutes = function(value){
    return value / 60;
  };

  r.formatters.programme_url = function(value){
    return 'http://www.bbc.co.uk/programmes/'+value;
  };
})(rivets);

(function(r){
  r.binders.subtitle = function(el, value){
    if (value){
      var dt = document.createElement('dt');
      dt.className = 'subtitle';
      dt.innerHTML = '<span>'+value+':00</span>';

      el.parentNode.insertBefore(dt, el);
    }
  };
})(rivets);