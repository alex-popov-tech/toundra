"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Hooks {
    constructor() {
        this.actions = [];
    }
    add(hook) {
        this.actions.push(hook);
    }
    async run(context) {
        for (const action of this.actions) {
            await action(context);
        }
    }
}
exports.Hooks = Hooks;
//# sourceMappingURL=hooks.js.map