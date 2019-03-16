# Toundra

Parallel test runner for NodeJS.

### Prerequisites
[Nodejs 11.7.0+](https://nodejs.org/en/)

## Core features
* Easy running tests in parallel built on top of NodeJS [Worker](https://nodejs.org/api/worker_threads.html) - you need to specify how many threads you want to use and you are ready to go
* `BeforeAll`, `AfterAll`, `BeforeEach`, `AfterEach` hooks
* Suite tests, Plain tests (you can write tests both with suites and without them)
* Listeners - add reporters to your tests

## Installation

Install `Toundra` via npm to your project:

```
npm i --save-dev toundra
```

Add `test` script to your package.json:

```
"test": toundra --threads 1 specs/*spec.js"
```

Change `1` to any number of threads you want to use and start writing tests!

## Examples

Imagine that you have spec file, which contains 20 tests, and each of them takes 1 second to run. Here is the demo:

```
// specs/myspec.js

const {Test, Suite} = require('toundra');

// stub of async test which takes 1 second to run
const sleepOneSec = () => new Promise(resolve => setTimeout(resolve, 1000));

// just tests, no suites required :)
Test('my test 1', () => sleepWithMessage('test1'));
Test('my test 2', () => sleepWithMessage('test2'));
...
Test('my test 10', () => sleepWithMessage('test10'));

// plain test suites supported too
Suite('my first suite', () => {
    Test('my test 11', () => sleepWithMessage('test11'));
    Test('my test 12', () => sleepWithMessage('test12'));
    ...
    Test('my test 20', () => sleepWithMessage('test20'));
});
```

Running them sequentially will take ~ 20 second.

`toundra --threads 1 specs/myspec.js`
```
Tests Started in 1 thread(s)
....................
Tests Finished in 21575ms
Overall tests - 20. Passed - 20. Failed - 0
```

Okay, lets try to apply parallelism to decrease run time:

`node --experimental-worker node_modules/.bin/toundra --threads 2 specs/myspec.js`
```
Tests Started in 2 thread(s)
....................
Tests Finished in 10912ms
Overall tests - 20. Passed - 20. Failed - 0
```

Not bad, but what about decrease tests run time to 4 second?

`toundra --threads 5 specs/myspec.js`
```
Tests Started in 5 thread(s)
....................
Tests Finished in 4561ms
Overall tests - 20. Passed - 20. Failed - 0
```

Going crazy:

`toundra --threads 10 specs/myspec.js`
```
Tests Started in 10 thread(s)
....................
Tests Finished in 2553ms
Overall tests - 20. Passed - 20. Failed - 0
```

Yeap, this is a demo of test runner for NodeJS, which can do parallel testing THAT EASY.
