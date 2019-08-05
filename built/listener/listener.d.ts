import { OnFinishHandler } from './handlers/onFinishHandler';
import { OnStartHandler } from './handlers/onStartHandler';
import { OnSuiteFinishHandler } from './handlers/onSuiteFinishHandler';
import { OnSuiteStartHandler } from './handlers/onSuiteStartHandler';
import { OnTestFinishHandler } from './handlers/onTestFinishHandler';
import { OnTestStartHandler } from './handlers/onTestStartHandler';
export declare type Listener = {
    onStart?: OnStartHandler;
    onSuiteStart?: OnSuiteStartHandler;
    onTestStart?: OnTestStartHandler;
    onTestFinish?: OnTestFinishHandler;
    onSuiteFinish?: OnSuiteFinishHandler;
    onFinish?: OnFinishHandler;
};
