import { ActionError } from '../actionError';
import { TestResult } from './testResult';

export type OnSuiteFinish = {
    name: string,
    error?: ActionError,
    testsToRun: TestResult[]
}
