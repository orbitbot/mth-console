var ConsoleStorage = function() {
  var contents = m.prop([]);

  this.get = contents,
  this.add = function(el) {
    contents(contents().concat(el));
  }
};