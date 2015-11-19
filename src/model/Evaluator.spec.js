describe('A code evaluator', function() {

  it('is a constructor that returns an eval function');

  describe('an eval function', function() {
    it('accepts strings of javascript code');
    it('accepts primitive types');
    it('does not require valid javascript');
    it('returns a result object');
  });

  describe('eval return object', function() {
    it('has input, output and result fields');

    describe('input', function() {
      it('should equal the arguments to the eval function');
    });

    describe('result', function() {
      it('should return the output of valid input');
      it('should return an error if input is invalid or errors occur');
    });

    describe('output', function() {
      it('should catch calls to any console methods in input');
    });
  });

  describe('eval implementation checks', function() {
    it('[1,2,3].map(function(e) { console.log(e); });');
  });
});
