import * as path from 'path';
import { Action } from '../beans/action';
import { HookType } from '../beans/hookType';
import { SyncAction } from '../beans/syncAction';
import { RunnerOptions } from './runnerOptions';
import { Run } from './run';


export class Runner {
    static instance: Runner;
    private readonly testrun: Run;
    private readonly options: RunnerOptions;

    static initialize(options: RunnerOptions) {
        Runner.instance = new Runner(options);
        return Runner.instance;
    }

    private constructor(options: RunnerOptions) {
        this.options = options;
        this.testrun = new Run(options.threads);
    }

    async run() {
        this.initTestsTree();
        return this.testrun.run();
    }

    addSuite(name: string, action: SyncAction) {
        this.testrun.addSuite(name, action);
    }

    addTest(name: string, action: Action) {
        this.testrun.addTest(name, action);
    }

    addHook(type: HookType, action: Action) {
        this.testrun.addHook(type, action);
    }

    private initTestsTree() {
        const specFiles = this.getSpecFiles();
        for (const specFile of specFiles) {
            this.testrun.currentSpecFile = specFile;
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
