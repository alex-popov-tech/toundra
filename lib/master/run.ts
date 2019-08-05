import { AfterRunSuiteInfo } from '../listener/afterRunSuiteInfo';
import { Error } from '../listener/error';
import { RunStatus } from '../listener/runStatus';
import { Util } from '../util';
import { RunData } from './runData';
import nonGlobalSuite = Util.nonGlobalSuite;
import toBeforeRunSuiteInfo = Util.toBeforeRunSuiteInfo;
import toBeforeRunTestInfo = Util.toBeforeRunTestInfo;


export class Run {

    private readonly threads: number;
    private readonly data: RunData;

    constructor(data: RunData, threads: number) {
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

        const results: AfterRunSuiteInfo[] = await this.runSuites(suiteContext);

        const afterHooksError = await this.runGlobalAfterAllHooks(suiteContext);
        if (afterHooksError) {
            await this.runOnFinishListeners('failed', afterHooksError, results);
            return;
        }

        await this.runOnFinishListeners('passed', null, results);
    }

    private async runOnStartListeners() {
        const globalSuite = this.data.suites.find(Util.globalSuite);
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

    private async runOnFinishListeners(status: RunStatus, error: Error, suitesResuls: AfterRunSuiteInfo[]) {
        const globalSuiteInfo = suitesResuls.find(Util.globalSuiteInfo);
        const globalTestsInfo = globalSuiteInfo ? globalSuiteInfo.tests : [];
        const usualSuites = suitesResuls.filter(Util.nonGlobalSuiteInfo);

        for (const onFinishHandler of this.data.onFinishListener) {
            await Promise.resolve().then(_ => onFinishHandler({
                status: status,
                error: error,
                globalTests: globalTestsInfo,
                suites: usualSuites
            })).catch(console.error);
        }
    }

    private async runSuites(context): Promise<AfterRunSuiteInfo[]> {
        const results: AfterRunSuiteInfo[] = [];
        for (const suite of this.data.suites) {
            const result = await suite.run(context, this.threads);
            results.push(result);
        }
        return results;
    }

    private async runGlobalBeforeAllHooks(context): Promise<Error> {
        return this.data.globalBeforeAll.run(context).then(
            _ => null,
            error => {
                return { name: error.name, stack: error.stack };
            }
        );
    }

    private async runGlobalAfterAllHooks(context): Promise<Error> {
        return this.data.globalAfterAll.run(context).then(
            _ => null,
            error => {
                return { name: error.name, stack: error.stack };
            }
        );
    }

}
