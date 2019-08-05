"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const configuration_1 = require("./configuration");
var Util;
(function (Util) {
    function toBeforeRunTestInfo(test) {
        return {
            name: test.name
        };
    }
    Util.toBeforeRunTestInfo = toBeforeRunTestInfo;
    function toBeforeRunSuiteInfo(suite) {
        return {
            name: suite.data.name,
            tests: suite.data.tests.map(toBeforeRunTestInfo)
        };
    }
    Util.toBeforeRunSuiteInfo = toBeforeRunSuiteInfo;
    function globalSuiteInfo(suiteResult) {
        return suiteResult.name === configuration_1.Configuration.GLOBAL_SUITE_NAME;
    }
    Util.globalSuiteInfo = globalSuiteInfo;
    function nonGlobalSuiteInfo(suiteResult) {
        return !globalSuiteInfo(suiteResult);
    }
    Util.nonGlobalSuiteInfo = nonGlobalSuiteInfo;
    function globalSuite(suite) {
        return suite.data.name === configuration_1.Configuration.GLOBAL_SUITE_NAME;
    }
    Util.globalSuite = globalSuite;
    function nonGlobalSuite(suite) {
        return !globalSuite(suite);
    }
    Util.nonGlobalSuite = nonGlobalSuite;
})(Util = exports.Util || (exports.Util = {}));
//# sourceMappingURL=util.js.map