"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const winston_1 = tslib_1.__importDefault(require("winston"));
const logger = winston_1.default.createLogger({
    level: "info",
    format: winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.timestamp(), winston_1.default.format.align(), winston_1.default.format.printf((info) => {
        const { timestamp, level, message, ...args } = info;
        const ts = timestamp.slice(0, 19).replace("T", " ");
        return `${ts} [${level}]: ${message} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ""}`;
    })),
    transports: [new winston_1.default.transports.Console()]
});
exports.default = logger;
