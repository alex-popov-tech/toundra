import { Action } from './action';
import { HookType } from './hookType';

export class Hooks<T extends HookType> {
    private readonly actions: Action[] = [];

    add(hook: Action) {
        this.actions.push(hook);
    }

    async run() {
        for (const action of this.actions) {
            await action();
        }
    }
}
