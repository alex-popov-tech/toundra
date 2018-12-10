import { Action } from '../beans/action';


export class Test {
    private readonly name: string;
    private readonly action: Action;

    constructor(name: string, action: Action) {
        this.name = name;
        this.action = action;
    }

    async run() {
        await this.action();
    }
}
