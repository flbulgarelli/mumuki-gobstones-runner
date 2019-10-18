
(() => {
  const GobstonesTestRunner = new class {
    runTests(solution, exercise, result) {
      const interpreter = new window["gobstones-interpreter"].GobstonesInterpreterAPI();
      const runner = new window.GobstonesTestRunner(interpreter);
      const code = this._getSolutionCode(solution);

      result.mulangAst = runner.getMulangAst(code);
      result.status = 'passed';

      console.log(result.mulangAst);

      // var options = {};
      // var timeout = parseInt(options.timeout);

      // if (_.isFinite(timeout))
      //   interpreter.config.setInfiniteLoopTimeout(timeout);

      // if (options.language)
      //   interpreter.config.setLanguage(options.language);
    }

    // returns the source code of the solution
    // which is at different variables depending whether
    // it is a text or blockly exercise
    _getSolutionCode(solution) {
      return solution['solution[content]'] || solution.solution.sourceCode;
    }
  }

  $(document).ready(function () {
    mumuki.registerLocalTestRunner(GobstonesTestRunner)
  });

})();
