import * as path from 'path';
import { RunnerOptions } from './runnerOptions';
import { TestRun } from './testRun';


export class Runner {
    static instance: Runner;
    readonly testRun: TestRun;
    private readonly options: RunnerOptions;

    static create(options: RunnerOptions) {
        this.instance = new Runner(options);
    }

    private constructor(options: RunnerOptions) {
        this.options = options;
        this.testRun = new TestRun({threads: options.threads});
    }

    async run() {
        const specFiles = this.getSpecFiles();
        for (const specFile of specFiles) {
            require(specFile);
        }
        await this.testRun.start();
    }

    private getSpecFiles(): string[] {
        // complex parse spec files wildcard
        // return this.options.specs.performMagic.map(path => path.resolve(path));
        // return [''];
        return this.options.specs.map(specpath => path.resolve(specpath));
    }
}
