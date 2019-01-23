import { CONSOLE_LISTENER } from './listener/consoleListener';


export namespace Configuration {
    const path = require('path');
    const fs = require('fs');

    // paths magic
    export const BIN_PATH = fs.existsSync(path.resolve('./built/bin/toundra.js'))
        ? path.resolve('./built/bin/toundra.js')
        : './node_modules/toundra/built/bin/toundra.js';

    export const MASTER_EXECUTOR_PATH = fs.existsSync(path.resolve('./built/master/execute.js'))
        ? path.resolve('./built/master/execute.js')
        : '../master/execute.js';

    export const WORKER_EXECUTOR_PATH = fs.existsSync(path.resolve('./built/worker/execute.js'))
        ? path.resolve('./built/worker/execute.js')
        : '../worker/execute.js';

    export const GLOBAL_SUITE_NAME = 'GLOBAL';
    export const DEFAULT_LISTENER = CONSOLE_LISTENER;
}
