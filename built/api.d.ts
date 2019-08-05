import { Action } from './beans/action';
import { SyncAction } from './beans/syncAction';
import { Listener } from './listener/listener';
export declare namespace Api {
    function Suite(name: string, action: SyncAction): void;
    function Test(name: string, action: Action): void;
    function BeforeAll(hook: Action): void;
    function AfterAll(hook: Action): void;
    function BeforeEach(hook: Action): void;
    function AfterEach(hook: Action): void;
    function AddListener(listener: Listener): void;
}
