import { AfterRunSuiteInfo } from '../afterRunSuiteInfo';
import { AfterRunTestInfo } from '../afterRunTestInfo';
import { Error } from '../error';
import { RunStatus } from '../runStatus';
export declare type OnFinishInfo = {
    status: RunStatus;
    error: Error;
    globalTests: AfterRunTestInfo[];
    suites: AfterRunSuiteInfo[];
};
