import { Test } from '../beans/test';
import { Configuration } from '../configuration';
import { WorkerUtils } from './workerUtils';


export class WorkerQueue {
    private readonly threads: number;
    private readonly tests: Test[];
    private readonly results: any[] = [];

    constructor(tests: Test[], threads = 1) {
        this.tests = tests;
        this.threads = threads;
    }

    async runAll(): Promise<any[]> {
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
        const testName = this.tests[testIndex].description;
        const specPath = this.tests[testIndex].specFilePath;
        WorkerUtils.asyncStartWorker(Configuration.BIN_PATH, {testName: testName, specPath: specPath}).then(
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