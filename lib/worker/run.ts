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
        try {
            await this.data.globalBeforeEach.run();
            await this.data.beforeEach.run();
            await this.data.test.run();
            await this.data.afterEach.run();
            await this.data.globalAfterEach.run();
        } catch (error) {
            someError = {
                name: error.message,
                stack: error.stack
            };
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
