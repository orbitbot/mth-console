var Console = {   // eslint-disable-line no-unused-vars
  controller : function(args) {
    function getArgOrDefault(key, Default) {
      if (args && args[key])
        return (Object.prototype.toString.call(args[key]) === '[object Function]') ? (new args[key]) : args[key];

      return new Default;
    }

    var history = getArgOrDefault('history', CmdHistory);
    var evalImpl = getArgOrDefault('eval', Evaluator);

    return {
      eval : function(input) {
        var result = evalImpl(input);
        history.add(new Console.Command(result));
      },
      historyProvider : history.get,
    };
  },
  view : function(ctrl) {
    return [m.component(Console.HistoryWidget, ctrl.historyProvider ),
            m.component(Console.Input, { eval : ctrl.eval })];
  },
};

Console.Command = function(data) {
  this.input  = m.prop(data.input);
  this.output = m.prop(data.output);
  this.result = m.prop(data.result);
};

Console.HistoryWidget = {
  controller : function(provider) {
    this.getEntries = provider;

    this.processsResult = function(res) {
      if (typeof res === 'undefined')
        return 'undefined';

      return JSON.stringify(res);
    };

    this.parentStyle = {
      boxSizing : 'border-box',
      padding   : '5px',
      font      : '400 13px monospace',
      overflowY : 'auto',
    };
  },
  view : function(ctrl) {
    return (<div style={ ctrl.parentStyle }>
              {
                ctrl.getEntries().map(function(command) {
                  var output = command.output().map(function(el) {
                    return (
                      <div>{ el.args.join(' ') }</div>
                    );
                  });

                  return [<pre style="margin:0">{ command.input() }</pre>]
                          .concat(output)
                          .concat([<div>{ ctrl.processsResult(command.result()) }</div>]);
                })
              }
            </div>);
  },
};

Console.Input = {
  controller : function(args) {
    this.input = m.prop('');
    this.exec = function(ev) {
      if (ev.keyCode === 13 && !ev.shiftKey) {
        var input = this.input();
        if (input !== '') {
          args.eval(input);
          this.input('');
        }
        ev.preventDefault();
      }
    };

    this.parentStyle = {
      position   : 'relative',
      border     : '1px solid #888',
      background : '#fff',
    };

    var childStyle = {
      margin     : 0,
      outline    : 0,
      border     : 0,
      padding    : '5px',
      background : 'transparent',
      font       : '400 13/16px monospace',
      whiteSpace : 'pre-wrap',
      wordWrap   : 'break-word',
    };

    this.preStyle = JSON.parse(JSON.stringify(childStyle));

    this.preStyle.display    = 'block';
    this.preStyle.visibility = 'hidden';

    this.textareaStyle = JSON.parse(JSON.stringify(childStyle));

    this.textareaStyle.boxSizing = 'border-box';
    this.textareaStyle.width     = '100%';
    this.textareaStyle.height    = '100%';
    this.textareaStyle.overflow  = 'hidden';
    this.textareaStyle.position  = 'absolute';
    this.textareaStyle.top       = '0';
    this.textareaStyle.left      = '0';
    this.textareaStyle.resize    = 'none';
  },
  view : function(ctrl) {
    return (<div id="console-input" style={ ctrl.parentStyle }>
              <pre style={ ctrl.preStyle }>
                <span textContent={ ctrl.input() } ></span>
                <br />
              </pre>
              <textarea
                style={ ctrl.textareaStyle }
                value={ ctrl.input() }
                oninput={ m.withAttr('value', ctrl.input) }
                onkeydown={ ctrl.exec.bind(ctrl) }>
              </textarea>
            </div>);
  },
};
