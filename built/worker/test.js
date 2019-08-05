"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Test {
    constructor(name, action) {
        this.name = name;
        this.action = action;
    }
    async run(context) {
        await this.action(context);
    }
}
exports.Test = Test;
//# sourceMappingURL=test.js.map