"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getUsers = exports.createUser = void 0;
const client_1 = require("@prisma/client");
const Joi = __importStar(require("joi"));
// Create a new express application instance
const prisma = new client_1.PrismaClient();
// POST /users: Create a user
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Request body
    const userInput = req.body;
    // Validate the request body
    const schema = Joi.object({
        email: Joi.string().email().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        social: Joi.object({
            facebook: Joi.string().uri(),
            twitter: Joi.string().uri(),
            github: Joi.string().uri(),
            website: Joi.string().uri(),
        }),
    });
    // If the request body is invalid, return 400 Bad Request
    const { error } = schema.validate(userInput);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    // Create a new user in the database and return the user object
    try {
        const user = yield prisma.user.create({
            data: {
                email: userInput.email,
                firstName: userInput.firstName,
                lastName: userInput.lastName,
                social: userInput.social,
            },
        });
        res.json(user);
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ error: "Failed to create user" });
    }
});
exports.createUser = createUser;
// GET /users: Get all users
const getUsers = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma.user.findMany();
        res.json(users);
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ error: "Failed to get users" });
    }
});
exports.getUsers = getUsers;
// GET /users/:userId: Get a user by ID
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.userId);
    try {
        const user = yield prisma.user.findUnique({
            where: {
                id: userId,
            },
        });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(user);
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ error: "Failed to get user" });
    }
});
exports.getUserById = getUserById;
// PUT /users/:userId: Update a user by ID
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.userId);
    const userInput = req.body;
    try {
        const user = yield prisma.user.update({
            where: {
                id: userId,
            },
            data: userInput,
        });
        res.json(user);
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ error: "Failed to update user" });
    }
});
exports.updateUser = updateUser;
// DELETE /users/:userId: Delete a user by ID
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.userId);
    try {
        yield prisma.user.delete({
            where: {
                id: userId,
            },
        });
        res.json({ message: "User deleted" });
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ error: "Failed to delete user" });
    }
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=UserController.js.map