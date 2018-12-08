// @ts-ignore
import { isMainThread, parentPort, Worker, workerData } from 'worker_threads';
import { SingleTestRunner } from './singleTestRunner';
import * as path from 'path';

const {testName} = workerData;
const specPath = path.resolve('./built/spec.js');
SingleTestRunner.create({specPath: specPath, testName: testName}).runTest().then(result => {
    parentPort.postMessage(result);
});
