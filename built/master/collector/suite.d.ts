import { AfterRunSuiteInfo } from '../../listener/afterRunSuiteInfo';
import { SuiteData } from './suiteData';
export declare class Suite {
    readonly data: SuiteData;
    private readonly isGlobal;
    constructor(suiteData: SuiteData);
    run(threads: number): Promise<AfterRunSuiteInfo>;
    private runBeforeAllHooks;
    private runAfterAllHooks;
    private runTests;
    private runOnSuiteStartListeners;
    private runOnSuiteFinishListeners;
    private buildAfterRunSuiteInfo;
}
