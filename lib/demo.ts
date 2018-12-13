import { Api } from './api';
import { OnStart } from './beans/results/onStart';
import Suite = Api.Suite;
import BeforeAll = Api.BeforeAll;
import AfterAll = Api.AfterAll;
import BeforeEach = Api.BeforeEach;
import AfterEach = Api.AfterEach;
import AddListener = Api.AddListener;

const Test = Api.Test;


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


BeforeAll(() => { console.log('global before all'); });
// BeforeAll(() => { console.log('global before all'); throw new Error('oops'); });
AfterAll(() => { console.log('global after all'); });
// AfterAll(() => { console.log('global after all'); throw new Error('oops'); });
BeforeEach(() => { console.log('global before each'); });
// BeforeEach(() => { console.log('global before each'); throw new Error('oops'); });
AfterEach(() => { console.log('global after each'); });
// AfterEach(() => { console.log('global after each'); throw new Error('oops'); });

AddListener({
    onStart: (result: OnStart) => console.log('on start', result),
    onSuiteStart: (result) => console.log('on suite start', result),
    onTestStart: (result) => console.log('on test start', result),
    onTestFinish: (result) => console.log('on test finish', result),
    onSuiteFinish: (result) => console.log('on suite finish', result),
    onFinish: (result) => console.log('on finish', result)
})

// just tests, no suites required :)
Test('my test 1', () => sleepWithMessage('test1'));
Test('my test 2', () => sleepWithMessage('test2'));
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

    BeforeAll(() => { console.log('before all'); });
    // BeforeAll(() => { console.log('before all'); throw new Error('oops'); });
    AfterAll(() => { console.log('after all'); });
    // AfterAll(() => { console.log('after all'); throw new Error('oops'); });
    BeforeEach(() => { console.log('before each'); });
    // BeforeEach(() => { console.log('before each'); throw new Error('oops'); });
    AfterEach(() => { console.log('after each'); });
    // AfterEach(() => { console.log('after each'); throw new Error('oops'); });

    Test('my test 11', () => sleepWithMessage('test11'));
    Test('my test 12', () => sleepWithMessage('test12'));
    // Test('my test 13', () => sleepWithMessage('test13'));
    // Test('my test 14', () => sleepWithMessage('test14'));
    // Test('my test 15', () => sleepWithMessage('test15'));
    // Test('my test 16', () => sleepWithMessage('test16'));
    // Test('my test 17', () => sleepWithMessage('test17'));
    // Test('my test 18', () => sleepWithMessage('test18'));
    // Test('my test 19', () => sleepWithMessage('test19'));
    // Test('my test 20', () => sleepWithMessage('test20'));
});
