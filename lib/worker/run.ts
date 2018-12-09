import { Action } from '../beans/action';
import { Hooks } from '../beans/hooks';
import { HookType } from '../beans/hookType';
import { Test } from '../beans/test';
import { RunOptions } from './runOptions';

export class Run {
    private readonly options: RunOptions;
    private test: Test = Test.DEFAULT;
    private readonly beforeEach = new Hooks<'BeforeEach'>();
    private readonly afterEach = new Hooks<'AfterEach'>();

    constructor(options: RunOptions) {
        this.options = options;
    }

    async runTest() {
        await this.beforeEach.run();
        await this.test.run();
        await this.afterEach.run();
    }

    addTest(description: string, body: () => void | Promise<void>) {
        if (this.options.testName === description) {
            this.test = new Test('', description, body);
        }
    }

    addHook(type: HookType, action: Action) {
        if (type === 'BeforeEach') {
            this.beforeEach.add(action);
        } else {
            this.afterEach.add(action);
        }
    }

}
