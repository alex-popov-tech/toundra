import { ActionError } from '../../beans/actionError';

export type TestResult = {
    name: string,
    status: 'passed' | 'failed' | 'ignored',
    error?: ActionError
}
