import { ActionError } from '../actionError';
import { TestStatus } from '../testStatus';

export type OnTestFinish = {
    name: string,
    suiteName: string,
    status: TestStatus,
    error?: ActionError
}
