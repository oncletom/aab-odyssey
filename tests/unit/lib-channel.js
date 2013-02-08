"use strict";

suite('Channel Library', function(){
  var accepted_keys = ['id', 'name', 'sort_order', 'image'];

  test('constructor', function(){
    expect(function(){ new Channel() }).not.to.throwException();
    expect(new Channel()).to.only.have.keys(accepted_keys);
  });

  test('#fromJSON()', function(){
    var item = new Channel();
    var data = [
      {},
      { "id": "aab_one", "name": "AAB One", "image": "/dev/null", "sort_order": 2001 }
    ];

    // Checking we have the proper values for each objects
    data.forEach(function(json){
      item = Channel.fromJSON(json);

      expect(item).to.only.have.keys(accepted_keys);

      accepted_keys.forEach(function(key){
        expect(item[key]).to.be(json[key]);
      });
    });
  });

  test.skip('#getList()', function(){

  });
});