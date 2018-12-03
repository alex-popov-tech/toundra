import { AsyncTaskQueue } from './asyncTestQueue';
import { RunnerOptions } from './runnerOptions';
import { Test } from './test';
import { TestResult } from './testResult';

export class Runner {
    private readonly options: RunnerOptions;
    private readonly tests: Test[];
    private static instance: Runner;

    private constructor(options: RunnerOptions) {
        this.options = options;
        this.tests = [];
    }

    addTest(test: Test) {
        this.tests.push(test);
    }

    async start() {
        const asyncTestRunner = new AsyncTaskQueue(this.tests, this.options.threads);
        const results: TestResult[] = await asyncTestRunner.run();
        return results;
    }

    static init(options: RunnerOptions) {
        this.instance = new Runner(options);
    }

    static getInstance() {
        return this.instance;
    }
}
