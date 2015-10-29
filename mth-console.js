var Console = {
  controller: function(args) {
    function getArgOrDefault(key, deflt) {
      if (args && args[key])
        return (Object.prototype.toString.call(x) == '[object Function]') ? (new args[key])  : args[key];
      else
        return new deflt;
    }

    var history = getArgOrDefault('history', ConsoleStorage);
    var evalImpl = getArgOrDefault('eval', Evaluator);

    return {
      historyProvider: history.get,
      eval: function(input) {
        var result = evalImpl(input);
        history.add(new Console.Command(result));
      }
    };
  },
  view: function(ctrl) {
    return [m.component(Console.HistoryWidget, ctrl.historyProvider ),
            m.component(Console.Input, { eval: ctrl.eval })];
  }
};

Console.Command = function(data) {
  this.input = m.prop(data.input);
  this.output = m.prop(data.output)
  this.result = m.prop(data.result);
};

Console.HistoryWidget = {
  controller: function(provider) {
    this.get = provider;
  },
  view: function(history) {
    var parentStyle = {
      boxSizing  : 'border-box',
      padding    : '5px',
      font       : '400 13px monospace',
      overflowY  : 'auto'
    };

    return <div style={ parentStyle }>
              {
                history.get().map(function(command, index) {
                  return [<div>{ command.input() }</div>,
                          <div>{ command.result() }</div>]
                })
              }
           </div>;
  }
};

Console.Input = {
  controller: function(args) {
    this.input = m.prop('');
    this.exec = function(e) {
      if (e.keyCode === 13 && !e.shiftKey) {
        args.eval(this.input());
        this.input('');
        e.preventDefault();
      }
    };
  },
  view: function(ctrl) {
    var parentStyle = {
      position   : 'relative',
      border     : '1px solid #888',
      background : '#fff'
    };

    var childStyle = {
      margin     : 0,
      outline    : 0,
      border     : 0,
      padding    : '5px',
      background : 'transparent',
      font       : '400 13/16px monospace',
      whiteSpace : 'pre-wrap',
      wordWrap   : 'break-word'
    };

    var preStyle = Object.assign({
      display    : 'block',
      visibility : 'hidden'
    }, childStyle);

    var textareaStyle = Object.assign({
      boxSizing : 'border-box',
      width     : '100%',
      height    : '100%',
      overflow  : 'hidden',
      position  : 'absolute',
      top       : '0',
      left      : '0',
      resize    : 'none'
    }, childStyle);

    return <div id="console-input" style={ parentStyle }>
              <pre style={ preStyle }>
                <span textContent={ ctrl.input() } ></span>
                <br />
              </pre>
              <textarea
                style={ textareaStyle }
                value={ ctrl.input() }
                oninput={ m.withAttr('value', ctrl.input) }
                onkeydown={ ctrl.exec.bind(ctrl) }>
              </textarea>
           </div>
  }
};


// m.mount(document.getElementById('consoleApp'), m.component(Console, {  }));
m.mount(document.getElementById('consoleApp'), Console);