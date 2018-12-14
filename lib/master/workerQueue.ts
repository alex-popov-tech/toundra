import { Configuration } from '../configuration';
import { AfterRunTestInfo } from '../listener/afterRunTestInfo';
import { Suite } from './suite';
import { Test } from './test';
import { WorkerUtils } from './workerUtils';


export class WorkerQueue {
    private readonly threads: number;
    private readonly suite: Suite;
    private readonly tests: Test[];
    private readonly results: AfterRunTestInfo[] = [];

    constructor(suite: Suite, tests: Test[], threads = 1) {
        this.suite = suite;
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
        WorkerUtils.asyncStartWorker(Configuration.BIN_PATH, {
            specPath: specPath,
            suiteName: this.suite.name,
            testName: testName
        }).then(
            (jsonResult: string) => {
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
            }
        );
    }
}