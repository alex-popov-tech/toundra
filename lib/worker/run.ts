import { AfterRunTestInfo } from '../listener/afterRunTestInfo';
import { Error } from '../listener/error';
import { TestStatus } from '../listener/testStatus';
import { RunData } from './runData';


export class Run {

    static instance: Run;
    private readonly data: RunData;

    static initialize(data: RunData): Run {
        Run.instance = new Run(data);
        return Run.instance;
    }

    constructor(data: RunData) {
        this.data = data;
    }

    async run() {
        await this.runOnTestStartListeners();

        const result = await this.runTest();

        await this.runOnTestFinishListeners(result.status, result.error);

        return result;
    }

    private async runTest(): Promise<AfterRunTestInfo> {
        let someError: Error = null;
        const context = {};
        try {
            await this.data.globalBeforeEach.run(context);
            await this.data.beforeEach.run(context);
        } catch (error) {
            return this.buildAfterRunTestInfo('failed', error);
        }

        await this.data.test.run(context).catch(error => { someError = error });

        try {
            await this.data.afterEach.run(context);
            await this.data.globalAfterEach.run(context);
        } catch (error) {
            return this.buildAfterRunTestInfo('failed', someError ? someError : error);
        }

        return this.buildAfterRunTestInfo(someError ? 'failed' : 'passed', someError);
    }

    private buildAfterRunTestInfo(status: TestStatus, error: Error): AfterRunTestInfo {
        return {
            name: this.data.test.name,
            status: status,
            error: error
        };
    }

    private async runOnTestStartListeners() {
        for (const onTestStartHandler of this.data.onTestStartListeners) {
            await onTestStartHandler({
                suiteName: this.data.suiteName,
                name: this.data.test.name
            });
        }
    }

    private async runOnTestFinishListeners(status: TestStatus, error: Error) {
        for (const onTestFinishHandler of this.data.onTestFinishListeners) {
            await onTestFinishHandler({
                suiteName: this.data.suiteName,
                name: this.data.test.name,
                status: status,
                error: error
            });
        }
    }

    private;

}
