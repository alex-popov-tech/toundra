import { Action } from '../beans/action';
import { Hooks } from '../beans/hooks';
import { HookType } from '../beans/hookType';
import { Listener } from '../beans/listener';
import { Configuration } from '../configuration';
import { Suite } from './beans/suite';
import { SuitesResult } from './beans/suitesResult';


export class Run {

    private readonly globalBeforeAll = new Hooks<'BeforeAll'>();
    private readonly globalAfterAll = new Hooks<'AfterAll'>();
    private readonly listeners: Listener[] = [];
    private readonly result: SuitesResult = {error: null, suites: []};
    private readonly threads: number;
    private readonly suites: Suite[] = [];
    private currentSuite: Suite;
    currentSpecFile: string;

    constructor(threads: number) {
        this.threads = threads;
    }

    async run(): Promise<SuitesResult> {
        await Promise.all(this.listeners.map(async (listener) => await listener.onStart(null)));
        try {
            await this.globalBeforeAll.run();
        } catch (error) {
            this.result.error = {
                message: error.message,
                stack: error.stack
            };
            return this.result;
        }

        for (const suite of this.suites) {
            if (suite.name !== Configuration.DEFAULT_SUITE_NAME) {
                await Promise.all(this.listeners.map(async (listener) => await listener.onSuiteStart(null)));
            }
            this.result.suites.push(await suite.run());
            if (suite.name !== Configuration.DEFAULT_SUITE_NAME) {
                await Promise.all(this.listeners.map(async (listener) => await listener.onSuiteFinish(null)));
            }
        }

        try {
            await this.globalAfterAll.run();
        } catch (error) {
            this.result.error = {
                message: error.message,
                stack: error.stack
            };
        }
        await Promise.all(this.listeners.map(async (listener) => await listener.onFinish(null)));
        return this.result;
    }

    addSuite(name: string, action: Action) {
        const suite = new Suite(name, this.threads);
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
        if (listener.onSuiteStart) {
            this.listeners.push(listener);
        } else if (listener.onSuiteFinish) {
            this.listeners.push(listener);
        }
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
            suite = new Suite(Configuration.DEFAULT_SUITE_NAME, this.threads);
            this.suites.push(suite);
        }
        suite.addTest(name, action, this.currentSpecFile);
    }

}
