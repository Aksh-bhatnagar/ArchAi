import mongoose from 'mongoose';

const floorplanSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true,
  },

  plot: {
    length: { type: Number, required: true },
    width: { type: Number, required: true },
    main_enterance: { type: String, required: true },
  },

  house: {
    floor: { type: Number, default: 0 },
    bhk_type: { type: String, required: true },

    bedroom: { type: Number, required: true },
    bathroom: { type: Number, required: true },
    kitchen: { type: Number, required: true },
    living: { type: Boolean, default: true },
  },

  preferences: {
    car_parking: Boolean,
    pooja_room: Boolean,
    garden: Boolean,
    store_room: Boolean,
  },

  vastu: Boolean,
});


export const Floorplan = mongoose.model('Floorplan', floorplanSchema);