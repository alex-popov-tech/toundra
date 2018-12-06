import { Api } from './api';
const Test = Api.Test;


const sleep = async (ms) => { await new Promise(resolve => setTimeout(resolve, ms)); };
const failedsleep = async (ms) => {
    await sleep(ms);
    throw new Error('fail!');
};


// let foo = 'default';
// new Array(20).fill(null).map((_, index) => index).forEach(index => {
//     Test(`test${index}`, async () => {
//         console.log('start test', index, foo);
//         foo = `test${index}`;
//         await sleep(500);
//         console.log('finish test', index, foo);
//     });
// });

class Foo { value = 'default'; }
new Array(20).fill(null).map((_, index) => index).forEach(index => {
    Test(`test${index}`, async () => {
        let foo = new Foo();
        console.log('start test', index, foo.value);
        foo.value = `test${index}`;
        await sleep(500);
        console.log('finish test', index, foo.value);
    });
});


// Suite('suite1', () => {
//     BeforeAll(() => { console.log('SUITE 1 before all hook 1') });
//     BeforeAll(() => { console.log('SUITE 1 before all hook 2') });
//     AfterAll(() => { console.log('SUITE 1 after all hook 1') });
//     AfterAll(() => { console.log('SUITE 1 after all hook 2') });
//     BeforeEach(() => { console.log('SUITE 1 before each hook 1') });
//     BeforeEach(() => { console.log('SUITE 1 before each hook 2') });
//     AfterEach(() => { console.log('SUITE 1 after each hook 1') });
//     AfterEach(() => { console.log('SUITE 1 after each hook 2') });
//
//     Test('test1', async () => { await sleep(1000); });
//     Test('test2', async () => { await sleep(1000); });
//     Test('test3', async () => { await sleep(1000); });
//     Test('test4', async () => { await sleep(1000); });
//     Test('test5', async () => { await sleep(1000); });
// });
