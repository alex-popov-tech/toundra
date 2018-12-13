import { ActionError } from '../actionError';
import { TestStatus } from '../testStatus';
import { TestResult } from './testResult';

export type OnFinish = {
    status: TestStatus,
    error?: ActionError,
    testsToRun: TestResult[],
    suitesToRun: {name: string, tests: TestResult[]}[]
}
