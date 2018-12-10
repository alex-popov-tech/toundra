import { Action } from '../../beans/action';
import { Hooks } from '../../beans/hooks';
import { HookType } from '../../beans/hookType';
import { WorkerQueue } from '../../utils/workerQueue';
import { Test } from './test';


export class Suite {

    static readonly DEFAULT_NAME = 'default';

    private readonly beforeAll = new Hooks<'BeforeAll'>();
    private readonly afterAll = new Hooks<'AfterAll'>();

    private readonly tests: Test[] = [];
    private readonly threads: number;
    readonly name: string;

    constructor(name: string, threads: number) {
        this.name = name;
        this.threads = threads;
    }

    async run() {
        await this.beforeAll.run();
        await new WorkerQueue(this.tests, this.threads).run();
        await this.afterAll.run();
    }

    addTest(name: string, action: Action, specFile: string) {
        this.tests.push(new Test(name, action, specFile));
    }

    addHook(type: HookType, action: Action) {
        if (type === 'BeforeAll') this.beforeAll.add(action);
        else if (type === 'AfterAll') this.afterAll.add(action);
    }

}
