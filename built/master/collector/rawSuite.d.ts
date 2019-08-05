import { Hooks } from '../../beans/hooks';
import { RawTest } from './rawTest';
export declare class RawSuite {
    readonly name: string;
    readonly tests: RawTest[];
    readonly beforeAll: Hooks<"BeforeAll">;
    readonly beforeEach: Hooks<"BeforeEach">;
    readonly afterEach: Hooks<"AfterEach">;
    readonly afterAll: Hooks<"AfterAll">;
    constructor(name: any);
}
