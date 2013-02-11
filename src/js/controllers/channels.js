"use strict";

function ChannelsController($, settings){
  /** @param {ChannelsController} self */
  var self = this;

  self.storage = null;
  self.broadcaster = null;
  self.settings = settings;


  function updateUI(e){
    $('.navbar-static-top .nav, #channels-list').forEach(function(el){
      rivets.bind(el, {
        channels: e.data
      });
    });
  }

  function activateChannelItem(e){
    $('[data-template="channels-list"]').children().forEach(function(child){
      var $child = $(child);

      if ($child.find('a[href="#'+ e.data.hash +'"]').length){
        $child.addClass('active');
      }
      else{
        $child.removeClass('active');
      }
    });
  }

  function displayChannel(e){
    var channel = Channel.getChannel(e.data.hash, self.storage.channels);
    var date = new Date(self.settings['date-start'] || '');

    /*$('#channel-schedule').html(
      AAB['channel-component'](channel)
    );*/

    self.broadcaster.trigger('broadcasts:show', [channel, date]);
  }


  /*
   * Initialization
   */
  self.init = function init(){
    self.broadcaster.on('channels:update', $.proxy(updateUI, self));
    self.broadcaster.on('state:is:channel-schedule', $.proxy(activateChannelItem, self));
    self.broadcaster.on('state:is:channel-schedule', $.proxy(displayChannel, self));

    // Process things
    self.update();
  };
}

/**
 * Retrieves Channels list and trigger a UI refresh
 *
 * @event channels:update
 */
ChannelsController.prototype.update = function update(){
  var self = this;

  Channel.getList(function(response){
    self.storage.channels = response;

    self.broadcaster.trigger('channels:update', response);
  }, self.settings['api-baseuri']);
};