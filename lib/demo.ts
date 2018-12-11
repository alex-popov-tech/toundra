import { Api } from './api';
import Suite = Api.Suite;

const Test = Api.Test;


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
