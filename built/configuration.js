"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
var Configuration;
(function (Configuration) {
    Configuration.BIN_PATH = path.resolve('./built/bin/samael.js');
    Configuration.MASTER_EXECUTOR_PATH = path.resolve('./built/master/execute.js');
    Configuration.WORKER_EXECUTOR_PATH = path.resolve('./built/worker/execute.js');
    Configuration.GLOBAL_SUITE_NAME = 'GLOBAL';
})(Configuration = exports.Configuration || (exports.Configuration = {}));
//# sourceMappingURL=configuration.js.map