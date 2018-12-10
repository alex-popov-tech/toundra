import { Action } from '../../beans/action';

export class Test {
    readonly name: string;
    readonly specFilePath: string;
    private readonly action: Action;

    constructor(
        name: string,
        action: Action,
        specFilePath: string
    ) {
        this.name = name;
        this.action = action;
        this.specFilePath = specFilePath;
    }

}
