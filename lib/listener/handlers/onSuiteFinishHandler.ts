import { OnSuiteFinishInfo } from './onSuiteFinishInfo';

type Handler = (result: OnSuiteFinishInfo) => void | Promise<void>;

export class OnSuiteFinishHandler {
    private readonly handler: Handler;

    constructor(handler: Handler) {
        this.handler = handler;
    }

    async run(info: OnSuiteFinishInfo) {
        try {
            await this.handler(info);
        } catch (ignored) {
        }
    }
}
