"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminVendorRouter = void 0;
// src/routes/vendorRoutes.ts
const express_1 = __importDefault(require("express"));
const authenticationMiddleware_1 = require("../../middlewares/authMiddleware/authenticationMiddleware");
const vendorController_1 = require("../../controllers/AdminControllers/vendorController");
exports.adminVendorRouter = express_1.default.Router();
exports.adminVendorRouter.get('/all-vendors', authenticationMiddleware_1.authenticateJWT, vendorController_1.allVendors);
exports.adminVendorRouter.get('/single-vendor', authenticationMiddleware_1.authenticateJWT, vendorController_1.singleVendor);
exports.adminVendorRouter.delete('/delete-vendor', authenticationMiddleware_1.authenticateJWT, vendorController_1.deleteVendor);
