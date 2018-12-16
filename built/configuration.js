"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const consoleListener_1 = require("./listener/consoleListener");
var Configuration;
(function (Configuration) {
    const path = require('path');
    Configuration.BIN_PATH = path.resolve('./built/bin/samael.js');
    Configuration.MASTER_EXECUTOR_PATH = path.resolve('./built/master/execute.js');
    Configuration.WORKER_EXECUTOR_PATH = path.resolve('./built/worker/execute.js');
    // export const BIN_PATH = './node_modules/samael/built/bin/samael.js';
    // export const MASTER_EXECUTOR_PATH = '../master/execute.js';
    // export const WORKER_EXECUTOR_PATH = '../worker/execute.js';
    Configuration.GLOBAL_SUITE_NAME = 'GLOBAL';
    Configuration.DEFAULT_LISTENER = consoleListener_1.CONSOLE_LISTENER;
})(Configuration = exports.Configuration || (exports.Configuration = {}));
//# sourceMappingURL=configuration.js.map