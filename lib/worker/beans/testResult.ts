import { ActionError } from '../../beans/actionError';
import { TestStatus } from '../../beans/testStatus';

export type TestResult = {
    name: string,
    status: TestStatus,
    error?: ActionError
}
