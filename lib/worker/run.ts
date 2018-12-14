import { Action } from '../beans/action';
import { Hooks } from '../beans/hooks';
import { HookType } from '../beans/hookType';
import { SyncAction } from '../beans/syncAction';
import { Configuration } from '../configuration';
import { AfterRunTestInfo } from '../listener/afterRunTestInfo';
import { Error } from '../listener/error';
import { Listener } from '../listener/listener';
import { RunStatus } from '../listener/runStatus';
import { RunOptions } from './runOptions';
import { Test } from './test';


export class Run {

    private readonly options: RunOptions;
    private readonly globalBeforeEach = new Hooks<'BeforeEach'>();
    private readonly globalAfterEach = new Hooks<'AfterEach'>();
    private readonly beforeEach = new Hooks<'BeforeEach'>();
    private readonly afterEach = new Hooks<'AfterEach'>();
    private readonly listeners: Listener[] = [];
    private isExpectedSuiteContext = false;
    private isExpectedTestFound = false;
    private test: Test = null;

    constructor(options: RunOptions) {
        this.options = options;
        this.isExpectedSuiteContext = options.suiteName === Configuration.GLOBAL_SUITE_NAME;
    }

    async run() {
        await await this.runOnTestStartListeners();

        try {
            await this.globalBeforeEach.run();
            await this.beforeEach.run();
            await this.test.run();
            await this.afterEach.run();
            await this.globalAfterEach.run();
        } catch (error) {
            await this.runOnTestFinishListeners('failed', new Error(error));
            return new AfterRunTestInfo(this.options.testName, 'passed', new Error(error));
        }

        await this.runOnTestFinishListeners('passed', null);
        return new AfterRunTestInfo(this.options.testName, 'passed', null);
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

    addListener(listener: Listener) {
        if (listener.onTestStart) {
            this.listeners.push(listener);
        } else if (listener.onTestFinish) {
            this.listeners.push(listener);
        }
    }


    private async runOnTestStartListeners() {
        const onTestStartHandlers = this.listeners
            .filter(listener => listener.onTestStart)
            .map(listener => listener.onTestStart);

        for (const onTestStartHandler of onTestStartHandlers) {
            await onTestStartHandler.run({
                suiteName: this.options.suiteName,
                name: this.options.testName
            });
        }
    }

    private async runOnTestFinishListeners(status: RunStatus, error: Error) {
        const onTestFinishHandlers = this.listeners
            .filter(listener => listener.onTestFinish)
            .map(listener => listener.onTestFinish);

        for (const onTestFinishHandler of onTestFinishHandlers) {
            await onTestFinishHandler.run({
                suiteName: this.options.suiteName,
                name: this.options.testName,
                status: status,
                error: error
            });
        }
    }

}
