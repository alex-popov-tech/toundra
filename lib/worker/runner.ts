import { Action } from '../beans/action';
import { Run } from './run';
import { RunnerOptions } from './runnerOptions';

export class Runner {
    static instance: Runner;
    private readonly testRun: Run;
    private readonly options: RunnerOptions;

    static initialize(options: RunnerOptions): Runner {
        Runner.instance = new Runner(options);
        return Runner.instance;
    }

    private constructor(options: RunnerOptions) {
        this.options = options;
        this.testRun = new Run(options);
    }

    async runTest() {
        this.initTestsTree();
        return this.testRun.runTest();
    }

    addTest(description: string, action: Action) {
        this.testRun.addTest(description, action);
    }

    private initTestsTree() {
        require(this.options.specPath);
    }
}
