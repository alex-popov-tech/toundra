import { BeforeRunTestInfo } from './beforeRunTestInfo';
export declare type BeforeRunSuiteInfo = {
    readonly name: string;
    readonly tests: BeforeRunTestInfo[];
};
