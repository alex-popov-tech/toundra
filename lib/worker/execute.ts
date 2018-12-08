// @ts-ignore
import { parentPort, workerData } from 'worker_threads';
import { Runner } from './runner';


const {testName} = workerData;
// const {testName, specPath} = workerData;
const specPath = require('path').resolve('./built/spec.js');
Runner.initialize({specPath: specPath, testName: testName}).runTest().then(result => {
    parentPort.postMessage(result);
});
