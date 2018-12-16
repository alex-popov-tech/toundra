"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Configuration;
(function (Configuration) {
    // export const BIN_PATH = path.resolve('./built/bin/samael.js');
    // export const MASTER_EXECUTOR_PATH = path.resolve('./built/master/execute.js');
    // export const WORKER_EXECUTOR_PATH = path.resolve('./built/worker/execute.js');
    Configuration.BIN_PATH = './node_modules/samael/built/bin/samael.js';
    Configuration.MASTER_EXECUTOR_PATH = '../master/execute.js';
    Configuration.WORKER_EXECUTOR_PATH = '../worker/execute.js';
    Configuration.GLOBAL_SUITE_NAME = 'GLOBAL';
})(Configuration = exports.Configuration || (exports.Configuration = {}));
//# sourceMappingURL=configuration.js.map