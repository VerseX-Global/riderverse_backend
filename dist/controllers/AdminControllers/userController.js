"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.singleUser = exports.allUsers = void 0;
const models_1 = require("../../models");
const prisma = new models_1.PrismaClient();
async function allUsers(request, response) {
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
        const allUsers = await prisma.user.findMany({
            select: {
                id: true,
                fullname: true,
                username: true,
                email: true,
                phone_number: true,
                role: true,
                profile_image: true,
                createdAt: true,
                updatedAt: true
            },
        });
        if (allUsers.length <= 0) {
            return response.status(404).json({ message: 'No User(s) Found' });
        }
        return response.status(200).json({ message: 'User(s) fetched', data: allUsers });
    }
    catch (error) {
        console.error(error);
        return response.status(500).json({ message: 'Internal Server Error' });
    }
}
exports.allUsers = allUsers;
async function singleUser(request, response) {
    const id = parseInt(request.query.user_id, 10);
    const admin_id = request.user.adminId;
    // Check if user_id is not present or undefined
    if (!admin_id) {
        return response.status(403).json({ message: 'Unauthorized User' });
    }
    if (!id) {
        return response.status(403).json({ message: 'User ID required' });
    }
    try {
        // Retrieve the user by user_id
        const check_admin = await prisma.admin.findUnique({ where: { id: admin_id } });
        const role = check_admin?.role;
        // Check if the role is not 'User'
        if (role !== 'Admin') {
            return response.status(403).json({ message: 'Unauthorized User' });
        }
        const singleUser = await prisma.user.findUnique({
            where: {
                id: id
            },
            select: {
                id: true,
                fullname: true,
                username: true,
                email: true,
                phone_number: true,
                role: true,
                profile_image: true,
                createdAt: true,
                updatedAt: true
            },
        });
        if (!singleUser) {
            return response.status(404).json({ message: 'User not found' });
        }
        return response.status(200).json({ message: 'User fetched', data: singleUser });
    }
    catch (error) {
        console.log(error);
        return response.status(500).json({ message: 'Internal Server Error' });
    }
}
exports.singleUser = singleUser;
async function deleteUser(request, response) {
    const id = parseInt(request.query.user_id, 10);
    const admin_id = request.user.adminId;
    // Check if user_id is not present or undefined
    if (!admin_id) {
        return response.status(403).json({ message: 'Unauthorized User' });
    }
    if (!id) {
        return response.status(403).json({ message: 'User ID required' });
    }
    try {
        // Retrieve the user by user_id
        const check_admin = await prisma.admin.findUnique({ where: { id: admin_id } });
        const role = check_admin?.role;
        // Check if the role is not 'User'
        if (role !== 'Admin') {
            return response.status(403).json({ message: 'Unauthorized User' });
        }
        const user = await prisma.user.findUnique({
            where: { id }
        });
        if (!user) {
            return response.status(404).json({ message: 'Record not found' });
        }
        // Create a new delivery entry in the database
        const deleteUser = await prisma.user.delete({
            where: {
                id
            },
        });
        if (!deleteUser) {
            return response.status(403).json({ message: 'Unable to delete User' });
        }
        return response.status(204).json({ message: 'User was deleted successfully' });
    }
    catch (error) {
        console.error(error);
        return response.status(500).json({ message: 'Internal Server Error' });
    }
}
exports.deleteUser = deleteUser;
