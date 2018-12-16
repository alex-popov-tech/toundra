import { CONSOLE_LISTENER } from './listener/consoleListener';


export namespace Configuration {
    const path = require('path');
    export const BIN_PATH = path.resolve('./built/bin/samael.js');
    export const MASTER_EXECUTOR_PATH = path.resolve('./built/master/execute.js');
    export const WORKER_EXECUTOR_PATH = path.resolve('./built/worker/execute.js');
    // export const BIN_PATH = './node_modules/samael/built/bin/samael.js';
    // export const MASTER_EXECUTOR_PATH = '../master/execute.js';
    // export const WORKER_EXECUTOR_PATH = '../worker/execute.js';
    export const GLOBAL_SUITE_NAME = 'GLOBAL';
    export const DEFAULT_LISTENER = CONSOLE_LISTENER;
}
