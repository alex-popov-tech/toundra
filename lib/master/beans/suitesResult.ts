import { ActionError } from '../../beans/actionError';
import { SuiteResult } from './suiteResult';

export type SuitesResult = {
    error?: ActionError,
    suites: SuiteResult[]
}
