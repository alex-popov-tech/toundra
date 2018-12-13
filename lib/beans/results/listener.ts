import { OnFinish } from './onFinish';
import { OnStart } from './onStart';
import { OnSuiteFinish } from './onSuiteFinish';
import { OnSuiteStart } from './onSuiteStart';
import { OnTestFinish } from './onTestFinish';
import { OnTestStart } from './onTestStart';


export type Listener = {
    onStart?: (result: OnStart) => void | Promise<void>,
    onSuiteStart?: (result: OnSuiteStart) => void | Promise<void>,
    onTestStart?: (result: OnTestStart) => void | Promise<void>,
    onTestFinish?: (result: OnTestFinish) => void | Promise<void>,
    onSuiteFinish?: (result: OnSuiteFinish) => void | Promise<void>,
    onFinish?: (result: OnFinish) => void | Promise<void>
}
