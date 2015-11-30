var InputWidget = {
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
