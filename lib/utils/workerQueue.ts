import { Configuration } from '../configuration';
import { WorkerUtils } from './workerUtils';


export class WorkerQueue {
    private readonly threads: number;
    private readonly testNames: string[];
    private readonly results: any[] = [];

    constructor(testNames: string[], threads = 1) {
        this.testNames = testNames;
        this.threads = threads;
    }

    async runAll(): Promise<any[]> {
        return new Promise<any[]>(resolve => {
            const tasksCount = this.testNames.length;
            const queueLimit = (this.threads < tasksCount) ? this.threads : tasksCount;

            // start initial number of tests
            for (let i = 0; i < queueLimit; i++) {
                this.startTest(i, resolve);
            }
        });
    }

    private startTest(testIndex: number, queueCallback) {
        const testName = this.testNames[testIndex];
        WorkerUtils.asyncStartWorker(Configuration.BIN_PATH, {testName: testName}).then(
            result => {
                this.results.push(result);

                // if last - return all results
                if (this.testNames.length === this.results.length) {
                    queueCallback(this.results);
                }

                // start new task after current if needed
                if (testIndex + this.threads < this.testNames.length) {
                    this.startTest(testIndex + this.threads, queueCallback);
                }
            }
        );
    }
}