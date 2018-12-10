import { Action } from '../beans/action';
import { Hooks } from '../beans/hooks';
import { HookType } from '../beans/hookType';
import { SyncAction } from '../beans/syncAction';
import { RunOptions } from './runOptions';
import { Test } from './test';


export class Run {

    private readonly options: RunOptions;
    private readonly globalBeforeEach = new Hooks<'BeforeEach'>();
    private readonly globalAfterEach = new Hooks<'AfterEach'>();
    private readonly beforeEach = new Hooks<'BeforeEach'>();
    private readonly afterEach = new Hooks<'AfterEach'>();
    private expectedSuiteFound = false;
    private expectedTestFound = false;
    private test: Test = null;

    constructor(options: RunOptions) {
        this.options = options;
    }

    async run() {
        await this.globalBeforeEach.run();
        await this.beforeEach.run();
        await this.test.run();
        await this.afterEach.run();
        await this.globalAfterEach.run();
    }

    addSuite(name: string, action: SyncAction) {
        if (!this.expectedTestFound && this.options.suiteName === this.options.suiteName) {
            this.expectedSuiteFound = true;
            action();
            this.expectedSuiteFound = false;
        }
    }

    addTest(name: string, action: Action) {
        if (!this.expectedTestFound && this.expectedSuiteFound && this.options.testName === name) {
            this.test = new Test(name, action);
            this.expectedTestFound = true;
        }
    }

    addHook(type: HookType, action: Action) {
        if (type === 'BeforeEach') {
            if (this.expectedSuiteFound) this.beforeEach.add(action);
            else this.globalBeforeEach.add(action);
        } else {
            if (this.expectedSuiteFound) this.afterEach.add(action);
            else this.globalAfterEach.add(action);
        }
    }

}
