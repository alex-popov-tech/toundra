"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Run {
    static initialize(data) {
        Run.instance = new Run(data);
        return Run.instance;
    }
    constructor(data) {
        this.data = data;
    }
    async run() {
        await this.runOnTestStartListeners();
        const result = await this.runTest();
        await this.runOnTestFinishListeners(result.status, result.error);
        return result;
    }
    async runTest() {
        let someError = null;
        const context = {};
        try {
            await this.data.globalBeforeEach.run(context);
            await this.data.beforeEach.run(context);
            await this.data.test.run(context);
            await this.data.afterEach.run(context);
            await this.data.globalAfterEach.run(context);
        }
        catch (error) {
            someError = {
                name: error.message,
                stack: error.stack
            };
        }
        return this.buildAfterRunTestInfo(someError ? 'failed' : 'passed', someError);
    }
    buildAfterRunTestInfo(status, error) {
        return {
            name: this.data.test.name,
            status: status,
            error: error
        };
    }
    async runOnTestStartListeners() {
        for (const onTestStartHandler of this.data.onTestStartListeners) {
            await onTestStartHandler({
                suiteName: this.data.suiteName,
                name: this.data.test.name
            });
        }
    }
    async runOnTestFinishListeners(status, error) {
        for (const onTestFinishHandler of this.data.onTestFinishListeners) {
            await onTestFinishHandler({
                suiteName: this.data.suiteName,
                name: this.data.test.name,
                status: status,
                error: error
            });
        }
    }
}
exports.Run = Run;
//# sourceMappingURL=run.js.map