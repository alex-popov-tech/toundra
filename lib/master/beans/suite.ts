import { Action } from '../../beans/action';
import { Hooks } from '../../beans/hooks';
import { HookType } from '../../beans/hookType';
import { WorkerQueue } from '../workerQueue';
import { SuiteResult } from './suiteResult';
import { Test } from './test';


export class Suite {

    private readonly beforeAll = new Hooks<'BeforeAll'>();
    private readonly afterAll = new Hooks<'AfterAll'>();

    private readonly result: SuiteResult;
    private readonly tests: Test[] = [];
    private readonly threads: number;
    readonly name: string;

    constructor(name: string, threads: number) {
        this.name = name;
        this.threads = threads;
        this.result = {
            name: name,
            error: null,
            tests: []
        };
    }

    async run(): Promise<SuiteResult> {
        try {
            await this.beforeAll.run();
        } catch (error) {
            this.result.error = {
                message: error.message,
                stack: error.stack
            };
            return this.result;
        }

        const testResults = await new WorkerQueue(this, this.tests, this.threads).run()
            .then(rawTestResults => rawTestResults.map(testResult => {
                testResult.suiteResult = this.result;
                return testResult;
            }));
        this.result.tests.push(...testResults);

        try {
            await this.afterAll.run();
        } catch (error) {
            this.result.error = {
                message: error.message,
                stack: error.stack
            };
            this.result.tests.forEach(test => test.status = 'ignored')
        }

        return this.result;
    }

    addTest(name: string, action: Action, specFile: string) {
        this.tests.push(new Test(name, action, specFile));
    }

    addHook(type: HookType, action: Action) {
        if (type === 'BeforeAll') this.beforeAll.add(action);
        else if (type === 'AfterAll') this.afterAll.add(action);
    }

}
