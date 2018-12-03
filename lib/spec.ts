import { Api } from './api';
const Test = Api.Test;

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const failedsleep = async (ms) => {
    await sleep(ms);
    throw new Error('fail!')
};

Test('test1', () => sleep(2000));
Test('test2', () => failedsleep(2000));
Test('test3', () => sleep(2000));
Test('test4', () => sleep(2000));
Test('test5', () => failedsleep(2000));
Test('test6', () => sleep(2000));
Test('test7', () => sleep(2000));
Test('test8', () => sleep(2000));
Test('test9', () => sleep(2000));
Test('test10', () => failedsleep(2000));
Test('test11', () => sleep(2000));
Test('test12', () => sleep(2000));
Test('test13', () => failedsleep(2000));
Test('test14', () => sleep(2000));
Test('test15', () => sleep(2000));
Test('test16', () => sleep(2000));
Test('test17', () => failedsleep(2000));
Test('test18', () => sleep(2000));
Test('test19', () => sleep(2000));
Test('test20', () => failedsleep(2000));
