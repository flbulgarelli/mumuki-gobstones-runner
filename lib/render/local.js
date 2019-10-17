

$(document).ready(function () {
  mumuki.registerLocalTestRunner({
    runTests(solution, exercise, result) {
      const interpreter = new window["gobstones-interpreter"].GobstonesInterpreterAPI();
      const runner = new window.GobstonesTestRunner(interpreter);
      result.mulangAst = runner.getMulangAst(solution);
    }
  })
});
