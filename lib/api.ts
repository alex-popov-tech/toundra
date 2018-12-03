import { Runner } from './runner';

export namespace Api {

    type AsyncFunc = () => Promise<void | any>;

    export function BeforeAll(hook: AsyncFunc) {
        // TBD
    }

    export function AfterAll(hook: AsyncFunc) {
        // TBD
    }

    export function BeforeEach(hook: AsyncFunc) {
        // TBD
    }

    export function AftereEach(hook: AsyncFunc) {
        // TBD
    }

    export function Test(description: string, body: AsyncFunc) {
        // should work without suite, f.e. put all tests without suite in default suite and
        // apply global before and after hooks
        const runner = Runner.getInstance();
        runner.addTest({description: description, body: body});
    }

    export function ParametrizedTest(testdata: { description: string, body: AsyncFunc }[]) {
        testdata.forEach(data => Test(data.description, data.body));
    }

    export function Suite(description: string, body: AsyncFunc) {
        // TBD
    }

}
