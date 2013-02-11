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
      $('[data-template="channel-schedule"]').html(
        AAB['channel-schedule-component']({
          channel: channel,
          current_date: date.toLocaleDateString(),
          previous_date: date_utils.getDateParam( previous_date ),
          previous_date_string: previous_date.toLocaleDateString(),
          next_date: date_utils.getDateParam( next_date ),
          next_date_string: next_date.toLocaleDateString(),
          broadcasts: response
        })
      );
    });
  }

  /*
   * Initialization
   */
  self.init = function init(){
    self.broadcaster.on('broadcasts:show', $.proxy(displayBroadcasts, self));
  };
}