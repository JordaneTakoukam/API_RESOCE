import mongoose, { Schema } from 'mongoose';

const clientShema = new Schema({
    companyId: { type: String, required: true },
    role: { type: String, required: true },
    fonction: { type: String, default: 'employed' },
    loginId: { type: String, required: true },
    profile: {
        username: { type: String, required: true },
        password: { type: String, required: true },
        email: { type: String, required: true },
        profilePicture: { type: String, default: '' },
    },
    registrationDate: { type: Date, required: true },
    loginHistory: { type: Array, default: [] },

    online: {
        status: { type: Boolean, default: false },
        lastOnlineDate: { type: Date, default: null },
    },

    active: {
        suspended: { type: Boolean, default: false },
        suspensionDurationInHours: { type: String, default: null },
        startDate: { type: Date, default: null },
        endDate: { type: Date, default: null },
    }
});


const Client = mongoose.model('Client', clientShema, 'clients');


export default Client;
