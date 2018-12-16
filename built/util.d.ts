import { AfterRunSuiteInfo } from './listener/afterRunSuiteInfo';
import { BeforeRunSuiteInfo } from './listener/beforeRunSuiteInfo';
import { BeforeRunTestInfo } from './listener/beforeRunTestInfo';
import { RawTest } from './master/collector/rawTest';
import { Suite } from './master/collector/suite';
export declare namespace Util {
    function toBeforeRunTestInfo(test: RawTest): BeforeRunTestInfo;
    function toBeforeRunSuiteInfo(suite: Suite): BeforeRunSuiteInfo;
    function globalSuiteInfo(suiteResult: AfterRunSuiteInfo): boolean;
    function globalSuite(suite: Suite): boolean;
    function nonGlobalSuite(suite: Suite): boolean;
}
