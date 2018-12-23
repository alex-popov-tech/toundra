"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Worker } = require('worker_threads');
var WorkerUtils;
(function (WorkerUtils) {
    async function asyncStartWorker(jsFilePath, workerData) {
        return new Promise(((resolve, reject) => {
            startWorker(jsFilePath, workerData, (error, result) => {
                if (error)
                    reject(error);
                resolve(result);
            });
        }));
    }
    WorkerUtils.asyncStartWorker = asyncStartWorker;
    function startWorker(jsFilePath, workerData, callback) {
        const worker = new Worker(jsFilePath, { workerData: workerData });
        let wresult = null;
        let werror = null;
        worker.on('message', message => {
            wresult = message;
        });
        worker.on('error', error => {
            werror = error;
        });
        worker.on('exit', _ => callback(werror, wresult));
    }
    WorkerUtils.startWorker = startWorker;
})(WorkerUtils = exports.WorkerUtils || (exports.WorkerUtils = {}));
//# sourceMappingURL=workerUtils.js.map