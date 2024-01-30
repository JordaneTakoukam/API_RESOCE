import { ObjectId } from 'mongodb';
import mongoose, { Schema } from 'mongoose';

const companySchema = new Schema({
    companyName: { type: String, required: true },
    registrationDate: { type: Date, required: true },
    properties: {
        name: { type: String, required: true },
        phoneNumber: { type: String, required: true },
        email: { type: String, required: true },
    },
    location: { type: String, default: '' },
    createBy: { type: ObjectId, required: true }, 
    suspended: { type: Boolean, default: false },
});


const Company = mongoose.model('Company', companySchema, 'companies');


export default Company;
