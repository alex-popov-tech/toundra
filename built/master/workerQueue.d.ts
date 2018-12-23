import { AfterRunTestInfo } from '../listener/afterRunTestInfo';
import { RawTest } from './collector/rawTest';
export declare class WorkerQueue {
    private readonly threads;
    private readonly suiteName;
    private readonly tests;
    private readonly results;
    constructor(suiteName: string, tests: RawTest[], threads: number);
    run(): Promise<AfterRunTestInfo[]>;
    private startTest;
    startWorker(jsFilePath: string, workerData: any, callback: (result: any) => any): void;
}
