import { OnFinish } from './results/onFinish';
import { OnStart } from './results/onStart';
import { OnSuiteFinish } from './results/onSuiteFinish';
import { OnSuiteStart } from './results/onSuiteStart';
import { OnTestFinish } from './results/onTestFinish';
import { OnTestStart } from './results/onTestStart';

export type Listener = {
    onStart?: (result: OnStart) => void | Promise<void>,
    onSuiteStart?: (result: OnSuiteStart) => void | Promise<void>,
    onTestStart?: (result: OnTestStart) => void | Promise<void>,
    onTestFinish?: (result: OnTestFinish) => void | Promise<void>,
    onSuiteFinish?: (result: OnSuiteFinish) => void | Promise<void>,
    onFinish?: (result: OnFinish) => void | Promise<void>
};
