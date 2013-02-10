"use strict";

function ChannelsController($){
  /** @param {ChannelsController} self */
  var self = this;

  var broadcaster = self.broadcaster = $(document);


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

  function displayChannelSchedule(e){
    $('#channel-schedule').html(
      AAB['channel-component']({name: e.data.hash, id: e.data.hash })
    );
  }


  /*
   * Initialization
   */
  (function init(){
    broadcaster.on('channels:update', $.proxy(refreshMenu, self));
    broadcaster.on('channels:update', $.proxy(refreshComponent, self));
    broadcaster.on('state:is:channel-schedule', $.proxy(activateChannelItem, self));
    broadcaster.on('state:is:channel-schedule', $.proxy(displayChannelSchedule, self));

    // Process things
    self.update();
  })();
}

/**
 * Retrieves Channels list and trigger a UI refresh
 *
 * @event channels:update
 */
ChannelsController.prototype.update = function update(){
  var broadcaster = this.broadcaster;

  Channel.getList(function(response){
    broadcaster.trigger('channels:update', response);
  });
};