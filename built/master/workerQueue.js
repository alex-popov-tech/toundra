"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const configuration_1 = require("../configuration");
const { Worker } = require('worker_threads');
class WorkerQueue {
    constructor(suiteName, tests, threads) {
        this.results = [];
        this.suiteName = suiteName;
        this.threads = threads;
        this.tests = tests;
    }
    async run() {
        await new Promise(resolve => {
            const tasksCount = this.tests.length;
            const queueLimit = (this.threads < tasksCount) ? this.threads : tasksCount;
            // start initial number of tests
            for (let i = 0; i < queueLimit; i++) {
                this.startTest(i, resolve);
            }
        });
        return this.results;
    }
    startTest(testIndex, queueCallback) {
        const testName = this.tests[testIndex].name;
        const specPath = this.tests[testIndex].specFilePath;
        this.startWorker(configuration_1.Configuration.BIN_PATH, {
            specPath: specPath,
            suiteName: this.suiteName,
            testName: testName
        }, (jsonResult) => {
            // safe after test result
            this.results.push(JSON.parse(jsonResult));
            // if last - return all results
            if (this.tests.length === this.results.length) {
                queueCallback(this.results);
            }
            // start new task after current if needed
            if (testIndex + this.threads < this.tests.length) {
                this.startTest(testIndex + this.threads, queueCallback);
            }
        });
    }
    startWorker(jsFilePath, workerData, callback) {
        const worker = new Worker(jsFilePath, { workerData: workerData });
        let wresult = null;
        worker.on('message', message => {
            wresult = message;
        });
        worker.on('exit', _ => callback(wresult));
    }
}
exports.WorkerQueue = WorkerQueue;
//# sourceMappingURL=workerQueue.js.map