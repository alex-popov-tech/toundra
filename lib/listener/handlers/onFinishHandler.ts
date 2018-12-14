import { OnFinishInfo } from './onFinishInfo';

export type OnFinishHandler = (result: OnFinishInfo) => void | Promise<void>
