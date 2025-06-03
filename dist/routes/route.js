"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
// src/routes/userRoutes.ts
const express_1 = __importDefault(require("express"));
const miscellaneousController_1 = require("../controllers/miscellaneousController");
exports.router = express_1.default.Router();
exports.router.get('/operating_areas', miscellaneousController_1.allOperatingArea);
exports.router.get('/delivery-detail', miscellaneousController_1.deliveryCode);
exports.router.get('/confirm-delivery', miscellaneousController_1.confirmDelivery);
exports.router.get('/vendor-price', miscellaneousController_1.vendorPrice);
exports.router.get('/get-banks', miscellaneousController_1.banks);
exports.router.post('/get-account-name', miscellaneousController_1.fetchAccountName);
