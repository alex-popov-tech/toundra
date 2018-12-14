import { Action } from '../beans/action';
import { Hooks } from '../beans/hooks';
import { HookType } from '../beans/hookType';
import { AfterRunSuiteInfo } from '../listener/afterRunSuiteInfo';
import { AfterRunTestInfo } from '../listener/afterRunTestInfo';
import { BeforeRunTestInfo } from '../listener/beforeRunTestInfo';
import { Error } from '../listener/error';
import { Listener } from '../listener/listener';
import { SuiteStatus } from '../listener/suiteStatus';
import { Test } from './test';
import { WorkerQueue } from './workerQueue';


export class Suite {

    private readonly beforeAll = new Hooks<'BeforeAll'>();
    private readonly afterAll = new Hooks<'AfterAll'>();
    private readonly listeners: Listener[] = [];

    private readonly threads: number;
    readonly tests: Test[] = [];
    readonly name: string;

    constructor(name: string, threads: number, listeners: Listener[]) {
        this.name = name;
        this.threads = threads;
        this.listeners = listeners;
    }

    async run(): Promise<AfterRunSuiteInfo> {
        await this.runOnSuiteStartListeners();

        const beforeHooksError = await this.runBeforeAllHooks();
        if (beforeHooksError) {
            await this.runOnSuiteFinishListeners('failed', beforeHooksError, null);
            return new AfterRunSuiteInfo(this.name, [], 'failed', beforeHooksError);
        }

        const testResults: AfterRunTestInfo[] = await new WorkerQueue(this, this.tests, this.threads).run();

        const afterHooksError = await this.runAfterAllHooks();
        if (afterHooksError) {
            await this.runOnSuiteFinishListeners('failed', beforeHooksError, testResults);
            return new AfterRunSuiteInfo(this.name, testResults, 'failed', beforeHooksError);
        }

        await this.runOnSuiteFinishListeners('passed', null, testResults);
        return new AfterRunSuiteInfo(this.name, testResults, 'passed', null);
    }

    addTest(name: string, action: Action, specFile: string) {
        this.tests.push(new Test(name, action, specFile));
    }

    addHook(type: HookType, action: Action) {
        if (type === 'BeforeAll') this.beforeAll.add(action);
        else if (type === 'AfterAll') this.afterAll.add(action);
    }

    private async runBeforeAllHooks(): Promise<Error> {
        return this.beforeAll.run().then(
            _ => null,
            error => {
                return {name: error.name, stack: error.stack};
            }
        );
    }

    private async runAfterAllHooks(): Promise<Error> {
        return this.afterAll.run().then(
            _ => null,
            error => {
                return {name: error.name, stack: error.stack};
            }
        );
    }

    private async runOnSuiteStartListeners() {
        const onSuiteStartHandlers = this.listeners
            .filter(listener => listener.onSuiteStart)
            .map(listener => listener.onSuiteStart);

        for (const onSuiteStartHandler of onSuiteStartHandlers) {
            await onSuiteStartHandler.run({
                name: this.name,
                testsInfo: this.tests.map(test => new BeforeRunTestInfo(test.name))
            });
        }
    }

    private async runOnSuiteFinishListeners(status: SuiteStatus, error: Error, testResults: AfterRunTestInfo[]) {
        const onSuiteFinishHandlers = this.listeners
            .filter(listener => listener.onSuiteFinish)
            .map(listener => listener.onSuiteFinish);

        for (const onSuiteFinishHandler of onSuiteFinishHandlers) {
            await onSuiteFinishHandler.run({
                name: this.name,
                status: status,
                error: error,
                testsInfo: testResults
            });
        }
    }

}
