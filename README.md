# CRunner
Test runner for Javascript, which supports easy parallelization by test.

## Core features
* Easy concurrency for running tests in parallel - you need to specify how many threads you want to use and you are
ready to go
* BeforeAll, AfterAll, BeforeEach, AfterEach hooks
* (TBD) Suites
* (TBD) jasmine-like test listeners (async listeners supported)

## Examples

Here is demo spec which simulates running of 10 tests, each of takes 1 second to run.
```
// spec.js

const sleep = () => new Promise(resolve => setTimeout(resolve, 1000));
const sleepWithMessage = async (message) => { console.log('start', message); await sleep(); console.log('finish', message); }

Test('test 1', () => sleepWithMessage('test1'));
Test('test 2', () => sleepWithMessage('test2'));
Test('test 3', () => sleepWithMessage('test3'));
Test('test 4', () => sleepWithMessage('test4'));
Test('test 5', () => sleepWithMessage('test5'));
Test('test 6', () => sleepWithMessage('test6'));
Test('test 7', () => sleepWithMessage('test7'));
Test('test 8', () => sleepWithMessage('test8'));
Test('test 9', () => sleepWithMessage('test9'));
Test('test 10', () => sleepWithMessage('test10'));

```

Run them sequentially to ensure that overall test run time ~ 10 second.
```
npm run build && node ./built/bin/crunner.js ./built/demo.js

==================================
RUNNER STARTED
==================================
... logs for you to be sure that tests are working
==================================
RUNNER FINISHED, time taken - 10805ms
==================================
```

Okay, lets try to increase thread count in two times (previously there was single one, now there will be two):
```
npm run build && node ./built/bin/crunner.js --threads 2 ./built/demo.js

==================================
RUNNER STARTED
==================================
... logs for you to be sure that tests are working
==================================
RUNNER FINISHED, time taken - 5454ms
==================================
```

Pretty neat, but what about decrease tests run time to 2 second?
```
npm run build && node ./built/bin/crunner.js --threads 5 ./built/demo.js

==================================
RUNNER STARTED
==================================
... logs for you to be sure that tests are working
==================================
RUNNER FINISHED, time taken - 2293ms
==================================
```

Going crazy:
```
npm run build && node ./built/bin/crunner.js --threads 10 ./built/demo.js

==================================
RUNNER STARTED
==================================
... logs for you to be sure that tests are working
==================================
RUNNER FINISHED, time taken - 1277ms
==================================
```

Yeap, this is a demo of test runner for NodeJS, which can do parallel testing THAT EASY.
