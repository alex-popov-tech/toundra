import { Action } from '../beans/action';
import { Hooks } from '../beans/hooks';
import { HookType } from '../beans/hookType';
import { Test } from '../beans/test';
import { RunOptions } from './runOptions';
import { WorkerQueue } from '../utils/workerQueue';


export class Run {
    private readonly options: RunOptions;
    private readonly tests: Test[] = [];
    private readonly beforeAll = new Hooks<'BeforeAll'>();
    private readonly afterAll = new Hooks<'AfterAll'>();
    currentSpecFile: string;

    constructor(options: RunOptions) {
        this.options = options;
    }

    async run() {
        await this.beforeAll.run();
        await new WorkerQueue(this.tests, this.options.threads).runAll();
        await this.afterAll.run();
    }

    addTest(description: string, action: Action) {
        this.tests.push(new Test(this.currentSpecFile, description, action));
    }

    addHook(type: HookType, action: Action) {
        if (type === 'BeforeAll') {
            this.beforeAll.add(action);
        } else {
            this.afterAll.add(action);
        }
    }

}
