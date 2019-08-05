import { Action } from '../beans/action';
export declare class Test {
    readonly name: string;
    readonly action: Action;
    constructor(name: string, action: Action);
    run(context: any): Promise<void>;
}
