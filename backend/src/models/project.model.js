import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        default: 'description'
    }
}, { timestamps: true });

export const Project = mongoose.model('Project', projectSchema);