import { OnTestFinishInfo } from './onTestFinishInfo';

export type OnTestFinishHandler = (result: OnTestFinishInfo) => void | Promise<void>;
