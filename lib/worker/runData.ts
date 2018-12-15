import { Hooks } from '../beans/hooks';
import { OnTestFinishHandler } from '../listener/handlers/onTestFinishHandler';
import { OnTestStartHandler } from '../listener/handlers/onTestStartHandler';
import { Test } from './test';


export type RunData = {
    suiteName: string
    onTestStartListeners: OnTestStartHandler[]
    globalBeforeEach: Hooks<'BeforeEach'>
    beforeEach: Hooks<'BeforeEach'>
    test: Test
    afterEach: Hooks<'AfterEach'>
    globalAfterEach: Hooks<'AfterEach'>
    onTestFinishListeners: OnTestFinishHandler[]
}
