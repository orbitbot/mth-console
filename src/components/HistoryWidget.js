var HistoryWidget = {
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
