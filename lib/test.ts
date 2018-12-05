import { Hooks } from './hooks';

export class Test {
    readonly globalBeforeEach = new Hooks();
    readonly globalAfterEach = new Hooks();
    readonly localBeforeEach = new Hooks();
    readonly localAfterEach = new Hooks();

    private readonly description: string;
    private readonly body: () => void | Promise<void>;

    constructor(
        description: string,
        body: () => (void | Promise<void>),
        globalBeforeEach: Hooks,
        localBeforeEach: Hooks,
        localAfterEach: Hooks,
        globalAfterEach: Hooks
    ) {
        this.description = description;
        this.body = body;
        this.globalBeforeEach = globalBeforeEach;
        this.localBeforeEach = localBeforeEach;
        this.localAfterEach = localAfterEach;
        this.globalAfterEach = globalAfterEach;
    }

    async start() {
        console.log(`test ${this.description.toUpperCase()} started`)
        await this.globalBeforeEach.run();
        await this.localBeforeEach.run();
        await this.body();
        await this.localAfterEach.run();
        await this.globalAfterEach.run();
        console.log(`test ${this.description.toUpperCase()} finished`)
    }
}
