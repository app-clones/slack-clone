"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const resolvers_1 = tslib_1.__importDefault(require("./resolvers/resolvers"));
const schema_1 = tslib_1.__importDefault(require("./schemas/schema"));
const startServer_1 = tslib_1.__importDefault(require("./startServer"));
(0, startServer_1.default)(schema_1.default, resolvers_1.default);
