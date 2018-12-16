#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const worker_threads_1 = require("worker_threads");
const configuration_1 = require("../configuration");
require(worker_threads_1.isMainThread ? configuration_1.Configuration.MASTER_EXECUTOR_PATH : configuration_1.Configuration.WORKER_EXECUTOR_PATH);
//# sourceMappingURL=samael.js.map