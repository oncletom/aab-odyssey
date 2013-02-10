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

    $('[data-state-controller]').forEach(function(el){
      self.observe(el);
    });
  })();
}

AppStatesController.prototype.observe = function observe(el, event){
  var container = el;
  var self = this;

  $(el).on(event || 'click', 'a', function observer(e){
    self.setState(el.getAttribute('data-state-controller'), {
      hash: e.currentTarget.hash.replace(/^#/, '')
    });
  });
};

/**
 * Triggers a new App State
 *
 * @event state:set {Array.<String, String>}}
 */
AppStatesController.prototype.setState = function setState(new_state, args){
  this.broadcaster.trigger('state:set', [new_state, this.state]);
  this.broadcaster.trigger('state:is:' + new_state, [args]);

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