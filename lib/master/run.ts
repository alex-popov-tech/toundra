import { Action } from '../beans/action';
import { Hooks } from '../beans/hooks';
import { HookType } from '../beans/hookType';
import { Configuration } from '../configuration';
import { AfterRunSuiteInfo } from '../listener/afterRunSuiteInfo';
import { BeforeRunSuiteInfo } from '../listener/beforeRunSuiteInfo';
import { BeforeRunTestInfo } from '../listener/beforeRunTestInfo';
import { Error } from '../listener/error';
import { Listener } from '../listener/listener';
import { RunStatus } from '../listener/runStatus';
import { Suite } from './suite';


export class Run {

    private readonly threads: number;
    currentSpecFile: string;

    private readonly globalBeforeAll = new Hooks<'BeforeAll'>();
    private readonly globalAfterAll = new Hooks<'AfterAll'>();
    private readonly listeners: Listener[] = [];

    private readonly suites: Suite[] = [];
    private currentSuite: Suite;

    constructor(threads: number) {
        this.threads = threads;
    }

    async run() {
        await this.runOnStartListeners();

        const beforeHooksError = await this.runGlobalBeforeAllHooks();
        if (beforeHooksError) {
            await this.runOnFinishListeners('failed', beforeHooksError, []);
            return;
        }

        const results: AfterRunSuiteInfo[] = [];
        for (const suite of this.suites) {
            const result = await suite.run();
            results.push(result);
        }

        const afterHooksError = await this.runGlobalAfterAllHooks();
        if (afterHooksError) {
            await this.runOnFinishListeners('failed', afterHooksError, results);
            return;
        }

        await this.runOnFinishListeners('passed', null, results);
    }

    addSuite(name: string, action: Action) {
        const suite = new Suite(name, this.threads, this.listeners);
        this.suites.push(suite);
        this.currentSuite = suite;
        action();
        this.currentSuite = null;

    }

    addTest(name: string, action: Action) {
        if (this.isLocalSuite()) {
            this.addSuiteTest(name, action);
        } else {
            this.addGlobalTest(name, action);
        }
    }

    addHook(type: HookType, action: Action) {
        if (type === 'BeforeAll') {
            if (this.isLocalSuite()) this.currentSuite.addHook(type, action);
            else this.globalBeforeAll.add(action);
        } else if (type === 'AfterAll') {
            if (this.isLocalSuite()) this.currentSuite.addHook(type, action);
            else this.globalAfterAll.add(action);
        }
    }

    addListener(listener: Listener) {
        this.listeners.push(listener);
    }

    private async runOnStartListeners() {
        const onStartHandlers = this.listeners
            .filter(listener => listener.onStart)
            .map(listener => listener.onStart);

        const globalSuite = this.suites.find(suite => Configuration.DEFAULT_SUITE_NAME === suite.name);
        const globalTestsInfo = globalSuite ? globalSuite.tests.map(test => new BeforeRunTestInfo(test.name)) : [];
        const suitesInfo = this.suites.filter(suite => Configuration.DEFAULT_SUITE_NAME !== suite.name)
            .map(suite => new BeforeRunSuiteInfo(suite.name, suite.tests.map(test => new BeforeRunTestInfo(test.name))));

        for (const onStartHandler of onStartHandlers) {
            await onStartHandler.run({
                globalTests: globalTestsInfo,
                suites: suitesInfo
            });
        }
    }

    private async runOnFinishListeners(status: RunStatus, error: Error, suitesResuls: AfterRunSuiteInfo[]) {
        const onFinishHandlers = this.listeners
            .filter(listener => listener.onFinish)
            .map(listener => listener.onFinish);

        const globalSuiteInfo = suitesResuls.find(suite => Configuration.DEFAULT_SUITE_NAME === suite.name);
        const globalTestsInfo = globalSuiteInfo ? globalSuiteInfo.testsInfo : [];

        for (const onFinishHandler of onFinishHandlers) {
            await onFinishHandler.run({
                status: status,
                error: error,
                globalTests: globalTestsInfo,
                suites: suitesResuls
            });
        }
    }

    private async runGlobalBeforeAllHooks(): Promise<Error> {
        return this.globalBeforeAll.run().then(
            _ => null,
            error => {
                return {name: error.name, stack: error.stack};
            }
        );
    }

    private async runGlobalAfterAllHooks(): Promise<Error> {
        return this.globalAfterAll.run().then(
            _ => null,
            error => {
                return {name: error.name, stack: error.stack};
            }
        );
    }

    private isLocalSuite(): boolean {
        return !!this.currentSuite;
    }

    private addSuiteTest(name: string, action: Action) {
        this.currentSuite.addTest(name, action, this.currentSpecFile);
    }

    private addGlobalTest(name: string, action: Action) {
        let suite = this.suites.find(suite => Configuration.DEFAULT_SUITE_NAME === suite.name);
        if (!suite) {
            suite = new Suite(Configuration.DEFAULT_SUITE_NAME, this.threads, this.listeners);
            this.suites.push(suite);
        }
        suite.addTest(name, action, this.currentSpecFile);
    }

}
