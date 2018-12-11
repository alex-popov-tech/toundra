# Samael
Concurrent test runner for Javascript written in Typescript.

## Core features
* Easy concurrency for running tests in parallel - you need to specify how many threads you want to use and you are
ready to go
* BeforeAll, AfterAll, BeforeEach, AfterEach hooks
* Suite tests, Plain tests (you can write tests both with suites and without them)
* (TBD) jasmine-like test listeners (async listeners supported)

## Examples

Imagine that you have spec file, which contains 20 tests, and each of them takes 1 second to run. Here is the demo:
```
// demo.js

// imports...

const sleep = () => new Promise(resolve => setTimeout(resolve, 1000));
const sleepWithMessage = async (message) => {
    console.log('start', message);
    await sleep();
    console.log('finish', message);
};


// just tests, no suites required :)
Test('my test 1', () => sleepWithMessage('test1'));
Test('my test 2', () => sleepWithMessage('test2'));
Test('my test 3', () => sleepWithMessage('test3'));
Test('my test 4', () => sleepWithMessage('test4'));
Test('my test 5', () => sleepWithMessage('test5'));
Test('my test 6', () => sleepWithMessage('test6'));
Test('my test 7', () => sleepWithMessage('test7'));
Test('my test 8', () => sleepWithMessage('test8'));
Test('my test 9', () => sleepWithMessage('test9'));
Test('my test 10', () => sleepWithMessage('test10'));

// plain test suites supported too
Suite('my first suite', () => {
    Test('my test 11', () => sleepWithMessage('test11'));
    Test('my test 12', () => sleepWithMessage('test12'));
    Test('my test 13', () => sleepWithMessage('test13'));
    Test('my test 14', () => sleepWithMessage('test14'));
    Test('my test 15', () => sleepWithMessage('test15'));
    Test('my test 16', () => sleepWithMessage('test16'));
    Test('my test 17', () => sleepWithMessage('test17'));
    Test('my test 18', () => sleepWithMessage('test18'));
    Test('my test 19', () => sleepWithMessage('test19'));
    Test('my test 20', () => sleepWithMessage('test20'));
});
```

Running them sequentially will take ~ 20 second.
```
npm run build && node ./built/bin/crunner.js ./built/demo.js

==================================
RUNNER STARTED
==================================
... logs for you to be sure that tests are working
==================================
RUNNER FINISHED, time taken - 21575ms
==================================
```

Okay, lets try to apply parallelism to decrease run time:
```
npm run build && node ./built/bin/crunner.js --threads 2 ./built/demo.js

==================================
RUNNER STARTED
==================================
... logs for you to be sure that tests are working
==================================
RUNNER FINISHED, time taken - 10912ms
==================================
```

Not bad, but what about decrease tests run time to 4 second?
```
npm run build && node ./built/bin/crunner.js --threads 5 ./built/demo.js

==================================
RUNNER STARTED
==================================
... logs for you to be sure that tests are working
==================================
RUNNER FINISHED, time taken - 4561ms
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
RUNNER FINISHED, time taken - 2553ms
==================================
```

Yeap, this is an demo of test runner for NodeJS, which can do parallel testing THAT EASY.
