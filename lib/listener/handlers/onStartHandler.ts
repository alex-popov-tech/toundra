import { OnStartInfo } from './onStartInfo';

export type OnStartHandler = (result: OnStartInfo) => void | Promise<void>;
