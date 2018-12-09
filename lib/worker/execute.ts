// @ts-ignore
import { parentPort, workerData } from 'worker_threads';
import { Runner } from './runner';


// const {testName} = workerData;
// const specPath = require('path').resolve('./built/spec.js');
const {testName, specPath} = workerData;
Runner.initialize({specPath: specPath, testName: testName}).runTest().then(result => {
    parentPort.postMessage(result);
});
