// @ts-ignore
import { parentPort, workerData } from 'worker_threads';
import { Configuration } from '../configuration';
import { AfterRunTestInfo } from '../listener/afterRunTestInfo';
import { Collector } from './collector';
import { Run } from './run';


const {specPath, suiteName, testName} = workerData;

const collector = Collector.initialize(specPath, suiteName, testName);
collector.addListener(Configuration.DEFAULT_LISTENER);
const testRun = new Run(collector.getData());

testRun.run().then((result: AfterRunTestInfo) => {
    parentPort.postMessage(JSON.stringify(result));
});
