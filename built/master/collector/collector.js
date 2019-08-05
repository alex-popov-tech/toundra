"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const hooks_1 = require("../../beans/hooks");
const configuration_1 = require("../../configuration");
const rawSuite_1 = require("./rawSuite");
const rawTest_1 = require("./rawTest");
const suite_1 = require("./suite");
class Collector {
    constructor(specsMasks) {
        this.rawSuites = [];
        this.globalSuite = new rawSuite_1.RawSuite(configuration_1.Configuration.GLOBAL_SUITE_NAME);
        this.globalBeforeAll = new hooks_1.Hooks();
        this.globalAfterAll = new hooks_1.Hooks();
        this.globalBeforeEach = new hooks_1.Hooks();
        this.globalAfterEach = new hooks_1.Hooks();
        this.listeners = [];
        this.specPaths = this.parseSpecsMask(specsMasks);
    }
    static initialize(specsMasks) {
        Collector.instance = new Collector(specsMasks);
        return Collector.instance;
    }
    getData() {
        this.initTestsTree();
        return {
            suites: this.rawSuites.map(rawSuite => new suite_1.Suite({
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
    initTestsTree() {
        for (const specFile of this.specPaths) {
            this.currentSpecFile = specFile;
            require(specFile);
        }
    }
    addSuite(name, action) {
        const suite = new rawSuite_1.RawSuite(name);
        this.rawSuites.push(suite);
        this.currentSuite = suite;
        action();
        this.currentSuite = null;
    }
    addTest(name) {
        if (this.isLocalSuite()) {
            this.addSuiteTest(name);
        }
        else {
            this.addGlobalTest(name);
        }
    }
    addHook(type, action) {
        if (type === 'BeforeAll') {
            if (this.isLocalSuite())
                this.currentSuite.beforeAll.add(action);
            else
                this.globalBeforeAll.add(action);
        }
        else if (type === 'AfterAll') {
            if (this.isLocalSuite())
                this.currentSuite.afterAll.add(action);
            else
                this.globalAfterAll.add(action);
        }
        else if (type === 'BeforeEach') {
            if (this.isLocalSuite())
                this.currentSuite.beforeEach.add(action);
            else
                this.globalBeforeEach.add(action);
        }
        else if (type === 'AfterEach') {
            if (this.isLocalSuite())
                this.currentSuite.afterEach.add(action);
            else
                this.globalAfterEach.add(action);
        }
    }
    addListener(listener) {
        this.listeners.push(listener);
    }
    parseSpecsMask(specsMasks) {
        return specsMasks.map(specpath => path.resolve(specpath));
    }
    isLocalSuite() {
        return !!this.currentSuite;
    }
    addSuiteTest(name) {
        this.currentSuite.tests.push(new rawTest_1.RawTest(name, this.currentSpecFile));
    }
    addGlobalTest(name) {
        const globalSuiteAdded = this.rawSuites.map(rawsuite => rawsuite.name).includes(this.globalSuite.name);
        if (!globalSuiteAdded) {
            this.rawSuites.push(this.globalSuite);
        }
        this.globalSuite.tests.push(new rawTest_1.RawTest(name, this.currentSpecFile));
    }
}
exports.Collector = Collector;
//# sourceMappingURL=collector.js.map