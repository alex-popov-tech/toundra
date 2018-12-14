import { Hooks } from '../../beans/hooks';
import { RawTest } from './rawTest';

export class RawSuite {
    readonly name: string;
    readonly tests: RawTest[] = [];
    readonly beforeAll = new Hooks<'BeforeAll'>();
    readonly beforeEach = new Hooks<'BeforeEach'>();
    readonly afterEach = new Hooks<'AfterEach'>();
    readonly afterAll = new Hooks<'AfterAll'>();

    constructor(name) {
        this.name = name;
    }
}