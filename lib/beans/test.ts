import { TestResult } from './testResult';

export class Test {
    readonly description: string;
    readonly body: () => void | Promise<void>;

    constructor(
        description: string,
        body: () => (void | Promise<void>)
    ) {
        this.description = description;
        this.body = body;
    }

    async run(): Promise<TestResult> {
        const result = await this.body();
        return {
            description: this.description,
            error: null
        };
    }
}
