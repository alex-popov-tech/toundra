import { ActionError } from '../../beans/actionError';
import { SuiteResult } from './suiteResult';

export type TestResult = {
    suiteResult: SuiteResult,
    name: string,
    status: 'passed' | 'failed' | 'ignored',
    error?: ActionError
}
