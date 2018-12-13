import { TestResult } from './testResult';

export type OnStart = {
    testsToRun: TestResult[],
    suitesToRun: {name: string, tests: TestResult[]}[]
}
