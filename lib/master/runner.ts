import * as path from 'path';
import { Action } from '../beans/action';
import { RunnerOptions } from './runnerOptions';
import { Run } from './run';


export class Runner {
    static instance: Runner;
    private readonly testRun: Run;
    private readonly options: RunnerOptions;

    static initialize(options: RunnerOptions) {
        Runner.instance = new Runner(options);
        return Runner.instance;
    }

    private constructor(options: RunnerOptions) {
        this.options = options;
        this.testRun = new Run(options);
    }

    async run() {
        this.initTestsTree();
        return this.testRun.run();
    }

    addTest(description: string, action: Action) {
        this.testRun.addTest(description, action);
    }

    private initTestsTree() {
        const specFiles = this.getSpecFiles();
        for (const specFile of specFiles) {
            this.testRun.currentSpecFile = specFile;
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
