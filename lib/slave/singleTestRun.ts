import { Test } from '../beans/test';
import { SingleTestRunOptions } from './singleTestRunOptions';

export class SingleTestRun {
    private test: Test = new Test(
        'default test dummy',
        () => {
            throw new Error('Default test dummy was not overriden');
        }
    );
    private readonly options: SingleTestRunOptions;

    constructor(options: SingleTestRunOptions) {
        this.options = options;
    }

    async runTest() {
        return this.test.run();
    }

    addTest(description: string, body: () => void | Promise<void>) {
        if (description === this.options.testName) {
            this.test = new Test(description, body);
        }
    }

}
