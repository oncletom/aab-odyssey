"use strict";

function AppStatesController($){
  /** @param {ChannelsController} self */
  var self = this;

  var broadcaster = self.broadcaster = $(document);
  var state = self.state = null;

  /*
   * Initialization
   */
  (function init(){
    self.setState('init');
  })();
}

/**
 * Triggers a new App State
 *
 * @event state:set {Array.<String, String>}}
 */
AppStatesController.prototype.setState = function setState(new_state){
  this.broadcaster.trigger('state:set', [new_state, this.state]);

  $('[data-state-visible]').forEach(function changeState(el){
    var $el = $(el);

    if (~$el.attr('data-state-visible').split(',').indexOf(new_state)) {
      $el.removeClass('hide');
    }
    else {
      $el.addClass('hide');
    }
  });

  this.state = new_state;
};