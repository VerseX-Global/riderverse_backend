"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAccountName = exports.vendorPrice = exports.banks = exports.confirmDelivery = exports.deliveryCode = exports.allOperatingArea = void 0;
const models_1 = require("../models");
const config_1 = require("../config/config");
const express_validator_1 = require("express-validator");
const axios_1 = __importDefault(require("axios"));
const prisma = new models_1.PrismaClient();
const PAYSTACK_SECRET_KEY = config_1.Config.paystackSecret;
async function allOperatingArea(request, response) {
    try {
        const allOperatingArea = await prisma.operating_areas.findMany({
            select: {
                id: true,
                name: true,
                status: true,
                createdAt: true,
                updatedAt: true
            }
        });
        if (allOperatingArea.length <= 0) {
            return response.status(404).json({ message: 'No Record Found' });
        }
        return response.status(200).json({ message: 'All Operating Areas', data: allOperatingArea });
    }
    catch (error) {
        return response.status(500).json({ message: error });
    }
}
exports.allOperatingArea = allOperatingArea;
async function deliveryCode(request, response) {
    const delivery_code = parseInt(request.query.delivery_code, 10);
    try {
        const delivery = await prisma.delivery.findUnique({
            where: {
                delivery_code
            },
            select: {
                id: true,
                package_name: true,
                phone_number: true,
                pickup_location: true,
                delivery_location: true,
                estimated_delivery_price: true,
                delivery_code: true,
                landmark: true,
                package_image: true,
                is_delivered: true,
                is_pickedup: true,
                is_accepted: true,
                status: true,
                vendor_id: true,
                user: {
                    select: {
                        id: true,
                        fullname: true,
                        username: true,
                        email: true,
                        phone_number: true,
                        profile_image: true,
                    }
                },
                vendor: {
                    select: {
                        id: true,
                        fullname: true,
                        username: true,
                        email: true,
                        phone_number: true,
                        profile_image: true,
                    }
                }
            },
        });
        if (!delivery) {
            return response.status(404).json({ message: 'Delivery Does not Exist' });
        }
        return response.status(200).json({ message: 'Delivery Details', data: delivery });
    }
    catch (error) {
        return response.status(500).json({ message: error });
    }
}
exports.deliveryCode = deliveryCode;
async function confirmDelivery(request, response) {
    const delivery_code = parseInt(request.query.delivery_code, 10);
    try {
        const delivery = await prisma.delivery.update({
            data: {
                is_delivered: true,
                status: 'Delivered'
            },
            where: {
                delivery_code
            },
            select: {
                id: true,
                package_name: true,
                phone_number: true,
                pickup_location: true,
                delivery_location: true,
                estimated_delivery_price: true,
                delivery_code: true,
                landmark: true,
                package_image: true,
                is_delivered: true,
                is_pickedup: true,
                is_accepted: true,
                status: true,
                vendor_id: true,
                user: {
                    select: {
                        id: true,
                        fullname: true,
                        username: true,
                        email: true,
                        phone_number: true,
                        profile_image: true,
                    }
                },
                vendor: {
                    select: {
                        id: true,
                        fullname: true,
                        username: true,
                        email: true,
                        phone_number: true,
                        profile_image: true,
                    }
                }
            },
        });
        if (!delivery) {
            return response.status(404).json({ message: 'No Record Found' });
        }
        return response.status(200).json({ message: 'Delivery Details', data: delivery });
    }
    catch (error) {
        return response.status(500).json({ message: error });
    }
}
exports.confirmDelivery = confirmDelivery;
async function banks(request, response) {
    try {
        const banks = await prisma.nigerian_banks.findMany({
            select: {
                id: true,
                name: true,
                code: true,
                ussd: true,
                slug: true,
                is_active: true,
                created_at: true,
                updated_at: true,
            }
        });
        if (banks.length <= 0) {
            return response.status(404).json({ message: 'No Record Found' });
        }
        return response.status(200).json({ message: 'All Banks', data: banks });
    }
    catch (error) {
        return response.status(500).json({ message: error });
    }
}
exports.banks = banks;
async function vendorPrice(request, response) {
    try {
        const { landmark } = request.query;
        function isOperatingAreaArray(value) {
            return Array.isArray(value) && value.every(item => typeof item === 'object' && 'area' in item && 'price' in item);
        }
        // Fetch all vendors from the database
        const allVendors = await prisma.vendor.findMany({});
        // Filter the vendors to match the landmark in the operating_area JSON field
        const matchingVendors = allVendors.reduce((acc, vendor) => {
            if (typeof vendor.operating_areas === 'string') {
                try {
                    // Parse the JSON string to an array of OperatingArea
                    const operatingAreas = JSON.parse(vendor.operating_areas);
                    // Use type guard to check if operatingAreas is an array of OperatingArea
                    if (isOperatingAreaArray(operatingAreas)) {
                        const matchedAreas = operatingAreas.filter(areaObj => areaObj.area === landmark);
                        if (matchedAreas.length > 0) {
                            acc.push({
                                id: vendor.id,
                                business_name: vendor.username,
                                operating_areas: matchedAreas
                            });
                        }
                    }
                }
                catch (error) {
                    // Handle JSON parsing error
                    console.error('Error parsing operating_areas JSON:', error);
                }
            }
            return acc;
        }, []);
        if (matchingVendors.length <= 0) {
            return response.status(404).json({ message: 'No Record Found' });
        }
        return response.status(200).json({ message: 'All Operating Areas', data: matchingVendors });
    }
    catch (error) {
        return response.status(500).json({ message: error });
    }
}
exports.vendorPrice = vendorPrice;
async function fetchAccountName(request, response) {
    const { bank_code, account_number } = request.body;
    try {
        const validationRules = [
            (0, express_validator_1.body)('bank_code').notEmpty().withMessage('Bank code is required'),
            (0, express_validator_1.body)('account_number').isLength({ min: 10 }).withMessage('Account number must be at least 10 digits'),
        ];
        await Promise.all(validationRules.map(rule => rule.run(request)));
        const errors = (0, express_validator_1.validationResult)(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }
        // Call Paystack API to verify account details
        const paystackResponse = await axios_1.default.get(`https://api.paystack.co/bank/resolve`, {
            params: {
                account_number,
                bank_code
            },
            headers: {
                Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`
            }
        });
        const { account_name } = paystackResponse.data.data;
        if (!account_name) {
            return response.status(400).json({ message: 'Unable to resolve account name' });
        }
        return response.status(200).json({ message: 'Vendor account details updated', data: account_name });
    }
    catch (error) {
        console.error(error?.response?.data || error);
        return response.status(500).json({ message: 'Internal Server Error' });
    }
}
exports.fetchAccountName = fetchAccountName;
