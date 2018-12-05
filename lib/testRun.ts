import { Hooks } from './hooks';
import { Suite } from './suite';
import { TestRunOptions } from './testRunOptions';


export class TestRun {
    readonly globalBeforeAll = new Hooks();
    readonly globalAfterAll = new Hooks();
    readonly globalBeforeEach = new Hooks();
    readonly globalAfterEach = new Hooks();
    private readonly suites: Suite[] = [];
    private readonly threads: number;
    private currentSuite: Suite;

    constructor(options: TestRunOptions) {
        this.threads = options.threads;
    }

    async start() {
        await this.globalBeforeAll.run();
        for (const suite of this.suites) {
            await suite.start(this.threads);
        }
        await this.globalAfterAll.run();
    }

    addSuite(description: string, body: () => void | Promise<void>) {
        const suite = new Suite(description, this.globalBeforeEach, this.globalAfterEach);
        this.suites.push(suite);
        this.currentSuite = suite;
        body();
        this.currentSuite = null;
    }

    addTest(description: string, body: () => void | Promise<void>) {
        if (this.currentSuite) {
            this.currentSuite.addTest(description, body);
            return;
        }
        let suite = this.suites.find(suite => suite.description === 'global');
        if (!suite) {
            suite = new Suite('global', this.globalBeforeEach, this.globalAfterEach);
            this.suites.push(suite);
        }
        suite.addTest(description, body);
    }

}
