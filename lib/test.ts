import { Hooks } from './hooks';

export class Test {
    readonly globalBeforeEach = new Hooks();
    readonly globalAfterEach = new Hooks();
    readonly BeforeEach = new Hooks();
    readonly AfterEach = new Hooks();

    private readonly description: string;
    private readonly body: () => void | Promise<void>;

    constructor(
        description: string,
        body: () => (void | Promise<void>),
        globalBeforeEach: Hooks,
        globalAfterEach: Hooks,
        localBeforeEach: Hooks,
        localAfterEach: Hooks
    ) {
        this.description = description;
        this.body = body;
        this.globalBeforeEach = globalBeforeEach;
        this.globalAfterEach = globalAfterEach;
        this.BeforeEach = localBeforeEach;
        this.AfterEach = localAfterEach;
    }

    async start() {
        await this.globalBeforeEach.run();
        await this.BeforeEach.run();
        await this.body();
        await this.AfterEach.run();
        await this.globalAfterEach.run();
    }
}
