import { AfterRunTestInfo } from './afterRunTestInfo';
import { Error } from './error';
import { SuiteStatus } from './suiteStatus';


export type AfterRunSuiteInfo = {
    readonly name: string;
    readonly error: Error;
    readonly testsInfo: AfterRunTestInfo[];
    status: SuiteStatus;
}
