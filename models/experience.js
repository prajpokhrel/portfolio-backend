const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
    jobTitle: {
        type: String,
        required: true
    },
    employer: {
        type: String,
        required: true
    },
    jobDescription: [
        {type: String, required: true}
    ],
    place: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date
    },
    portfolioOf: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {timestamps: true});

const Experience = mongoose.model('Experience', experienceSchema);

module.exports = Experience;