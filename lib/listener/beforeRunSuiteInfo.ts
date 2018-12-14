import { BeforeRunTestInfo } from './beforeRunTestInfo';


export type BeforeRunSuiteInfo = {
    readonly name: string;
    readonly testsInfo: BeforeRunTestInfo[];
}
