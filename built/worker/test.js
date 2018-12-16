"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Test {
    constructor(name, action) {
        this.name = name;
        this.action = action;
    }
    async run() {
        await this.action();
    }
}
exports.Test = Test;
//# sourceMappingURL=test.js.map