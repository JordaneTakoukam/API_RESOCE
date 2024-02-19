import mongoose, { Schema } from 'mongoose';

const staticsSchema = new Schema({
    sliders: [{
        image: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true }
    }],
    countries: [{
        name: { type: String, required: true },
        code: { type: String, required: true }
    }]
});

const Statics = mongoose.model('Statics', staticsSchema, 'statics');

export default Statics;
