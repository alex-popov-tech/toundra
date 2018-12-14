export class Error {
    readonly name: string;
    readonly stack: string;
    constructor(error: any) {
        this.name = error.name;
        this.stack = error.stack;
    }
}

