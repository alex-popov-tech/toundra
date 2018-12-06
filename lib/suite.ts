import { AsyncTaskQueue } from './asyncTestQueue';
import { HookName } from './hookName';
import { Hooks } from './hooks';
import { Test } from './test';


export class Suite {
    private readonly globalBeforeEach = new Hooks();
    private readonly globalAfterEach = new Hooks();
    private readonly BeforeAll = new Hooks();
    private readonly AfterAll = new Hooks();
    private readonly BeforeEach = new Hooks();
    private readonly AfterEach = new Hooks();

    private readonly tests: Test[] = [];
    readonly description: string;

    constructor(description: string, globalBeforeEach: Hooks, globalAfterEach: Hooks) {
        this.description = description;
        this.globalBeforeEach = globalBeforeEach;
        this.globalAfterEach = globalAfterEach;
    }

    async start(threads = 1) {
        await this.BeforeAll.run();
        const asyncTestRunner = new AsyncTaskQueue<Test>(this.tests, (test) => test.start(), threads);
        const results = await asyncTestRunner.runAll();
        await this.AfterAll.run();
    }

    addTest(description: string, body: () => void | Promise<void>) {
        const test = new Test(description, body, this.globalBeforeEach, this.globalAfterEach, this.BeforeEach, this.AfterEach);
        this.tests.push(test);
    }

    addHook(name: HookName, body: () => (void | Promise<void>)) {
        this[name].add(body);
    }
}
