"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVendor = exports.singleVendor = exports.allVendors = void 0;
const models_1 = require("../../models");
const prisma = new models_1.PrismaClient();
async function allVendors(request, response) {
    const admin_id = request.user.adminId;
    // Check if user_id is not present or undefined
    if (!admin_id) {
        return response.status(403).json({ message: 'Unauthorized User' });
    }
    try {
        // Retrieve the user by user_id
        const check_admin = await prisma.admin.findUnique({ where: { id: admin_id } });
        const role = check_admin?.role;
        // Check if the role is not 'User'
        if (role !== 'Admin') {
            return response.status(403).json({ message: 'Unauthorized User' });
        }
        const allVendors = await prisma.vendor.findMany({
            select: {
                id: true,
                fullname: true,
                username: true,
                email: true,
                phone_number: true,
                operating_areas: true,
                role: true,
                profile_image: true,
                createdAt: true,
                updatedAt: true
            },
        });
        if (allVendors.length <= 0) {
            return response.status(404).json({ message: 'No Vendor(s) Found' });
        }
        return response.status(200).json({ message: 'Vendor(s) fetched', data: allVendors });
    }
    catch (error) {
        console.error(error);
        return response.status(500).json({ message: 'Internal Server Error' });
    }
}
exports.allVendors = allVendors;
async function singleVendor(request, response) {
    const id = parseInt(request.query.vendor_id, 10);
    const admin_id = request.user.adminId;
    // Check if user_id is not present or undefined
    if (!admin_id) {
        return response.status(403).json({ message: 'Unauthorized User' });
    }
    if (!id) {
        return response.status(403).json({ message: 'Vendor ID required' });
    }
    try {
        // Retrieve the user by user_id
        const check_admin = await prisma.admin.findUnique({ where: { id: admin_id } });
        const role = check_admin?.role;
        // Check if the role is not 'User'
        if (role !== 'Admin') {
            return response.status(403).json({ message: 'Unauthorized User' });
        }
        const singleVendor = await prisma.vendor.findUnique({
            where: {
                id: id
            },
            select: {
                id: true,
                fullname: true,
                username: true,
                email: true,
                phone_number: true,
                operating_areas: true,
                role: true,
                profile_image: true,
                createdAt: true,
                updatedAt: true
            },
        });
        if (!singleVendor) {
            return response.status(404).json({ message: 'Vendor not found' });
        }
        return response.status(200).json({ message: 'Vendor fetched', data: singleVendor });
    }
    catch (error) {
        console.log(error);
        return response.status(500).json({ message: 'Internal Server Error' });
    }
}
exports.singleVendor = singleVendor;
async function deleteVendor(request, response) {
    const id = parseInt(request.query.vendor_id, 10);
    const admin_id = request.user.adminId;
    // Check if user_id is not present or undefined
    if (!admin_id) {
        return response.status(403).json({ message: 'Unauthorized User' });
    }
    if (!id) {
        return response.status(403).json({ message: 'Vendor ID required' });
    }
    try {
        // Retrieve the user by user_id
        const check_admin = await prisma.admin.findUnique({ where: { id: admin_id } });
        const role = check_admin?.role;
        // Check if the role is not 'User'
        if (role !== 'Admin') {
            return response.status(403).json({ message: 'Unauthorized User' });
        }
        const vendor = await prisma.vendor.findUnique({
            where: { id }
        });
        if (!vendor) {
            return response.status(404).json({ message: 'Record not found' });
        }
        // Create a new delivery entry in the database
        const deleteVendor = await prisma.vendor.delete({
            where: {
                id
            },
        });
        if (!deleteVendor) {
            return response.status(403).json({ message: 'Unable to delete Vendor' });
        }
        return response.status(204).json({ message: 'Vendor was deleted successfully' });
    }
    catch (error) {
        console.error(error);
        return response.status(500).json({ message: 'Internal Server Error' });
    }
}
exports.deleteVendor = deleteVendor;
