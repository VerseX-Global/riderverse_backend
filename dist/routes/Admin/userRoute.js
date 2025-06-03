"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminUserRouter = void 0;
// src/routes/userRoutes.ts
const express_1 = __importDefault(require("express"));
const authenticationMiddleware_1 = require("../../middlewares/authMiddleware/authenticationMiddleware");
const userController_1 = require("../../controllers/AdminControllers/userController");
exports.adminUserRouter = express_1.default.Router();
exports.adminUserRouter.get('/all-users', authenticationMiddleware_1.authenticateJWT, userController_1.allUsers);
exports.adminUserRouter.get('/single-user', authenticationMiddleware_1.authenticateJWT, userController_1.singleUser);
exports.adminUserRouter.delete('/delete-user', authenticationMiddleware_1.authenticateJWT, userController_1.deleteUser);
