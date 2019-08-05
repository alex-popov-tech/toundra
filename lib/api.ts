// @ts-ignore
import { isMainThread } from 'worker_threads';
import { Action } from './beans/action';
import { SyncAction } from './beans/syncAction';
import { Listener } from './listener/listener';
import { Collector as MasterCollector } from './master/collector/collector';
import { Collector as WorkerCollector } from './worker/collector';


export namespace Api {

    export function Suite(name: string, action: SyncAction) {
        if (isMainThread) {
            MasterCollector.instance.addSuite(name, action);
        } else {
            WorkerCollector.instance.addSuite(name, action);
        }
    }

    export function Test(name: string, action: Action) {
        if (isMainThread) {
            MasterCollector.instance.addTest(name);
        } else {
            WorkerCollector.instance.addTest(name, action);
        }
    }

    export function BeforeAll(hook: Action) {
        if (isMainThread) {
            MasterCollector.instance.addHook('BeforeAll', hook);
        }
    }

    export function AfterAll(hook: Action) {
        if (isMainThread) {
            MasterCollector.instance.addHook('AfterAll', hook);
        }
    }

    export function BeforeEach(hook: Action) {
        if (!isMainThread) {
            WorkerCollector.instance.addHook('BeforeEach', hook);
        }
    }

    export function AfterEach(hook: Action) {
        if (!isMainThread) {
            WorkerCollector.instance.addHook('AfterEach', hook);
        }
    }

    export function AddListener(listener: Listener) {
        if (isMainThread) {
            MasterCollector.instance.addListener(listener);
        } else {
            WorkerCollector.instance.addListener(listener);
        }
    }

}
