import { BeforeRunSuiteInfo } from '../beforeRunSuiteInfo';
import { BeforeRunTestInfo } from '../beforeRunTestInfo';

export type OnStartInfo = {
    globalTests: BeforeRunTestInfo[],
    suites: BeforeRunSuiteInfo[],
    threads: number
}
