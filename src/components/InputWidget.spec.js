var mq     = require('mithril-query');
var should = chai.should();

describe('Input widget', function() {

  describe('Keyboard events', function() {

    function createKeyboardEvent(keyCode, shiftKey) {
      var e = new window.KeyboardEvent('keyDown', { bubbles: true, cancelable: true, shiftKey: !!shiftKey });
      Object.defineProperty(e, 'keyCode', { value: keyCode });
      return e;
    }

    var ctrl, evalFn;
    beforeEach(function() {
      evalFn = new sinon.spy();
      ctrl = new InputWidget.controller({ eval: evalFn })
    });

    describe('Enter', function() {
      it('submits the input content when Enter is pressed', function() {
        ctrl.input('!');
        ctrl.exec(createKeyboardEvent(13));
        evalFn.called.should.equal(true);
      });

      it('clears the input when input is submitted', function() {
        ctrl.input('!');
        ctrl.exec(createKeyboardEvent(13));
        expect(ctrl.input()).to.equal('');
      });

      it('does not submit if the input is empty', function() {
        ctrl.exec(createKeyboardEvent(13));
        evalFn.called.should.equal(false);
      });

      it('does not submit if shift-Enter is pressed', function() {
        ctrl.input('!');
        ctrl.exec(createKeyboardEvent(13, true));
        evalFn.called.should.equal(false);
      });
    });
  });
});
