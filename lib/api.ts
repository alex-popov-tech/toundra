// @ts-ignore
import { isMainThread } from 'worker_threads';
import { Runner as MasterRunner } from './master/runner';
import { Runner as WorkerRunner } from './worker/runner';

export namespace Api {

    export function Test(description: string, body: () => void | Promise<void>) {
        if (isMainThread) {
            MasterRunner.instance.addTest(description, body);
        } else {
            WorkerRunner.instance.addTest(description, body);
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
