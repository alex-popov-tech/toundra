import { SingleTestRun } from './singleTestRun';

export class SingleTestRunner {
    static instance: SingleTestRunner;

    private readonly options: { specPath: string; testName: string };
    private readonly testRun: SingleTestRun;

    private constructor(options: { specPath: string; testName: string }) {
        this.options = options;
        this.testRun = new SingleTestRun(options);
    }

    static create(options: { specPath: string; testName: string }): SingleTestRunner {
        SingleTestRunner.instance = new SingleTestRunner(options);
        return SingleTestRunner.instance;
    }

    async runTest() {
        this.initTestsTree();
        return this.testRun.runTest();
    }

    addTest(description: string, body: () => void | Promise<void>) {
        this.testRun.addTest(description, body);
    }

    private initTestsTree() {
        require(this.options.specPath);
    }
}
