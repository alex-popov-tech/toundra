import { Action } from '../beans/action';
import { HookType } from '../beans/hookType';
import { SyncAction } from '../beans/syncAction';
import { Run } from './run';
import { RunnerOptions } from './runnerOptions';

export class Runner {
    static instance: Runner;
    private readonly testrun: Run;
    private readonly options: RunnerOptions;

    static initialize(options: RunnerOptions): Runner {
        Runner.instance = new Runner(options);
        return Runner.instance;
    }

    private constructor(options: RunnerOptions) {
        this.options = options;
        this.testrun = new Run(options);
    }

    async run() {
        this.initTestsTree();
        return this.testrun.run();
    }

    addTest(name: string, action: Action) {
        this.testrun.addTest(name, action);
    }

    addSuite(name: string, action: SyncAction) {
        this.testrun.addSuite(name, action);
    }

    addHook(type: HookType, action: Action) {
        this.testrun.addHook(type, action);
    }

    private initTestsTree() {
        require(this.options.specPath);
    }
}
