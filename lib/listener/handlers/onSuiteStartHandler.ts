import { OnSuiteStartInfo } from './onSuiteStartInfo';

export type OnSuiteStartHandler = (result: OnSuiteStartInfo) => void | Promise<void>;
