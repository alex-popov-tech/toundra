import { Action } from '../beans/action';
import { HookType } from '../beans/hookType';
import { SyncAction } from '../beans/syncAction';
import { Listener } from '../listener/listener';
import { RunData } from './runData';
export declare class Collector {
    static instance: Collector;
    private readonly specPath;
    private readonly suiteName;
    private readonly testName;
    private readonly globalBeforeEach;
    private readonly globalAfterEach;
    private readonly beforeEach;
    private readonly afterEach;
    private readonly listeners;
    private isExpectedSuiteContext;
    private isExpectedTestFound;
    private test;
    static initialize(specPath: string, suiteName: string, testName: string): Collector;
    private constructor();
    getData(): RunData;
    addSuite(name: string, action: SyncAction): void;
    addTest(name: string, action: Action): void;
    addHook(type: HookType, action: Action): void;
    addListener(listener: Listener): void;
    private initTest;
}
