import { OnSuiteStartInfo } from './onSuiteStartInfo';

type Handler = (result: OnSuiteStartInfo) => void | Promise<void>;

export class OnSuiteStartHandler {
    private readonly handler: Handler;

    constructor(handler: Handler) {
        this.handler = handler;
    }

    async run(info: OnSuiteStartInfo) {
        try {
            await this.handler(info);
        } catch (ignored) {
        }
    }
}
