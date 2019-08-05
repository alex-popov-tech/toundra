import { AfterRunTestInfo } from '../listener/afterRunTestInfo';
import { RunData } from './runData';
export declare class Run {
    static instance: Run;
    private readonly data;
    static initialize(data: RunData): Run;
    constructor(data: RunData);
    run(): Promise<AfterRunTestInfo>;
    private runTest;
    private buildAfterRunTestInfo;
    private runOnTestStartListeners;
    private runOnTestFinishListeners;
}
