import mongoose, { Schema } from 'mongoose';

const companyPendingSchema = new Schema({
    companyName: { type: String, required: true },
    creationDate: { type: Date, required: true },
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
});

const CompanyNotActivated = mongoose.model('CompaniesNotActivated', companyPendingSchema, 'companies-not-activated');

export default CompanyNotActivated;
