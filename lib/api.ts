// @ts-ignore
import { isMainThread } from 'worker_threads';
import { Runner } from './master/runner';
import { SingleTestRunner } from './slave/singleTestRunner';

export namespace Api {

    export function Test(description: string, body: () => void | Promise<void>) {
        if (isMainThread) {
            Runner.instance.addTest(description, body);
        } else {
            SingleTestRunner.instance.addTest(description, body);
        }
    }

}
