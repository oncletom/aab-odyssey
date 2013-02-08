"use strict";

suite('Channel Library', function(){
  test('constructor', function(){
    expect(new Channel()).to.only.have.keys('id', 'name', 'sort_order', 'image');
  });

  test.skip('#fromJSON()', function(){

  });

  test.skip('#getList()', function(){

  });
});