"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const config_1 = tslib_1.__importDefault(require("./config"));
const app_1 = tslib_1.__importDefault(require("./app"));
const server = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    app_1.default.listen(config_1.default.port, () => {
        console.log(`Server is listening on port ${config_1.default.port}`);
    });
});
server().catch((error) => {
    setTimeout(server, 5000);
    console.log(error);
});
