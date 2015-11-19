Storage = function() {   // eslint-disable-line no-unused-vars
  var contents = m.prop([]);

  this.get = contents;
  this.add = function(el) {
    contents(contents().concat(el));
  };
};
