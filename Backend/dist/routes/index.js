"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logRouter = exports.userRouter = exports.employeeRouter = void 0;
// ~ Indice de routers...
const employee_routes_js_1 = require("./employeeRoutes/employee.routes.js");
Object.defineProperty(exports, "employeeRouter", { enumerable: true, get: function () { return employee_routes_js_1.employeeRouter; } });
const user_routes_js_1 = require("./useerRoutes/user.routes.js");
Object.defineProperty(exports, "userRouter", { enumerable: true, get: function () { return user_routes_js_1.userRouter; } });
const auth_routes_js_1 = require("./authRoutes/auth.routes.js");
Object.defineProperty(exports, "logRouter", { enumerable: true, get: function () { return auth_routes_js_1.logRouter; } });
//# sourceMappingURL=index.js.map