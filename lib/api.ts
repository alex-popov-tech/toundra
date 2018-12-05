import { Runner } from './runner';

export namespace Api {

    export function Suite(description: string, body: () => void | Promise<void>) {
        Runner.instance.testRun.addSuite(description, body);
    }

    export function Test(description: string, body: () => void | Promise<void>) {
        Runner.instance.testRun.addTest(description, body);
    }

    export function BeforeAll(hook: () => void | Promise<void>) {
        Runner.instance.testRun.globalBeforeAll.add(hook);
    }

    export function AfterAll(hook: () => void | Promise<void>) {
        Runner.instance.testRun.globalAfterAll.add(hook);
    }

    export function BeforeEach(hook: () => void | Promise<void>) {
        Runner.instance.testRun.globalBeforeEach.add(hook);
    }

    export function AftereEach(hook: () => void | Promise<void>) {
        Runner.instance.testRun.globalAfterEach.add(hook);
    }

}
