import { RunData } from './runData';
export declare class Run {
    private readonly threads;
    private readonly data;
    constructor(data: RunData, threads: number);
    run(): Promise<void>;
    private runOnStartListeners;
    private runOnFinishListeners;
    private runSuites;
    private runGlobalBeforeAllHooks;
    private runGlobalAfterAllHooks;
}
