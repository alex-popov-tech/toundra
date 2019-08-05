"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const configuration_1 = require("../../configuration");
const util_1 = require("../../util");
const workerQueue_1 = require("../workerQueue");
var toBeforeRunTestInfo = util_1.Util.toBeforeRunTestInfo;
class Suite {
    constructor(suiteData) {
        this.data = suiteData;
        this.isGlobal = suiteData.name === configuration_1.Configuration.GLOBAL_SUITE_NAME;
    }
    async run(context, threads) {
        await this.runOnSuiteStartListeners();
        const beforeHooksError = await this.runBeforeAllHooks(context);
        if (beforeHooksError) {
            await this.runOnSuiteFinishListeners('failed', beforeHooksError, null);
            return this.buildAfterRunSuiteInfo('failed', [], beforeHooksError);
        }
        const testResults = await this.runTests(threads);
        const afterHooksError = await this.runAfterAllHooks(context);
        if (afterHooksError) {
            await this.runOnSuiteFinishListeners('failed', beforeHooksError, testResults);
            return this.buildAfterRunSuiteInfo('failed', testResults, beforeHooksError);
        }
        await this.runOnSuiteFinishListeners('passed', null, testResults);
        return this.buildAfterRunSuiteInfo('passed', testResults, null);
    }
    async runBeforeAllHooks(context) {
        return this.data.beforeAll.run(context).then(_ => null, error => {
            return { name: error.name, stack: error.stack };
        });
    }
    async runAfterAllHooks(context) {
        return this.data.afterAll.run(context).then(_ => null, error => {
            return { name: error.name, stack: error.stack };
        });
    }
    async runTests(threads) {
        return new workerQueue_1.WorkerQueue(this.data.name, this.data.tests, threads).run();
    }
    async runOnSuiteStartListeners() {
        if (!this.isGlobal) {
            for (const onSuiteStartHandler of this.data.onSuiteStartHandlers) {
                await onSuiteStartHandler({
                    name: this.data.name,
                    tests: this.data.tests.map(toBeforeRunTestInfo)
                });
            }
        }
    }
    async runOnSuiteFinishListeners(status, error, testResults) {
        if (!this.isGlobal) {
            for (const onSuiteFinishHandler of this.data.onSuiteFinishHandlers) {
                await onSuiteFinishHandler({
                    name: this.data.name,
                    status: status,
                    error: error,
                    tests: testResults
                });
            }
        }
    }
    buildAfterRunSuiteInfo(status, testResults, error) {
        return {
            name: this.data.name,
            status: status,
            tests: testResults,
            error: error
        };
    }
}
exports.Suite = Suite;
//# sourceMappingURL=suite.js.map