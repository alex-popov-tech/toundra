// @ts-ignore
import { isMainThread } from 'worker_threads';
import { Action } from './beans/action';
import { SyncAction } from './beans/syncAction';
import { Runner as MasterRunner } from './master/runner';
import { Runner as WorkerRunner } from './worker/runner';

export namespace Api {

    export function Suite(name: string, action: SyncAction) {
        if (isMainThread) {
            MasterRunner.instance.addSuite(name, action);
        } else {
            WorkerRunner.instance.addSuite(name, action);
        }
    }

    export function Test(name: string, action: Action) {
        if (isMainThread) {
            MasterRunner.instance.addTest(name, action);
        } else {
            WorkerRunner.instance.addTest(name, action);
        }
    }

    export function BeforeAll(hook: () => void | Promise<void>) {
        if (isMainThread) {
            MasterRunner.instance.addHook('BeforeAll', hook);
        }
    }

    export function AfterAll(hook: () => void | Promise<void>) {
        if (isMainThread) {
            MasterRunner.instance.addHook('AfterAll', hook);
        }
    }

    export function BeforeEach(hook: () => void | Promise<void>) {
        if (!isMainThread) {
            WorkerRunner.instance.addHook('BeforeEach', hook);
        }
    }

    export function AfterEach(hook: () => void | Promise<void>) {
        if (!isMainThread) {
            WorkerRunner.instance.addHook('AfterEach', hook);
        }
    }

}
