import { HookName } from './hookName';
import { Hooks } from './hooks';
import { Suite } from './suite';
import { TestRunOptions } from './testRunOptions';


export class TestRun {
    private readonly BeforeAll = new Hooks();
    private readonly AfterAll = new Hooks();
    private readonly BeforeEach = new Hooks();
    private readonly AfterEach = new Hooks();
    private readonly suites: Suite[] = [];
    private readonly threads: number;
    private currentSuite: Suite;

    constructor(options: TestRunOptions) {
        this.threads = options.threads;
    }

    async start() {
        await this.BeforeAll.run();
        for (const suite of this.suites) {
            await suite.start(this.threads);
        }
        await this.AfterAll.run();
    }

    addSuite(description: string, body: () => void | Promise<void>) {
        const suite = new Suite(description, this.BeforeEach, this.AfterEach);
        this.suites.push(suite);
        this.currentSuite = suite;
        body();
        this.currentSuite = null;
    }

    addTest(description: string, body: () => void | Promise<void>) {
        if (this.isLocalSuiteContext()) {
            this.addSuiteTest(description, body);
            return;
        }
        this.addGlobalTest(description, body);
    }

    private isLocalSuiteContext(): boolean {
        return !!this.currentSuite;
    }

    private addSuiteTest(description: string, body: () => void | Promise<void>) {
        this.currentSuite.addTest(description, body);
    }

    private addGlobalTest(description: string, body: () => void | Promise<void>) {
        let suite = this.suites.find(suite => suite.description === 'global');
        if (!suite) {
            suite = new Suite('global', this.BeforeEach, this.AfterEach);
            this.suites.push(suite);
        }
        suite.addTest(description, body);
    }

    addHook(name: HookName, body: () => (void | Promise<void>)) {
        if (this.isLocalSuiteContext()) {
            this.addSuiteHook(name, body);
            return;
        }
        this.addGlobalHook(name, body);
    }

    private addSuiteHook(name: HookName, body: () => (void | Promise<void>)) {
        this.currentSuite.addHook(name, body);
    }

    private addGlobalHook(name: HookName, body: () => (void | Promise<void>)) {
        this[name].add(body);
    }

}
