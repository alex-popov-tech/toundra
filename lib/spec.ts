import { Api } from './api';
import Suite = Api.Suite;

const Test = Api.Test;

const sleep = async (ms) => {
    await new Promise(resolve => setTimeout(resolve, ms));
};
const failedsleep = async (ms) => {
    await sleep(ms);
    throw new Error('fail!');
};

Test('test1',async () => {
    await sleep(1000);
});

Test('test2',async () => {
    await sleep(1000);
});
Test('test3',async () => {
    await sleep(1000);
});
Test('test4',async () => {
    await sleep(1000);
});
Test('test5',async () => {
    await sleep(1000);
});

Suite('suite1', () => {
    Test('test1', async () => {
        await sleep(1000);
    });

    Test('test2', async () => {
        await sleep(1000);
    });
    Test('test3', async () => {
        await sleep(1000);
    });
    Test('test4', async () => {
        await sleep(1000);
    });
    Test('test5', async () => {
        await sleep(1000);
    });
});
