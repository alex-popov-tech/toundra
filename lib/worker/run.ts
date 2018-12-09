import { Test } from '../beans/test';
import { RunOptions } from './runOptions';

export class Run {
    private test: Test = Test.DEFAULT;
    private readonly options: RunOptions;

    constructor(options: RunOptions) {
        this.options = options;
    }

    async runTest() {
        return this.test.run();
    }

    addTest(description: string, body: () => void | Promise<void>) {
        if (this.options.testName === description) {
            this.test = new Test('', description, body);
        }
    }

}
