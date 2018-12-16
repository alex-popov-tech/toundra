import { Hooks } from '../../beans/hooks';
import { OnSuiteFinishHandler } from '../../listener/handlers/onSuiteFinishHandler';
import { OnSuiteStartHandler } from '../../listener/handlers/onSuiteStartHandler';
import { RawTest } from './rawTest';
export declare type SuiteData = {
    readonly name: string;
    readonly tests: RawTest[];
    readonly beforeAll: Hooks<'BeforeAll'>;
    readonly afterAll: Hooks<'AfterAll'>;
    readonly onSuiteStartHandlers: OnSuiteStartHandler[];
    readonly onSuiteFinishHandlers: OnSuiteFinishHandler[];
};
