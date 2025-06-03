"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminOperatingRouter = void 0;
// src/routes/authRoutes.ts
const express_1 = __importDefault(require("express"));
const authenticationMiddleware_1 = require("../../middlewares/authMiddleware/authenticationMiddleware");
const operatingAreaController_1 = require("../../controllers/AdminControllers/operatingAreaController");
exports.adminOperatingRouter = express_1.default.Router();
exports.adminOperatingRouter.post('/create-operating-area', authenticationMiddleware_1.authenticateJWT, operatingAreaController_1.createOperatingArea);
exports.adminOperatingRouter.put('/update-operating-area', authenticationMiddleware_1.authenticateJWT, operatingAreaController_1.updateOperatingArea);
exports.adminOperatingRouter.get('/all-operating-areas', authenticationMiddleware_1.authenticateJWT, operatingAreaController_1.allOperatingAreas);
exports.adminOperatingRouter.get('/single-operating-area', authenticationMiddleware_1.authenticateJWT, operatingAreaController_1.singleOperatingArea);
exports.adminOperatingRouter.delete('/delete-operating-area', authenticationMiddleware_1.authenticateJWT, operatingAreaController_1.deleteOperatingArea);
// export default authRouter;
