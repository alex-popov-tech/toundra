import { AfterRunTestInfo } from './afterRunTestInfo';
import { Error } from './error';
import { SuiteStatus } from './suiteStatus';


export class AfterRunSuiteInfo {
    readonly name: string;
    readonly error: Error;
    readonly testsInfo: AfterRunTestInfo[];
    status: SuiteStatus;
    constructor(name: string, testsInfo: AfterRunTestInfo[], status: SuiteStatus, error: Error) {
        this.name = name;
        this.testsInfo = testsInfo;
        this.status = status;
        this.error = error;
    }
}
