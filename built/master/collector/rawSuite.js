"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hooks_1 = require("../../beans/hooks");
class RawSuite {
    constructor(name) {
        this.tests = [];
        this.beforeAll = new hooks_1.Hooks();
        this.beforeEach = new hooks_1.Hooks();
        this.afterEach = new hooks_1.Hooks();
        this.afterAll = new hooks_1.Hooks();
        this.name = name;
    }
}
exports.RawSuite = RawSuite;
//# sourceMappingURL=rawSuite.js.map