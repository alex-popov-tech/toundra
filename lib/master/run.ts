import { Action } from '../beans/action';
import { Test } from '../beans/test';
import { RunOptions } from './runOptions';
import { WorkerQueue } from '../utils/workerQueue';


export class Run {
    private readonly tests: Test[] = [];
    private readonly options: RunOptions;

    constructor(options: RunOptions) {
        this.options = options;
    }

    async run() {
        const workerQueue = new WorkerQueue(this.tests.map(test => test.description), this.options.threads);
        return workerQueue.runAll();
    }

    addTest(description: string, action: Action) {
        this.tests.push(new Test(description, action));
    }

}
