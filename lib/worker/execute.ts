// @ts-ignore
import { parentPort, workerData } from 'worker_threads';
import { AfterRunTestInfo } from '../listener/afterRunTestInfo';
import { Runner } from './runner';


const {specPath, suiteName, testName} = workerData;
Runner.initialize({specPath: specPath, suiteName: suiteName, testName: testName}).run().then((result: AfterRunTestInfo) => {
    parentPort.postMessage(JSON.stringify(result));
});
