"use strict";

function BroadcastsController($, settings){
  /** @param {BroadcastsController} self */
  var self = this;

  self.storage = null;
  self.broadcaster = null;
  self.settings = settings;

  function displayBroadcasts(e, channel, date){
    var date_utils = Utils.date;

    Broadcast.getList(self.settings['api-baseuri'], channel, date, function(response){
      $('[data-template="channel-schedule"]').html(
        AAB['channel-schedule-component']({
          channel: channel,
          current_date: date,
          previous_date: date_utils.getDateParam( date_utils.previousDay(date) ),
          next_date: date_utils.getDateParam( date_utils.nextDay(date) ),
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