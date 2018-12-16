import { Error } from './error';
import { TestStatus } from './testStatus';
export declare type AfterRunTestInfo = {
    readonly name: string;
    readonly error: Error;
    status: TestStatus;
};
