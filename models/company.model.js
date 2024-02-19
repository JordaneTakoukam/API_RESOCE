import { ObjectId } from 'mongodb';
import mongoose, { Schema } from 'mongoose';

const companySchema = new Schema({
    companyName: { type: String, required: true },
    creationDate: { type: Date, required: true },
    activatedDate: { type: Date },
    ceo: {
        fullname: { type: String, required: true },
        lastname: { type: String, required: true },
        phoneNumbers: [{ type: String }],
        email: { type: String, required: true },
    },
    location: {
        country: { type: String },
        city: { type: String },
        district: { type: String },
        otherDetails: { type: String },
    },
    companyType: { type: String, enum: ['physical', 'online'], required: true },
    activatedBy: { type: ObjectId },
    suspension: {
        suspended: { type: Boolean, default: false },
        reason: { type: String },
        duration: { type: String }, // In hours
        suspensionStart: { type: Date },
        suspensionEnd: { type: Date }
    }
});

const Company = mongoose.model('Company', companySchema, 'companies');

export default Company;
