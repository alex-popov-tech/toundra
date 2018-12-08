import * as path from 'path';
import { RunnerOptions } from './runnerOptions';
import { TestRun } from './testRun';


export class Runner {
    static instance: Runner;
    readonly testRun: TestRun;
    private readonly options: RunnerOptions;

    static create(options: RunnerOptions) {
        Runner.instance = new Runner(options);
        return Runner.instance;
    }

    private constructor(options: RunnerOptions) {
        this.options = options;
        this.testRun = new TestRun({threads: options.threads});
    }

    async run() {
        this.initTestsTree();
        return this.testRun.run();
    }

    addTest(description: string, body: () => void | Promise<void>) {
        this.testRun.addTest(description, body);
    }

    private initTestsTree() {
        const specFiles = this.getSpecFiles();
        for (const specFile of specFiles) {
            require(specFile);
        }
    }

    private getSpecFiles(): string[] {
        // TODO complex parser for wildcards
        // complex parse spec files wildcard
        // return this.options.specs.performMagic.map(path => path.resolve(path));
        // return [''];
        return this.options.specs.map(specpath => path.resolve(specpath));
    }
}
