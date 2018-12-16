"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hooks_1 = require("../beans/hooks");
const configuration_1 = require("../configuration");
const test_1 = require("./test");
class Collector {
    constructor(specPath, suiteName, testName) {
        this.globalBeforeEach = new hooks_1.Hooks();
        this.globalAfterEach = new hooks_1.Hooks();
        this.beforeEach = new hooks_1.Hooks();
        this.afterEach = new hooks_1.Hooks();
        this.listeners = [];
        this.isExpectedSuiteContext = false;
        this.isExpectedTestFound = false;
        this.test = null;
        this.specPath = specPath;
        this.suiteName = suiteName;
        this.testName = testName;
        this.isExpectedSuiteContext = suiteName === configuration_1.Configuration.GLOBAL_SUITE_NAME;
    }
    static initialize(specPath, suiteName, testName) {
        Collector.instance = new Collector(specPath, suiteName, testName);
        return Collector.instance;
    }
    getData() {
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
    addSuite(name, action) {
        if (!this.isExpectedTestFound &&
            !this.isExpectedSuiteContext &&
            this.suiteName === this.suiteName) {
            this.isExpectedSuiteContext = true;
            action();
            this.isExpectedSuiteContext = false;
        }
    }
    addTest(name, action) {
        if (!this.isExpectedTestFound &&
            this.isExpectedSuiteContext &&
            this.testName === name) {
            this.test = new test_1.Test(name, action);
            this.isExpectedTestFound = true;
        }
    }
    addHook(type, action) {
        if (type === 'BeforeEach') {
            if (this.isExpectedSuiteContext)
                this.beforeEach.add(action);
            else
                this.globalBeforeEach.add(action);
        }
        else {
            if (this.isExpectedSuiteContext)
                this.afterEach.add(action);
            else
                this.globalAfterEach.add(action);
        }
    }
    addListener(listener) {
        if (listener.onTestStart) {
            this.listeners.push(listener);
        }
        else if (listener.onTestFinish) {
            this.listeners.push(listener);
        }
    }
    initTest() {
        require(this.specPath);
    }
}
exports.Collector = Collector;
//# sourceMappingURL=collector.js.map