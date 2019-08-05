"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const start = new Date().getTime();
exports.CONSOLE_LISTENER = {
    onStart: (result) => {
        process.stdout.write(`\nTests Started in ${result.threads} thread(s)\n`);
    },
    onTestFinish: result => {
        process.stdout.write(result.error ? 'F' : '.');
    },
    onFinish: result => {
        const testsCount = result.globalTests.length + result.suites.map(suite => suite.tests.length).reduce((l1, l2) => l1 + l2, 0);
        const passedTests = [...result.globalTests.filter(test => !test.error), ...result.suites.map(suite => suite.tests.filter(test => !test.error))];
        const failedTests = [...result.globalTests.filter(test => test.error), ...result.suites.map(suite => suite.tests.filter(test => test.error)).reduce((a1, a2) => a1.concat(a2), [])];
        const errorMessage = 'Errors:\n' + failedTests.map((test, index) => `\t${index + 1}) ${test.name}\n\t\tError message: ${test.error.name}\n\t\tError stacktrace: ${test.error.stack.replace('\n', '\n')}`).join('\n\n');
        process.stdout.write(`\nTests Finished in ${new Date().getTime() - start}ms`);
        process.stdout.write(`\nOverall tests - ${testsCount}. Passed - ${passedTests.length}. Failed - ${failedTests.length}\n`);
        if (failedTests.length > 0) {
            process.stdout.write(`\n${errorMessage}\n`);
        }
    }
};
//# sourceMappingURL=consoleListener.js.map