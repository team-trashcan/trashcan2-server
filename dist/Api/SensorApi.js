"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_promise_router_1 = tslib_1.__importDefault(require("express-promise-router"));
const router = (0, express_promise_router_1.default)();
router.post("/", (req, res) => {
    console.log("Stuff from trashcan: ", req.body);
    res.status(200).end();
});
exports.default = router;
