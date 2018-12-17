"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const consoleListener_1 = require("./listener/consoleListener");
var Configuration;
(function (Configuration) {
    const path = require('path');
    const fs = require('fs');
    // paths magic
    Configuration.BIN_PATH = fs.existsSync(path.resolve('./built/bin/samael.js'))
        ? path.resolve('./built/bin/samael.js')
        : './node_modules/samael/built/bin/samael.js';
    Configuration.MASTER_EXECUTOR_PATH = fs.existsSync(path.resolve('./built/master/execute.js'))
        ? path.resolve('./built/master/execute.js')
        : '../master/execute.js';
    Configuration.WORKER_EXECUTOR_PATH = fs.existsSync(path.resolve('./built/worker/execute.js'))
        ? path.resolve('./built/worker/execute.js')
        : '../worker/execute.js';
    Configuration.GLOBAL_SUITE_NAME = 'GLOBAL';
    Configuration.DEFAULT_LISTENER = consoleListener_1.CONSOLE_LISTENER;
})(Configuration = exports.Configuration || (exports.Configuration = {}));
//# sourceMappingURL=configuration.js.map