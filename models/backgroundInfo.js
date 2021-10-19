const mongoose = require('mongoose');

const backgroundInfoSchema = new mongoose.Schema({
    currentWork: {
        type: String,
        required: true
    },
    previousEducation: {
        type: String,
        required: true
    },
    currentJobDescription: {
        type: String,
        required: true
    },
    outsideActivities: {
        type: String,
        required: true
    },
    portfolioOf: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {timestamps: true});

const BackgroundInfo = mongoose.model('BackgroundInfo', backgroundInfoSchema);

module.exports = BackgroundInfo;