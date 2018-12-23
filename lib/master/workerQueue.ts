import { Configuration } from '../configuration';
import { AfterRunTestInfo } from '../listener/afterRunTestInfo';
import { RawTest } from './collector/rawTest';
const {Worker} = require('worker_threads');


export class WorkerQueue {
    private readonly threads: number;
    private readonly suiteName: string;
    private readonly tests: RawTest[];
    private readonly results: AfterRunTestInfo[] = [];

    constructor(suiteName: string, tests: RawTest[], threads: number) {
        this.suiteName = suiteName;
        this.threads = threads;
        this.tests = tests;
    }

    async run(): Promise<AfterRunTestInfo[]> {
        await new Promise<string[]>(resolve => {
            const tasksCount = this.tests.length;
            const queueLimit = (this.threads < tasksCount) ? this.threads : tasksCount;

            // start initial number of tests
            for (let i = 0; i < queueLimit; i++) {
                this.startTest(i, resolve);
            }
        });

        return this.results;
    }

    private startTest(testIndex: number, queueCallback) {
        const testName = this.tests[testIndex].name;
        const specPath = this.tests[testIndex].specFilePath;
        this.startWorker(Configuration.BIN_PATH, {
            specPath: specPath,
            suiteName: this.suiteName,
            testName: testName
        }, (jsonResult) => {
            // safe after test result
            this.results.push(JSON.parse(jsonResult));

            // if last - return all results
            if (this.tests.length === this.results.length) {
                queueCallback(this.results);
            }

            // start new task after current if needed
            if (testIndex + this.threads < this.tests.length) {
                this.startTest(testIndex + this.threads, queueCallback);
            }
        });
    }

    private startWorker(jsFilePath: string, workerData: any, callback: (result: any) => any) {
        const worker = new Worker(jsFilePath, {workerData: workerData});
        let wresult = null;
        worker.on('message', message => {
            wresult = message;
        });
        worker.on('exit', _ => callback(wresult));
    }
}