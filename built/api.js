"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const worker_threads_1 = require("worker_threads");
const collector_1 = require("./master/collector/collector");
const collector_2 = require("./worker/collector");
var Api;
(function (Api) {
    function Suite(name, action) {
        if (worker_threads_1.isMainThread) {
            collector_1.Collector.instance.addSuite(name, action);
        }
        else {
            collector_2.Collector.instance.addSuite(name, action);
        }
    }
    Api.Suite = Suite;
    function Test(name, action) {
        if (worker_threads_1.isMainThread) {
            collector_1.Collector.instance.addTest(name);
        }
        else {
            collector_2.Collector.instance.addTest(name, action);
        }
    }
    Api.Test = Test;
    function BeforeAll(hook) {
        if (worker_threads_1.isMainThread) {
            collector_1.Collector.instance.addHook('BeforeAll', hook);
        }
    }
    Api.BeforeAll = BeforeAll;
    function AfterAll(hook) {
        if (worker_threads_1.isMainThread) {
            collector_1.Collector.instance.addHook('AfterAll', hook);
        }
    }
    Api.AfterAll = AfterAll;
    function BeforeEach(hook) {
        if (!worker_threads_1.isMainThread) {
            collector_2.Collector.instance.addHook('BeforeEach', hook);
        }
    }
    Api.BeforeEach = BeforeEach;
    function AfterEach(hook) {
        if (!worker_threads_1.isMainThread) {
            collector_2.Collector.instance.addHook('AfterEach', hook);
        }
    }
    Api.AfterEach = AfterEach;
    function AddListener(listener) {
        if (worker_threads_1.isMainThread) {
            collector_1.Collector.instance.addListener(listener);
        }
        else {
            collector_2.Collector.instance.addListener(listener);
        }
    }
    Api.AddListener = AddListener;
})(Api = exports.Api || (exports.Api = {}));
//# sourceMappingURL=api.js.map