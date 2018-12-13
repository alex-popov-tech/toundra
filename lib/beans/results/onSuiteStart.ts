import { TestResult } from './testResult';

export type OnSuiteStart = {
    name: string,
    testsToRun: TestResult[]
}
