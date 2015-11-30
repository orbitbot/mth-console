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
    return [m.component(HistoryWidget, ctrl.historyProvider ),
            m.component(InputWidget, { eval : ctrl.eval })];
  },
};

Console.Command = function(data) {
  this.input  = m.prop(data.input);
  this.output = m.prop(data.output);
  this.result = m.prop(data.result);
};
