// @ts-ignore
import { parentPort, workerData } from 'worker_threads';
import { TestResult } from './beans/testResult';
import { Runner } from './runner';


const {specPath, suiteName, testName} = workerData;
Runner.initialize({specPath: specPath, suiteName: suiteName, testName: testName}).run().then((result: TestResult) => {
    parentPort.postMessage(JSON.stringify(result));
});
