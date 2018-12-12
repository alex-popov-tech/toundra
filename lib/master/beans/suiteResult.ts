import { ActionError } from '../../beans/actionError';
import { TestResult } from './testResult';

export type SuiteResult = {
    name: string,
    error?: ActionError,
    tests: TestResult[]
}
