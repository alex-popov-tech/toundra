import { Api } from './api';
import { OnFinishHandler } from './listener/handlers/onFinishHandler';
import { OnStartHandler } from './listener/handlers/onStartHandler';
import { OnSuiteFinishHandler } from './listener/handlers/onSuiteFinishHandler';
import { OnSuiteStartHandler } from './listener/handlers/onSuiteStartHandler';
import { OnTestFinishHandler } from './listener/handlers/onTestFinishHandler';
import { OnTestStartHandler } from './listener/handlers/onTestStartHandler';
import BeforeAll = Api.BeforeAll;
import AfterAll = Api.AfterAll;
import BeforeEach = Api.BeforeEach;
import AfterEach = Api.AfterEach;
import AddListener = Api.AddListener;
import Suite = Api.Suite;
import Test = Api.Test;


const sleep = () => new Promise(resolve => setTimeout(resolve, 1000));
const sleepWithMessage = async (message) => {
    console.log('start', message);
    await sleep();
    console.log('finish', message);
};
const sleepWithMessageAndError = async (message) => {
    await sleepWithMessage(message);
    throw new Error('oops')
};


// BeforeAll(() => { console.log('global before all'); });
// AfterAll(() => { console.log('global after all'); });
// BeforeEach(() => { console.log('global before each'); });
// AfterEach(() => { console.log('global after each'); });
// BeforeAll(() => { console.log('global before all'); throw new Error('oops'); });
// AfterAll(() => { console.log('global after all'); throw new Error('oops'); });
// BeforeEach(() => { console.log('global before each'); throw new Error('oops'); });
// AfterEach(() => { console.log('global after each'); throw new Error('oops'); });

AddListener({
    onStart: result => console.log('on start', result),
    // onSuiteStart: new OnSuiteStartHandler(result => console.log('on suite start', result)),
    // onTestStart: new OnTestStartHandler(result => console.log('on test start', result)),
    // onTestFinish: new OnTestFinishHandler(result => console.log('on test finish', result)),
    // onSuiteFinish: new OnSuiteFinishHandler(result => console.log('on suite finish', result)),
    // onFinish: new OnFinishHandler(result => console.log('on finish', result))
})

// TODO change AddListener function to be able to take object with optional hooks
// TODO separate tests collector from runner
// TODO add onSuiteStart onSuiteFinish logic to remove GLOBAL suite
// TODO test every listener with failed hook\test\suite
// TODO test everything

// just tests, no suites required :)
Test('my test 1', () => sleepWithMessage('test1'));
// Test('my test 2', () => sleepWithMessage('test2'));
// Test('my test 3', () => sleepWithMessage('test3'));
// Test('my test 4', () => sleepWithMessage('test4'));
// Test('my test 5', () => sleepWithMessage('test5'));
// Test('my test 6', () => sleepWithMessage('test6'));
// Test('my test 7', () => sleepWithMessage('test7'));
// Test('my test 8', () => sleepWithMessage('test8'));
// Test('my test 9', () => sleepWithMessage('test9'));
// Test('my test 10', () => sleepWithMessage('test10'));

// plain test suites supported too
Suite('my first suite', () => {

    // BeforeAll(() => { console.log('before all'); });
    // AfterAll(() => { console.log('after all'); });
    // BeforeEach(() => { console.log('before each'); });
    // AfterEach(() => { console.log('after each'); });
    // BeforeAll(() => { console.log('before all'); throw new Error('oops'); });
    // AfterAll(() => { console.log('after all'); throw new Error('oops'); });
    // BeforeEach(() => { console.log('before each'); throw new Error('oops'); });
    // AfterEach(() => { console.log('after each'); throw new Error('oops'); });

    Test('my test 11', () => sleepWithMessage('test11'));
    // Test('my test 12', () => sleepWithMessage('test12'));
    // Test('my test 13', () => sleepWithMessage('test13'));
    // Test('my test 14', () => sleepWithMessage('test14'));
    // Test('my test 15', () => sleepWithMessage('test15'));
    // Test('my test 16', () => sleepWithMessage('test16'));
    // Test('my test 17', () => sleepWithMessage('test17'));
    // Test('my test 18', () => sleepWithMessage('test18'));
    // Test('my test 19', () => sleepWithMessage('test19'));
    // Test('my test 20', () => sleepWithMessage('test20'));
});
