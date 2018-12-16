import { OnTestStartInfo } from './onTestStartInfo';

export type OnTestStartHandler = (result: OnTestStartInfo) => void | Promise<void>;
