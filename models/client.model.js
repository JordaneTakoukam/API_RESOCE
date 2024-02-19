import { ObjectId } from 'mongodb';
import mongoose, { Schema } from 'mongoose';
import { keyCompanyState, keyRoleApp } from '../configs/key_role.js';

const clientSchema = new Schema({
    email: { type: String, required: true },

    loginId: { type: String, required: true },
    password: { type: String, required: true },

    loginHistory: [{ type: Date, required: true }],
    registrationDate: { type: Date, required: true },

    profile: {
        username: { type: String, required: true },
        profilePicture: { type: String, default: '' },
    },
    gender: { type: String, enum: ["", "m", "f"], default: "" },
    companyState: { type: String, enum: Object.values(keyCompanyState), default: "" },
    companyId: { type: ObjectId, required: true },
    role: { type: String, default: keyRoleApp.member },
    fonction: { type: String, default: "" },
    createdBy: {
        role: { type: String },
        id: { type: String },
    },
    active: {
        blocked: { type: Boolean, default: false },
        suspended: { type: Boolean, default: false },
        suspensionDuration: { type: String, default: '0h' }, //0h, 0d, 0m
        startDate: { type: Date, default: null },
        endDate: { type: Date, default: null },
    },
    contacts: [{ type: ObjectId }]

});

const Client = mongoose.model('Client', clientSchema, 'clients');

export default Client;
