
(() => {
  const GobstonesTestRunner = new class {
    runTests(solution, exercise, result) {
      const interpreter = new window["gobstones-interpreter"].GobstonesInterpreterAPI();
      const runner = new window.GobstonesTestRunner(interpreter);
      const code = this._getSolutionCode(solution);
      const extraCode = null; // TODO

      const runnerResults = runner.runTests({
        code: code,
        extraCode: extraCode,
        examples: exercise.offline_test.examples
      })

      if (runnerResults.results.some((it) =>  it.status !== 'passed')) {
        result.status = 'errored';
      } else if (runnerResults.results.every((it) =>  it.result.status == 'passed')) {
        result.status = 'passed';
      } else {
        result.status = 'failed';
      }
      result.mulangAst = runnerResults.mulangAst;
      result.testResults = runnerResults.results.map((it) => {return {status: it.status, title: '', message: ''}});

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
