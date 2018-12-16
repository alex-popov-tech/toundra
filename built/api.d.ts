import { Action } from './beans/action';
import { SyncAction } from './beans/syncAction';
import { Listener } from './listener/listener';
export declare namespace Api {
    function Suite(name: string, action: SyncAction): void;
    function Test(name: string, action: Action): void;
    function BeforeAll(hook: () => void | Promise<void>): void;
    function AfterAll(hook: () => void | Promise<void>): void;
    function BeforeEach(hook: () => void | Promise<void>): void;
    function AfterEach(hook: () => void | Promise<void>): void;
    function AddListener(listener: Listener): void;
}
