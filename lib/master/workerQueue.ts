import { Configuration } from '../configuration';
import { Suite } from './beans/suite';
import { Test } from './beans/test';
import { TestResult } from './beans/testResult';
import { WorkerUtils } from './workerUtils';


export class WorkerQueue {
    private readonly threads: number;
    private readonly suite: Suite;
    private readonly tests: Test[];
    private readonly results: any[] = [];

    constructor(suite: Suite, tests: Test[], threads = 1) {
        this.suite = suite;
        this.threads = threads;
        this.tests = tests;
    }

    async run(): Promise<TestResult[]> {
        const jsonResults = await new Promise<string[]>(resolve => {
            const tasksCount = this.tests.length;
            const queueLimit = (this.threads < tasksCount) ? this.threads : tasksCount;

            // start initial number of tests
            for (let i = 0; i < queueLimit; i++) {
                this.startTest(i, resolve);
            }
        });

        return jsonResults.map(jsonTestResult => JSON.parse(jsonTestResult))
            .map(testResult => [testResult])
            .reduce((arr1, arr2) => arr1.concat(arr2));
    }

    private startTest(testIndex: number, queueCallback) {
        const testName = this.tests[testIndex].name;
        const specPath = this.tests[testIndex].specFilePath;
        WorkerUtils.asyncStartWorker(Configuration.BIN_PATH, {
            specPath: specPath,
            suiteName: this.suite.name,
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