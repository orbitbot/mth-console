describe('In-memory storage', function() {

  var storage = new CmdHistory();

  it('supports the command history API', function() {
    assert.isFunction(storage.add, 'Storage implementation should have an "add" method');
    assert.isFunction(storage.get, 'Storage implementation should have an "get" method');
  });

});
