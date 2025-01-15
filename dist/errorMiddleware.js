"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = errorMiddleware;
const tslib_1 = require("tslib");
// import logger from "../../logger";
function errorMiddleware(error, req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (error instanceof SyntaxError) {
            return res.status(400).json({
                status: 400,
                message: error.message,
            });
        }
        console.log(`Generic Error on handling apiCall: `, error);
        return Promise.resolve(res.status(500).json({
            status: 500,
            message: "API Error",
        }));
    });
}
