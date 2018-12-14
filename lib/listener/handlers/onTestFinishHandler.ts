import { OnTestFinishInfo } from './onTestFinishInfo';

type Handler = (result: OnTestFinishInfo) => void | Promise<void>;

export class OnTestFinishHandler {
    private readonly handler: Handler;

    constructor(handler: Handler) {
        this.handler = handler;
    }

    async run(info: OnTestFinishInfo) {
        try {
            await this.handler(info);
        } catch (ignored) {
        }
    }
}
