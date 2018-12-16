import { Configuration } from './configuration';
import { AfterRunSuiteInfo } from './listener/afterRunSuiteInfo';
import { BeforeRunSuiteInfo } from './listener/beforeRunSuiteInfo';
import { BeforeRunTestInfo } from './listener/beforeRunTestInfo';
import { RawTest } from './master/collector/rawTest';
import { Suite } from './master/collector/suite';

export namespace Util {
    export function toBeforeRunTestInfo(test: RawTest): BeforeRunTestInfo {
        return {
            name: test.name
        };
    }

    export function toBeforeRunSuiteInfo(suite: Suite): BeforeRunSuiteInfo {
        return {
            name: suite.data.name,
            tests: suite.data.tests.map(toBeforeRunTestInfo)
        };
    }

    export function globalSuiteInfo(suiteResult: AfterRunSuiteInfo): boolean {
        return suiteResult.name === Configuration.GLOBAL_SUITE_NAME;
    }

    export function nonGlobalSuiteInfo(suiteResult: AfterRunSuiteInfo): boolean {
        return !globalSuiteInfo(suiteResult);
    }

    export function globalSuite(suite: Suite): boolean {
        return suite.data.name === Configuration.GLOBAL_SUITE_NAME;
    }

    export function nonGlobalSuite(suite: Suite): boolean {
        return !globalSuite(suite);
    }
}