var mq     = require('mithril-query');
var should = chai.should();

describe('Command history widget', function() {

  describe('view', function() {

    it('always has input and result sections', function() {
      var widget = HistoryWidget.view(new HistoryWidget.controller(function() {
        return [{
          input  : m.prop('foo'),
          output : m.prop([]),
          result : m.prop('bar')
        }];
      }));

      var view = mq(widget);
      view.should.have('pre:contains("foo")');
      view.should.contain('bar');
    });

    it('has as many output lines as logged in command', function() {
      var widget = HistoryWidget.view(new HistoryWidget.controller(function() {
        return [{
          input  : m.prop('foo'),
          output : m.prop([{ args: ['1'] }, { args: ['2'] }]),
          result : m.prop('bar')
        }];
      }));

      var view = mq(widget);
      view.should.have('pre');
      view.should.have(4, 'div');
    });
  });
});
