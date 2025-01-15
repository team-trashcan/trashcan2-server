"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const body_parser_1 = tslib_1.__importDefault(require("body-parser"));
const errorMiddleware_1 = tslib_1.__importDefault(require("./errorMiddleware"));
const notFoundMiddleware_1 = tslib_1.__importDefault(require("./notFoundMiddleware"));
const SensorApi_1 = tslib_1.__importDefault(require("./Api/SensorApi"));
const app = (0, express_1.default)();
app.disable("x-powered-by");
app.use(body_parser_1.default.json({ limit: "10mb" }));
app.use("/update-sensor", SensorApi_1.default);
app.use(errorMiddleware_1.default);
app.use(notFoundMiddleware_1.default);
exports.default = app;
