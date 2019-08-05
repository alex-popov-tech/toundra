import { Action } from './action';
import { HookType } from './hookType';
export declare class Hooks<T extends HookType> {
    private readonly actions;
    add(hook: Action): void;
    run(context: any): Promise<void>;
}
