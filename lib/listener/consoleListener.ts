import {OnTestFinishInfo} from './handlers/onTestFinishInfo';
import {Listener} from './listener';

const start = new Date().getTime();
let testsCount = 0;
const failedTests: OnTestFinishInfo[] = [];

export const CONSOLE_LISTENER: Listener = {
  onStart: (result) => {
    process.stdout.write(`\nTests Started in ${result.threads} thread(s)\n`);
  },
  onTestFinish: result => {
    process.stdout.write(result.error ? 'F' : '.');
    testsCount++;
    if (result.error) {
      failedTests.push(result);
    }
  },
  onFinish: _ => {
    process.stdout.write(`\nTests Finished in ${new Date().getTime() - start}ms`);
    process.stdout.write(`\nOverall tests - ${testsCount}. Passed - ${testsCount - failedTests.length}. Failed - ${failedTests.length}\n`);
    if (failedTests.length > 0) {
      const errorMessage = 'Errors:\n' +
        failedTests.map((result, i) =>
          `\t${i + 1}) ` + `${result.name}\n` +
          `\t\t${result.error.name}` +
          `\t\t\t${result.error.stack}`
        ).join('\n');
      process.stdout.write(`\n${errorMessage}\n`);
    }
  }
};
