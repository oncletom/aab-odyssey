"use strict";

suite('Channel Library', function(){
  var defaults, accepted_keys;

  testSuite(function(){
    defaults = {
      id: null,
      name: '',
      sort_order: 0,
      image: null
    };
    accepted_keys = Object.keys(defaults)
  });

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
        expect(item[key]).to.be(json[key] === undefined ? defaults[key] : json[key]);
      });
    });
  });

  test.skip('#getList()', function(){

  });
});