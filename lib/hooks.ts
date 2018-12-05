export class Hooks {
    private readonly bodies: (() => void | Promise<void>)[] = [];

    add(hook: () => void | Promise<void>) {
        this.bodies.push(hook);
    }

    async run() {
        for (const hookBody of this.bodies) {
            await hookBody();
        }
    }
}