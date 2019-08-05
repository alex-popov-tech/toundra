import {Listener} from './listener';

let start: number;

export const CONSOLE_LISTENER: Listener = {
  onStart: (result) => {
    process.stdout.write(`\nTests Started in ${result.threads} thread(s)\n`);
    start = new Date().getTime();
  },
  onFinish: result => {
    const passedTests = [];
    const failedTests = [];

    result.globalTests.forEach(globalTest => globalTest.error ? failedTests.push(globalTest) : passedTests.push(globalTest));
    result.suites.forEach(globalSuite => globalSuite.tests.forEach(test => test.error ? failedTests.push(test) : passedTests.push(test)));

    process.stdout.write(
      `\nTests Finished in ${new Date().getTime() - start}ms.` +
      `\nOverall tests - ${passedTests.length + failedTests.length}.` +
      `\nPassed - ${passedTests.length}. Failed - ${failedTests.length}`
    );

    if (failedTests.length > 0) {
      const errorMessage = '\nErrors:\n' +
        failedTests.map((result, i) =>
          `\t${i + 1}) ` + `${result.name}\n` +
          `\t\t${result.error.name}` +
          `\t\t\t${result.error.stack}`
        ).join('\n');
      process.stdout.write(`\n${errorMessage}\n`);
    }
  }
};

