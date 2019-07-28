import { Action } from '../beans/action';


export class Test {
    readonly name: string;
    readonly action: Action;

    constructor(name: string, action: Action) {
        this.name = name;
        this.action = action;
    }

    async run(context) {
        await this.action(context);
    }
}
