import * as path from 'path';
import { Action } from '../../beans/action';
import { Hooks } from '../../beans/hooks';
import { HookType } from '../../beans/hookType';
import { SyncAction } from '../../beans/syncAction';
import { Configuration } from '../../configuration';
import { Listener } from '../../listener/listener';
import { RunData } from '../runData';
import { RawSuite } from './rawSuite';
import { RawTest } from './rawTest';
import { Suite } from './suite';


export class Collector {
    static instance: Collector;

    private readonly rawSuites: RawSuite[] = [];
    private readonly globalSuite: RawSuite = new RawSuite(Configuration.GLOBAL_SUITE_NAME);
    private readonly globalBeforeAll = new Hooks<'BeforeAll'>();
    private readonly globalAfterAll = new Hooks<'AfterAll'>();
    private readonly globalBeforeEach = new Hooks<'BeforeEach'>();
    private readonly globalAfterEach = new Hooks<'AfterEach'>();
    private readonly listeners: Listener[] = [];

    private readonly specPaths: string[];
    private currentSpecFile: string;
    private currentSuite: RawSuite;

    static initialize(specsMasks: string[]): Collector {
        Collector.instance = new Collector(specsMasks);
        return Collector.instance;
    }

    getData(): RunData {
        this.initTestsTree();
        return {
            suites: this.rawSuites.map(rawSuite => new Suite({
                name: rawSuite.name,
                tests: rawSuite.tests,
                beforeAll: rawSuite.beforeAll,
                afterAll: rawSuite.afterAll,
                onSuiteStartHandlers: this.listeners.filter(listener => listener.onSuiteStart).map(listener => listener.onSuiteStart),
                onSuiteFinishHandlers: this.listeners.filter(listener => listener.onSuiteFinish).map(listener => listener.onSuiteFinish)
            })),
            globalBeforeAll: this.globalBeforeAll,
            globalAfterAll: this.globalAfterAll,
            onStartListener: this.listeners.filter(listener => listener.onStart).map(listener => listener.onStart),
            onFinishListener: this.listeners.filter(listener => listener.onFinish).map(listener => listener.onFinish)
        };
    }

    private constructor(specsMasks: string[]) {
        this.specPaths = this.parseSpecsMask(specsMasks);
    }

    private initTestsTree() {
        for (const specFile of this.specPaths) {
            this.currentSpecFile = specFile;
            require(specFile);
        }
    }

    addSuite(name: string, action: SyncAction) {
        const suite = new RawSuite(name);
        this.rawSuites.push(suite);
        this.currentSuite = suite;
        action();
        this.currentSuite = null;
    }

    addTest(name: string) {
        if (this.isLocalSuite()) {
            this.addSuiteTest(name);
        } else {
            this.addGlobalTest(name);
        }
    }

    addHook(type: HookType, action: Action) {
        if (type === 'BeforeAll') {
            if (this.isLocalSuite()) this.currentSuite.beforeAll.add(action);
            else this.globalBeforeAll.add(action);
        } else if (type === 'AfterAll') {
            if (this.isLocalSuite()) this.currentSuite.afterAll.add(action);
            else this.globalAfterAll.add(action);
        } else if (type === 'BeforeEach') {
            if (this.isLocalSuite()) this.currentSuite.beforeEach.add(action);
            else this.globalBeforeEach.add(action);
        } else if (type === 'AfterEach') {
            if (this.isLocalSuite()) this.currentSuite.afterEach.add(action);
            else this.globalAfterEach.add(action);
        }
    }

    addListener(listener: Listener) {
        this.listeners.push(listener);
    }

    private parseSpecsMask(specsMasks: string[]) {
        // TODO complex parser for wildcards
        // complex parse spec files wildcard
        return specsMasks.map(specpath => path.resolve(specpath));
    }

    private isLocalSuite(): boolean {
        return !!this.currentSuite;
    }

    private addSuiteTest(name: string) {
        this.currentSuite.tests.push(new RawTest(name, this.currentSpecFile));
    }

    private addGlobalTest(name: string) {
        const globalSuiteAdded = this.rawSuites.map(rawsuite => rawsuite.name).includes(this.globalSuite.name);
        if (!globalSuiteAdded) {
            this.rawSuites.push(this.globalSuite);
        }
        this.globalSuite.tests.push(new RawTest(name, this.currentSpecFile));
    }
}
