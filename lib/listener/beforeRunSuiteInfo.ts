import { BeforeRunTestInfo } from './beforeRunTestInfo';


export class BeforeRunSuiteInfo {
    readonly name: string;
    readonly testsInfo: BeforeRunTestInfo[];
    constructor(name: string, testsInfo: BeforeRunTestInfo[]) {
        this.name = name;
        this.testsInfo = testsInfo;
    }
}
