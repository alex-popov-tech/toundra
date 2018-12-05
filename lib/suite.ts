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

    async start() {
        await this.localBeforeAll.run();
        for (const test of this.tests) {
            await test.start();
        }
        await this.localAfterAll.run();
    }

    addTest(description: string, body: () => void | Promise<void>) {
        const test = new Test(description, body, this.globalBeforeEach, this.localBeforeEach, this.localAfterEach, this.globalAfterEach);
        this.tests.push(test);
    }
}
