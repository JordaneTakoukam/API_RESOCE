import mongoose, { Schema } from 'mongoose';
import { keyRoleApp } from '../configs/key_role.js';

const validRoles = [keyRoleApp.superAdmin, keyRoleApp.admin, keyRoleApp.moderator];

const userSchema = new Schema({
    loginId: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, enum: Object.values(keyRoleApp), required: true },
    password: { type: String, required: true },
    username: { type: String, default: '' },
    registrationDate: { type: Date, required: true },
    loginHistory: [{ type: Date, required: true }],
});

const User = mongoose.model('User', userSchema, 'users');

export default User;
