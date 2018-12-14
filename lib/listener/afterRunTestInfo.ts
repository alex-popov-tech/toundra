import { Error } from './error';
import { TestStatus } from './testStatus';


export class AfterRunTestInfo {
    readonly name: string;
    readonly error: Error;
    status: TestStatus;
    constructor(name: string, status: TestStatus, error: Error) {
        this.name = name;
        this.status = status;
        this.error = error;
    }
}
