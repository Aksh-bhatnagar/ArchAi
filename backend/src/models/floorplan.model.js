import mongoose from 'mongoose';

const floorplanSchema = new mongoose.Schema({
    // Project_Id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Project',
    //     required: true
    // },
    plot: {
        length: { type: Number, required: true },
        width: { type: Number, required: true },
        main_enterance: { type: String, enum: ['North', 'South', 'East', 'West', 'North-East', 'North-West', 'South-East', 'South-West'], required: true, default: 'North' }
    },
    house: {
        floor: { type: Number, required: true, default: 0 },
        bhk_type: { type: String, enum: ['1RK', '1BHK', '2BHK', '3BHK', 'Custom'], required: true, default: '2BHK' },
        bedroom: { type: Number, required: true },
        bathroom: { type: Number, required: true },
        kitchen: { type: Number, required: true },
        living: { type: Boolean, default: true },
    },
    preferences: {
      car_parking: { type: Boolean, default: false },
      pooja_room: { type: Boolean, default: false },
      garden: { type: Boolean, default: false },
      store_room: { type: Boolean, default: false },
    },
    vastu: {
        type: Boolean,
        required: true,
        default: false
    }
}, { timestamps: true });

export const Floorplan = mongoose.model('Floorplan', floorplanSchema);