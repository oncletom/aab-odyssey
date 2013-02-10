"use strict";

function BroadcastsController($, settings){
  /** @param {BroadcastsController} self */
  var self = this;

  self.storage = null;
  self.broadcaster = null;
  self.settings = settings;

  function displayBroadcasts(e, channel, date){
    Broadcast.getList(self.settings['api-baseuri'], channel, date, function(response){
      $('[data-template="channel-schedule"]').html(
        AAB['channel-schedule-component']({broadcasts: response})
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