

$(document).ready(function () {
  mumuki.registerLocalTestRunner({
    runTests(solution, exercise, result) {
      const interpreter = new window["gobstones-interpreter"].GobstonesInterpreterAPI();
      const runner = new window.GobstonesTestRunner(interpreter);
      result.mulangAst = runner.getMulangAst(solution.sourceCode);

      var options = {};
      var timeout = parseInt(options.timeout);

      if (_.isFinite(timeout))
        interpreter.config.setInfiniteLoopTimeout(timeout);

      if (options.language)
        interpreter.config.setLanguage(options.language);

    }
  })
});
