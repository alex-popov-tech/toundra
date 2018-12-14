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
            testsInfo: suite.data.tests.map(toBeforeRunTestInfo)
        };
    }

    export function globalSuiteInfo(suite: AfterRunSuiteInfo): boolean {
        return suite.name === Configuration.GLOBAL_SUITE_NAME;
    }

    export function nonGlobalSuite(suite: Suite): boolean {
        return suite.data.name !== Configuration.GLOBAL_SUITE_NAME;
    }
}