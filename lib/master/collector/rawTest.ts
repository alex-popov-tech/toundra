export class RawTest {
    readonly name: string;
    readonly specFilePath: string;

    constructor(name: string, specFilePath: string) {
        this.name = name;
        this.specFilePath = specFilePath;
    }

}
