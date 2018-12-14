import * as path from 'path';

export namespace Configuration {
    export const BIN_PATH = path.resolve('./built/bin/samael.js');
    export const MASTER_EXECUTOR_PATH = path.resolve('./built/master/execute.js');
    export const WORKER_EXECUTOR_PATH = path.resolve('./built/worker/execute.js');
    export const DEFAULT_SUITE_NAME = 'GLOBAL';
}
