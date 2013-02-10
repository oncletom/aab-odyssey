"use strict";

function ChannelsController($, settings){
  /** @param {ChannelsController} self */
  var self = this;

  self.storage = null;
  self.broadcaster = null;
  self.settings = settings;


  function refreshMenu(e){
    $('[data-template="channels-list"][data-variant="nav"]').html(
      AAB['channels-list-nav']({items: e.data || []})
    );
  }

  /**
   * Updates Channels component
   * @param {Event} e
   */
  function refreshComponent(e){
    $('[data-template="channels-list"][data-variant="component"]').html(
      AAB['channels-list-component']({items: e.data || []})
    );
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
    var channel = getChannel(e.data.hash);
    var date = new Date(self.settings['date-start'] || '');

    $('#channel-schedule').html(
      AAB['channel-component'](channel)
    );

    self.broadcaster.trigger('broadcasts:show', [channel, date]);
  }

  function getChannel(id){
    var channel = null;

    self.storage.channels.some(function(item){
      if (item.id === id){
        channel = item;
        return true;
      }
    });

    return channel;
  }


  /*
   * Initialization
   */
  self.init = function init(){
    self.broadcaster.on('channels:update', $.proxy(refreshMenu, self));
    self.broadcaster.on('channels:update', $.proxy(refreshComponent, self));
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