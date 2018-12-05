# CRunner
Concurrent test runner for Javascript written in Typescript.

## Core features
* Easy concurrency for running tests in parallel - you need to specify how many threads you want to use and you are
ready to go
* BeforeAll, AfterAll, BeforeEach, AfterEach hooks
* (TBD) jasmine-like test listeners (async listeners supported)

## Examples

```
// spec.js

console.log('Declare global hooks start');
BeforeAll(async () => { console.log('Global before all called'); });
BeforeEach(async () => { console.log('Global before each called'); });
AfterEach(async () => { console.log('Global after each called'); });
AfterAll(async () => { console.log('Global after all called'); });
console.log('Declare global hooks end');

console.log('Declare test suite start');
Suite('Test suite name', () => {

    console.log('Declare suite hooks start');
    BeforeAll(async () => { console.log('Suite before all called'); });
    BeforeEach(async () => { console.log('Suite before each called'); });
    AfterEach(async () => { console.log('Suite after each called'); });
    AfterAll(async () => { console.log('Suite after all called'); });
    console.log('Declare suite hooks end');

    console.log('Declare tests start');
    Test('test 1', async () => { console.log('test 1'); });
    Test('test 1', async () => { console.log('test 2'); });
    console.log('Declare tests end');
});
console.log('Declare test suite end');
```

```
npm run build && node ./built/bin/crunner.js ./built/spec.js

Declare global hooks start
Declare global hooks end
Declare test suite start
Declare suite hooks start
Declare suite hooks end
Declare tests start
Declare tests end
Declare test suite end
Global before all called
Suite before all called
Global before each called
Suite before each called
test 1
Suite after each called
Global after each called
Global before each called
Suite before each called
test 2
Suite after each called
Global after each called
Suite after all called
Global after all called
```


