import { Test } from '../beans/test';
import { TestRunOptions } from './testRunOptions';
import { WorkerQueue } from './workerQueue';

export class TestRun {
    tests: Test[] = [];
    private readonly options: TestRunOptions;

    constructor(options: TestRunOptions) {
        this.options = options;
    }

    async run() {
        // TODO that should not be here, theese are different runs
        return (this.options.threads === 1) ? this.sequentialRun() : this.parallelRun();
    }

    private async sequentialRun() {
        for (const test of this.tests) await test.run();
        return;
    }

    private parallelRun() {
        const workerQueue = new WorkerQueue(this.tests.map(test => test.description), this.options.threads);
        return workerQueue.runAll();
    }

    addTest(description: string, body: () => void | Promise<void>) {
        this.tests.push(new Test(description, body));
    }
}
