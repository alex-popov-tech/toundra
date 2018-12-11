import { Configuration } from '../configuration';
import { Test } from '../master/beans/test';
import { WorkerUtils } from './workerUtils';


export class WorkerQueue {
    private readonly threads: number;
    private readonly suiteName: string;
    private readonly tests: Test[];
    private readonly results: any[] = [];

    constructor(suiteName: string, tests: Test[], threads = 1) {
        this.suiteName = suiteName;
        this.threads = threads;
        this.tests = tests;
    }

    async run(): Promise<any[]> {
        return new Promise<any[]>(resolve => {
            const tasksCount = this.tests.length;
            const queueLimit = (this.threads < tasksCount) ? this.threads : tasksCount;

            // start initial number of tests
            for (let i = 0; i < queueLimit; i++) {
                this.startTest(i, resolve);
            }
        });
    }

    private startTest(testIndex: number, queueCallback) {
        const testName = this.tests[testIndex].name;
        const specPath = this.tests[testIndex].specFilePath;
        WorkerUtils.asyncStartWorker(Configuration.BIN_PATH, {
            specPath: specPath,
            suiteName: this.suiteName,
            testName: testName
        }).then(
            result => {
                this.results.push(result);

                // if last - return all results
                if (this.tests.length === this.results.length) {
                    queueCallback(this.results);
                }

                // start new task after current if needed
                if (testIndex + this.threads < this.tests.length) {
                    this.startTest(testIndex + this.threads, queueCallback);
                }
            }
        );
    }
}