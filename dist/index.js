"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const app_1 = require("./app");
const config_1 = require("./config");
const PORT = config_1.config.port;
const init = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const server = yield app_1.configApp();
        server.listen(PORT, () => {
            console.log(`Server started on port ${PORT} `);
        });
    }
    catch (error) {
        console.log(error.message);
    }
});
init();
