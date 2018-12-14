import { OnStartInfo } from './onStartInfo';

type Handler = (result: OnStartInfo) => void | Promise<void>;

export class OnStartHandler {
    private readonly handler: Handler;

    constructor(handler: Handler) {
        this.handler = handler;
    }

    async run(info: OnStartInfo) {
        try {
            await this.handler(info);
        } catch (ignored) {
        }
    }
}
