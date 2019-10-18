
(() => {
  function renderError(result) {
    if (result.errored) {
      return `
        <p class="error-text">
          <%= ${result.message} %>
        </p>`;
    } else {
      return '';
    }
  }

  function renderExampleResult(result) {
    return `
      <div class="board">
        <p class="title">${result.title}</p>
        <p>
          <gs-board>
            ${result.initialBoard}
          </gs-board>
          <gs-board>
            ${result.expectedBoard}
          </gs-board>
          <gs-board>
            ${result.finalBoard}
          </gs-board>
        </p>
      </div>
    `;
  }

  function renderResult(result) {
    return `
  <style>
    .boards-container { display: inline-flex; }
    .error-text { color: #d9534f; }
    .boom-text { margin-top: 20px; }
    .title { color: #b4bcc2; text-align: left; font-family: Arial, Helvetica, sans-serif; font-size: 9pt; }
    .board { margin: 0 15px; }
  </style>
  ${renderError(result)}
  <div class="boards-container">
    ${result.results ? result.results.map(renderExampleResult).join('\n') : ''}
  </div>`
  }


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

      result.status = runnerResults.status;
      result.mulangAst = runnerResults.mulangAst;
      result.testResults = runnerResults.results.map((it) => ({status: it.status, title: ''}));
      //result.html = renderResult(result);
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
