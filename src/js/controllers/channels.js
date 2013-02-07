
function ChannelsController($){
  /** @param {ChannelsController} self */
  var self = this;

  var broadcaster = self.broadcaster = $(document);


  function refreshMenu(e){
    $('[data-template="channels-list"][data-variant="nav"]').html(
      AAB['src/templates/channels-list-nav.hbs']({items: e.data || []})
    );
  }

  function refreshComponent(e){
    console.log(e.data);
    $('[data-template="channels-list"][data-variant="component"]').html(
      AAB['src/templates/channels-list-component.hbs']({items: e.data || []})
    );
  }


  /*
   * Initialization
   */
  (function init(){
    broadcaster.on('channels:update', $.proxy(refreshMenu, self));
    broadcaster.on('channels:update', $.proxy(refreshComponent, self));

    // Process things
    self.update();
  })();
}

ChannelsController.prototype.update = function update(){
  var broadcaster = this.broadcaster;

  Channel.getList(function(response){
    broadcaster.trigger('channels:update', response);
  });
};