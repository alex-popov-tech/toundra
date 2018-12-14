import { Error } from './error';
import { TestStatus } from './testStatus';


export type AfterRunTestInfo = {
    readonly name: string;
    readonly error: Error;
    status: TestStatus;
}
