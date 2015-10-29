var Evaluator = function() {
  return function(input) {
    var result;
    try {
      result = eval.call(window, input);
    } catch (e) {
      console.error(e);
      result = e.message;
    };

    var output = undefined;

    console.log('input, output, result', input, undefined, result);
    return {
      input  : input,
      output : output,
      result : result
    };
  };
};