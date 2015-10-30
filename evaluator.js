var Evaluator = function() {
  var logged = [];

  function extendConsoleAPI() {
    var console = window.console;

    function intercept(method) {
      var original = console[method];

      console[method] = function() {
        logged.push({
          type: method,
          args: Array.prototype.slice.apply(arguments)
        });

        original.apply(console, arguments);
      }
    }

    // ['log', 'info', 'warn', 'error'].forEach(intercept);
    ['log', 'warn', 'error'].forEach(intercept);
  }

  extendConsoleAPI();

  return function(input) {
    logged = [];

    var result;
    try {
      result = eval(input);
    } catch (e) {
      console.error(e);
      result = e.message;
    };

    return {
      input  : input,
      output : logged,
      result : result
    };
  };
};