import { ActionError } from '../actionError';

export type TestResult = {
    name: string,
    status: 'passed' | 'failed' | 'ignored',
    error?: ActionError
}
