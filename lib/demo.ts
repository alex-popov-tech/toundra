import { Api } from './api';
import BeforeAll = Api.BeforeAll;
import AfterAll = Api.AfterAll;
import BeforeEach = Api.BeforeEach;
import AfterEach = Api.AfterEach;
import Suite = Api.Suite;

const Test = Api.Test;


// const sleep = async (ms) => {
//     await new Promise(resolve => setTimeout(resolve, ms));
// };
// const failedsleep = async (ms) => {
//     await sleep(ms);
//     throw new Error('fail!');
// };

const sleep = () => new Promise(resolve => setTimeout(resolve, 1000));
const sleepWithMessage = async (message) => { console.log('start', message); await sleep(); console.log('finish', message); }

// BeforeAll(() => sleepWithMessage('before all'));
// AfterAll(() => sleepWithMessage('after all'));
// BeforeEach(() => sleepWithMessage('before each'));
// AfterEach(() => sleepWithMessage('after each'));

Suite('suite', () => {
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
});
