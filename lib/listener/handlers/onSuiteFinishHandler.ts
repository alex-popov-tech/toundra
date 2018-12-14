import { OnSuiteFinishInfo } from './onSuiteFinishInfo';

export type OnSuiteFinishHandler = (result: OnSuiteFinishInfo) => void | Promise<void>;
