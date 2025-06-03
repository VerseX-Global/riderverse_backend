"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminDeliveryRouter = void 0;
// src/routes/deliveryRoutes.ts
const express_1 = __importDefault(require("express"));
const authenticationMiddleware_1 = require("../../middlewares/authMiddleware/authenticationMiddleware");
const deliveryController_1 = require("../../controllers/AdminControllers/deliveryController");
exports.adminDeliveryRouter = express_1.default.Router();
exports.adminDeliveryRouter.get('/all-deliveries', authenticationMiddleware_1.authenticateJWT, deliveryController_1.viewAllDelivery);
exports.adminDeliveryRouter.get('/single-delivery', authenticationMiddleware_1.authenticateJWT, deliveryController_1.viewSingleDelivery);
exports.adminDeliveryRouter.delete('/delete-delivery', authenticationMiddleware_1.authenticateJWT, deliveryController_1.deleteDelivery);
