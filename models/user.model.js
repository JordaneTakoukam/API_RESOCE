import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
    loginId: { type: String, required: true },
    role: { type: String, default: "employed" },

    password: { type: String, required: true },
    email: { type: String, required: true },
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },

    registrationDate: { type: Date, required: true },
    loginHistory: [{ type: Date, required: true }],
});



const User = mongoose.model('User', userSchema, 'users');

export default User;
