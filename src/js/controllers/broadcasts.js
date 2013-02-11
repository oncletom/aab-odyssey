"use strict";

function BroadcastsController($, settings){
  /** @param {BroadcastsController} self */
  var self = this;

  self.storage = null;
  self.broadcaster = null;
  self.settings = settings;

  function displayBroadcasts(e, channel, date){
    var date_utils = Utils.date;
    var previous_date = date_utils.previousDay(date);
    var next_date = date_utils.nextDay(date);

    Broadcast.getList(self.settings['api-baseuri'], channel, date, function(response){
      rivets.bind($('.schedule-container').get(0), {
        previous_date: previous_date,
        current_date: date,
        next_date: next_date,
        broadcasts: response
      });

      self.broadcaster.trigger('broadcasts:shown', [channel, date]);
    });
  }

  function checkNavigationDateAvailability(e, channel, date){
    var date_utils = Utils.date;
    var previous_date = date_utils.previousDay(date);
    var next_date = date_utils.nextDay(date);

    [previous_date, next_date].forEach(function(d){
      var $parent = $('a[data-schedule="'+Utils.date.getDateParam(d)+'"]').parent();

      Broadcast.isAvailable(self.settings['api-baseuri'], channel, d, function(){
        $parent.removeClass('disabled');
      }, function(){
        $parent.addClass('disabled');
      });
    });
  }

  function displayBroadcastsHandler(e){
    var channel, date;

    date = new Date(e.target.getAttribute('data-schedule'));
    channel = e.target.hash.replace(/#/, '');

    self.broadcaster.trigger('broadcasts:show', [channel, date]);
  }

  /*
   * Initialization
   */
  self.init = function init(){
    self.broadcaster.on('broadcasts:show', $.proxy(displayBroadcasts, self));
    self.broadcaster.on('broadcasts:shown', $.proxy(checkNavigationDateAvailability, self));
    self.broadcaster.on('click', 'a[data-broadcast="show"]', $.proxy(displayBroadcastsHandler, self));
  };
}