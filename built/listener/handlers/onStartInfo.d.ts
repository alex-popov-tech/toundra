import { BeforeRunSuiteInfo } from '../beforeRunSuiteInfo';
import { BeforeRunTestInfo } from '../beforeRunTestInfo';
export declare type OnStartInfo = {
    globalTests: BeforeRunTestInfo[];
    suites: BeforeRunSuiteInfo[];
};
