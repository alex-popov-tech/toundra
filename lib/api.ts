import { Runner } from './runner';

export namespace Api {

    export function Suite(description: string, body: () => void | Promise<void>) {
        Runner.instance.testRun.addSuite(description, body);
    }

    export function Test(description: string, body: () => void | Promise<void>) {
        Runner.instance.testRun.addTest(description, body);
    }

    export function BeforeAll(hook: () => void | Promise<void>) {
        Runner.instance.testRun.addHook('BeforeAll', hook);
    }

    export function AfterAll(hook: () => void | Promise<void>) {
        Runner.instance.testRun.addHook('AfterAll', hook);
    }

    export function BeforeEach(hook: () => void | Promise<void>) {
        Runner.instance.testRun.addHook('BeforeEach', hook);
    }

    export function AfterEach(hook: () => void | Promise<void>) {
        Runner.instance.testRun.addHook('AfterEach', hook);
    }

}
