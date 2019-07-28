import { Configuration } from '../../configuration';
import { AfterRunSuiteInfo } from '../../listener/afterRunSuiteInfo';
import { AfterRunTestInfo } from '../../listener/afterRunTestInfo';
import { Error } from '../../listener/error';
import { SuiteStatus } from '../../listener/suiteStatus';
import { Util } from '../../util';
import { WorkerQueue } from '../workerQueue';
import { SuiteData } from './suiteData';
import toBeforeRunTestInfo = Util.toBeforeRunTestInfo;


export class Suite {

    readonly data: SuiteData;
    private readonly isGlobal: boolean;

    constructor(suiteData: SuiteData) {
        this.data = suiteData;
        this.isGlobal = suiteData.name === Configuration.GLOBAL_SUITE_NAME;
    }

    async run(context, threads: number): Promise<AfterRunSuiteInfo> {
        await this.runOnSuiteStartListeners();

        const beforeHooksError = await this.runBeforeAllHooks(context);
        if (beforeHooksError) {
            await this.runOnSuiteFinishListeners('failed', beforeHooksError, null);
            return this.buildAfterRunSuiteInfo('failed', [], beforeHooksError);
        }

        const testResults: AfterRunTestInfo[] = await this.runTests(threads);

        const afterHooksError = await this.runAfterAllHooks(context);
        if (afterHooksError) {
            await this.runOnSuiteFinishListeners('failed', beforeHooksError, testResults);
            return this.buildAfterRunSuiteInfo('failed', testResults, beforeHooksError);
        }

        await this.runOnSuiteFinishListeners('passed', null, testResults);
        return this.buildAfterRunSuiteInfo('passed', testResults, null);
    }

    private async runBeforeAllHooks(context): Promise<Error> {
        return this.data.beforeAll.run(context).then(
            _ => null,
            error => {
                return { name: error.name, stack: error.stack };
            }
        );
    }

    private async runAfterAllHooks(context): Promise<Error> {
        return this.data.afterAll.run(context).then(
            _ => null,
            error => {
                return { name: error.name, stack: error.stack };
            }
        );
    }

    private async runTests(threads: number): Promise<AfterRunTestInfo[]> {
        return new WorkerQueue(this.data.name, this.data.tests, threads).run();
    }

    private async runOnSuiteStartListeners() {
        if (!this.isGlobal) {
            for (const onSuiteStartHandler of this.data.onSuiteStartHandlers) {
                await onSuiteStartHandler({
                    name: this.data.name,
                    tests: this.data.tests.map(toBeforeRunTestInfo)
                });
            }
        }
    }

    private async runOnSuiteFinishListeners(status: SuiteStatus, error: Error, testResults: AfterRunTestInfo[]) {
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

    private buildAfterRunSuiteInfo(status: SuiteStatus, testResults: AfterRunTestInfo[], error: Error): AfterRunSuiteInfo {
        return {
            name: this.data.name,
            status: status,
            tests: testResults,
            error: error
        };
    }

}
