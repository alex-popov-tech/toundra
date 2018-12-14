import { Hooks } from '../beans/hooks';
import { OnFinishHandler } from '../listener/handlers/onFinishHandler';
import { OnStartHandler } from '../listener/handlers/onStartHandler';
import { Suite } from './collector/suite';


export type RunData = {
    readonly suites: Suite[]
    readonly globalBeforeAll: Hooks<'BeforeAll'>
    readonly globalAfterAll: Hooks<'AfterAll'>
    readonly onStartListener: OnStartHandler[];
    readonly onFinishListener: OnFinishHandler[];
}
