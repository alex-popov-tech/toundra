import { Action } from '../beans/action';
import { ActionError } from '../beans/actionError';
import { Hooks } from '../beans/hooks';
import { HookType } from '../beans/hookType';
import { SyncAction } from '../beans/syncAction';
import { Configuration } from '../configuration';
import { Test } from './beans/test';
import { TestResult } from './beans/testResult';
import { RunOptions } from './runOptions';


export class Run {

    private readonly options: RunOptions;
    private readonly globalBeforeEach = new Hooks<'BeforeEach'>();
    private readonly globalAfterEach = new Hooks<'AfterEach'>();
    private readonly beforeEach = new Hooks<'BeforeEach'>();
    private readonly afterEach = new Hooks<'AfterEach'>();
    private isExpectedSuiteContext = false;
    private isExpectedTestFound = false;
    private test: Test = null;

    constructor(options: RunOptions) {
        this.options = options;
        this.isExpectedSuiteContext = options.suiteName === Configuration.DEFAULT_SUITE_NAME;
    }

    async run(): Promise<TestResult> {
        let testError: ActionError = null;
        try {
            await this.globalBeforeEach.run();
            await this.beforeEach.run();
            await this.test.run();
            await this.afterEach.run();
            await this.globalAfterEach.run();
        } catch (error) {
            testError = {
                message: error.message,
                stack: error.stack
            };
        }

        return {
            name: this.test.name,
            status: testError ? 'failed' : 'passed',
            error: testError
        };
    }

    addSuite(name: string, action: SyncAction) {
        if (
            !this.isExpectedTestFound &&
            !this.isExpectedSuiteContext &&
            this.options.suiteName === this.options.suiteName
        ) {
            this.isExpectedSuiteContext = true;
            action();
            this.isExpectedSuiteContext = false;
        }
    }

    addTest(name: string, action: Action) {
        if (
            !this.isExpectedTestFound &&
            this.isExpectedSuiteContext &&
            this.options.testName === name
        ) {
            this.test = new Test(name, action);
            this.isExpectedTestFound = true;
        }
    }

    addHook(type: HookType, action: Action) {
        if (type === 'BeforeEach') {
            if (this.isExpectedSuiteContext) this.beforeEach.add(action);
            else this.globalBeforeEach.add(action);
        } else {
            if (this.isExpectedSuiteContext) this.afterEach.add(action);
            else this.globalAfterEach.add(action);
        }
    }

}
