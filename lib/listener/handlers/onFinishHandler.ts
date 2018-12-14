import { OnFinishInfo } from './onFinishInfo';

type Handler = (result: OnFinishInfo) => void | Promise<void>;

export class OnFinishHandler {
    private readonly handler: Handler;

    constructor(handler: Handler) {
        this.handler = handler;
    }

    async run(info: OnFinishInfo) {
        try {
            await this.handler(info);
        } catch (ignored) {
        }
    }
}
