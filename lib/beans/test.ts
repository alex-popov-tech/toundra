import { Action } from './action';
import { TestResult } from './testResult';

export class Test {
    static DEFAULT = new Test(
        'default test dummy',
        () => {
            throw new Error('Default test dummy was not overriden');
        });
    readonly description: string;
    readonly action: Action;

    constructor(
        description: string,
        action: Action
    ) {
        this.description = description;
        this.action = action;
    }

    async run(): Promise<TestResult> {
        const result = await this.action();
        return {
            description: this.description,
            error: null
        };
    }
}
