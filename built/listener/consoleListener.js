"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const start = new Date().getTime();
let testsCount = 0;
const failedTests = [];
exports.CONSOLE_LISTENER = {
    onStart: (result) => {
        process.stdout.write(`\nTests Started in ${result.threads} thread(s)\n`);
    },
    onTestFinish: result => {
        process.stdout.write(result.error ? 'F' : '.');
        testsCount++;
        if (result.error) {
            failedTests.push({ name: result.name, error: result.error.name, stack: result.error.stack });
        }
    },
    onFinish: _ => {
        process.stdout.write(`\nTests Finished in ${new Date().getTime() - start}ms`);
        process.stdout.write(`\nOverall tests - ${testsCount}. Passed - ${testsCount - failedTests.length}. Failed - ${failedTests.length}\n`);
        if (failedTests.length > 0) {
            const errorMessage = 'Errors:\n' +
                failedTests.map((info, i) => `\t${i + 1}) ` + `${info.name}\n` +
                    `\t\t${info.message}` +
                    `\t\t\t${info.stack}`).join('\n');
            process.stdout.write(`\n${errorMessage}\n`);
        }
    }
};
//# sourceMappingURL=consoleListener.js.map