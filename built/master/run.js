"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../util");
var nonGlobalSuite = util_1.Util.nonGlobalSuite;
var toBeforeRunSuiteInfo = util_1.Util.toBeforeRunSuiteInfo;
var toBeforeRunTestInfo = util_1.Util.toBeforeRunTestInfo;
class Run {
    constructor(data, threads) {
        this.data = data;
        this.threads = threads;
    }
    async run() {
        await this.runOnStartListeners();
        const beforeHooksError = await this.runGlobalBeforeAllHooks();
        if (beforeHooksError) {
            await this.runOnFinishListeners('failed', beforeHooksError, []);
            return;
        }
        const results = await this.runSuites();
        const afterHooksError = await this.runGlobalAfterAllHooks();
        if (afterHooksError) {
            await this.runOnFinishListeners('failed', afterHooksError, results);
            return;
        }
        await this.runOnFinishListeners('passed', null, results);
    }
    async runOnStartListeners() {
        const globalSuite = this.data.suites.find(util_1.Util.globalSuite);
        const globalTestsInfo = globalSuite ? globalSuite.data.tests.map(toBeforeRunTestInfo) : [];
        const suitesInfo = this.data.suites.filter(nonGlobalSuite).map(toBeforeRunSuiteInfo);
        for (const onStartHandler of this.data.onStartListener) {
            await onStartHandler({
                threads: this.threads,
                globalTests: globalTestsInfo,
                suites: suitesInfo
            });
        }
    }
    async runOnFinishListeners(status, error, suitesResuls) {
        const globalSuiteInfo = suitesResuls.find(util_1.Util.globalSuiteInfo);
        const globalTestsInfo = globalSuiteInfo ? globalSuiteInfo.tests : [];
        const usualSuites = suitesResuls.filter(util_1.Util.nonGlobalSuiteInfo);
        for (const onFinishHandler of this.data.onFinishListener) {
            await onFinishHandler({
                status: status,
                error: error,
                globalTests: globalTestsInfo,
                suites: usualSuites
            });
        }
    }
    async runSuites() {
        const results = [];
        for (const suite of this.data.suites) {
            const result = await suite.run(this.threads);
            results.push(result);
        }
        return results;
    }
    async runGlobalBeforeAllHooks() {
        return this.data.globalBeforeAll.run().then(_ => null, error => {
            return { name: error.name, stack: error.stack };
        });
    }
    async runGlobalAfterAllHooks() {
        return this.data.globalAfterAll.run().then(_ => null, error => {
            return { name: error.name, stack: error.stack };
        });
    }
}
exports.Run = Run;
//# sourceMappingURL=run.js.map