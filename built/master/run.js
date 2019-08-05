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
        const suiteContext = {};
        const beforeHooksError = await this.runGlobalBeforeAllHooks(suiteContext);
        if (beforeHooksError) {
            await this.runOnFinishListeners('failed', beforeHooksError, []);
            return;
        }
        const results = await this.runSuites(suiteContext);
        const afterHooksError = await this.runGlobalAfterAllHooks(suiteContext);
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
            await Promise.resolve().then(_ => onStartHandler({
                threads: this.threads,
                globalTests: globalTestsInfo,
                suites: suitesInfo
            })).catch(console.error);
        }
    }
    async runOnFinishListeners(status, error, suitesResuls) {
        const globalSuiteInfo = suitesResuls.find(util_1.Util.globalSuiteInfo);
        const globalTestsInfo = globalSuiteInfo ? globalSuiteInfo.tests : [];
        const usualSuites = suitesResuls.filter(util_1.Util.nonGlobalSuiteInfo);
        for (const onFinishHandler of this.data.onFinishListener) {
            await Promise.resolve().then(_ => onFinishHandler({
                status: status,
                error: error,
                globalTests: globalTestsInfo,
                suites: usualSuites
            })).catch(console.error);
        }
    }
    async runSuites(context) {
        const results = [];
        for (const suite of this.data.suites) {
            const result = await suite.run(context, this.threads);
            results.push(result);
        }
        return results;
    }
    async runGlobalBeforeAllHooks(context) {
        return this.data.globalBeforeAll.run(context).then(_ => null, error => {
            return { name: error.name, stack: error.stack };
        });
    }
    async runGlobalAfterAllHooks(context) {
        return this.data.globalAfterAll.run(context).then(_ => null, error => {
            return { name: error.name, stack: error.stack };
        });
    }
}
exports.Run = Run;
//# sourceMappingURL=run.js.map