import { Api } from './api';
import Suite = Api.Suite;
import BeforeAll = Api.BeforeAll;
import AfterAll = Api.AfterAll;
import BeforeEach = Api.BeforeEach;
import AfterEach = Api.AfterEach;

const Test = Api.Test;

const sleep = async (ms) => {
    await new Promise(resolve => setTimeout(resolve, ms));
};
const failedsleep = async (ms) => {
    await sleep(ms);
    throw new Error('fail!');
};

// Test('test1',async () => {
//     await sleep(1000);
// });
//
// Test('test2',async () => {
//     await sleep(1000);
// });
// Test('test3',async () => {
//     await sleep(1000);
// });
// Test('test4',async () => {
//     await sleep(1000);
// });
// Test('test5',async () => {
//     await sleep(1000);
// });

BeforeAll(() => { console.log('global before all hook 1') });
BeforeAll(() => { console.log('global before all hook 2') });
AfterAll(() => { console.log('global after all hook 1') });
AfterAll(() => { console.log('global after all hook 2') });
BeforeEach(() => { console.log('global before each hook 1') });
BeforeEach(() => { console.log('global before each hook 2') });
AfterEach(() => { console.log('global after each hook 1') });
AfterEach(() => { console.log('global after each hook 2') });

Suite('suite1', () => {
    BeforeAll(() => { console.log('SUITE 1 before all hook 1') });
    BeforeAll(() => { console.log('SUITE 1 before all hook 2') });
    AfterAll(() => { console.log('SUITE 1 after all hook 1') });
    AfterAll(() => { console.log('SUITE 1 after all hook 2') });
    BeforeEach(() => { console.log('SUITE 1 before each hook 1') });
    BeforeEach(() => { console.log('SUITE 1 before each hook 2') });
    AfterEach(() => { console.log('SUITE 1 after each hook 1') });
    AfterEach(() => { console.log('SUITE 1 after each hook 2') });

    Test('test1', async () => { await sleep(1000); });
    Test('test2', async () => { await sleep(1000); });
    Test('test3', async () => { await sleep(1000); });
    Test('test4', async () => { await sleep(1000); });
    Test('test5', async () => { await sleep(1000); });
});
