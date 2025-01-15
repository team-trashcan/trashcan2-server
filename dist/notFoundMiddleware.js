"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = notFoundMiddleware;
function notFoundMiddleware(req, res) {
    res.status(404).json({ status: 404, message: "Not Found" });
}
