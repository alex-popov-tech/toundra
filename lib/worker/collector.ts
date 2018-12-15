import { Action } from '../beans/action';
import { Hooks } from '../beans/hooks';
import { HookType } from '../beans/hookType';
import { SyncAction } from '../beans/syncAction';
import { Configuration } from '../configuration';
import { Listener } from '../listener/listener';
import { RunData } from './runData';
import { Test } from './test';

export class Collector {
    static instance: Collector;

    private readonly specPath: string;
    private readonly suiteName: string;
    private readonly testName: string;

    private readonly globalBeforeEach = new Hooks<'BeforeEach'>();
    private readonly globalAfterEach = new Hooks<'AfterEach'>();
    private readonly beforeEach = new Hooks<'BeforeEach'>();
    private readonly afterEach = new Hooks<'AfterEach'>();
    private readonly listeners: Listener[] = [];
    private isExpectedSuiteContext = false;
    private isExpectedTestFound = false;
    private test: Test = null;

    static initialize(specPath: string, suiteName: string, testName: string): Collector {
        Collector.instance = new Collector(specPath, suiteName, testName);
        return Collector.instance;
    }

    private constructor(specPath: string, suiteName: string, testName: string) {
        this.specPath = specPath;
        this.suiteName = suiteName;
        this.testName = testName;
        this.isExpectedSuiteContext = suiteName === Configuration.GLOBAL_SUITE_NAME;
    }

    getData(): RunData {
        this.initTest();
        return {
            suiteName: this.suiteName,
            onTestStartListeners: this.listeners.filter(listener => listener.onTestStart).map(listener => listener.onTestStart),
            onTestFinishListeners: this.listeners.filter(listener => listener.onTestFinish).map(listener => listener.onTestFinish),
            globalBeforeEach: this.globalBeforeEach,
            globalAfterEach: this.globalAfterEach,
            beforeEach: this.beforeEach,
            afterEach: this.afterEach,
            test: this.test
        };
    }

    addSuite(name: string, action: SyncAction) {
        if (
            !this.isExpectedTestFound &&
            !this.isExpectedSuiteContext &&
            this.suiteName === this.suiteName
        ) {
            this.isExpectedSuiteContext = true;
            action();
            this.isExpectedSuiteContext = false;
        }
    }

    addTest(name: string, action: Action) {
        if (
            !this.isExpectedTestFound &&
            this.isExpectedSuiteContext &&
            this.testName === name
        ) {
            this.test = new Test(name, action);
            this.isExpectedTestFound = true;
        }
    }

    addHook(type: HookType, action: Action) {
        if (type === 'BeforeEach') {
            if (this.isExpectedSuiteContext) this.beforeEach.add(action);
            else this.globalBeforeEach.add(action);
        } else {
            if (this.isExpectedSuiteContext) this.afterEach.add(action);
            else this.globalAfterEach.add(action);
        }
    }

    addListener(listener: Listener) {
        if (listener.onTestStart) {
            this.listeners.push(listener);
        } else if (listener.onTestFinish) {
            this.listeners.push(listener);
        }
    }

    private initTest() {
        require(this.specPath);
    }
}
