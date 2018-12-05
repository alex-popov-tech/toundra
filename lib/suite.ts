import { AsyncTaskQueue } from './asyncTestQueue';
import { Hooks } from './hooks';
import { Test } from './test';


export class Suite {
    readonly globalBeforeEach = new Hooks();
    readonly globalAfterEach = new Hooks();

    readonly localBeforeAll = new Hooks();
    readonly localAfterAll = new Hooks();
    readonly localBeforeEach = new Hooks();
    readonly localAfterEach = new Hooks();

    private readonly tests: Test[] = [];
    readonly description: string;

    constructor(description: string, globalBeforeEach: Hooks, globalAfterEach: Hooks) {
        this.description = description;
        this.globalBeforeEach = globalBeforeEach;
        this.globalAfterEach = globalAfterEach;
    }

    async start(threads = 1) {
        console.log(`suite ${this.description.toUpperCase()} started, threads ${threads}`)
        await this.localBeforeAll.run();
        const asyncTestRunner = new AsyncTaskQueue<Test>(this.tests, (test) => test.start(), threads);
        const results = await asyncTestRunner.runAll();
        // for (const test of this.tests) {
        //     await test.start();
        // }
        await this.localAfterAll.run();
    }

    addTest(description: string, body: () => void | Promise<void>) {
        const test = new Test(description, body, this.globalBeforeEach, this.localBeforeEach, this.localAfterEach, this.globalAfterEach);
        this.tests.push(test);
    }
}
