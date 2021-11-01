const mongoose = require('mongoose');
const Joi = require('joi');
const { errorConditions } = require('../utils/errorMessages');

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
    },
    portfolioId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Portfolio',
        required: true
    }
}, {timestamps: true});

const BackgroundInfo = mongoose.model('BackgroundInfo', backgroundInfoSchema, 'BackgroundInfo');

function validateBackgroundInfo(backgroundInfo) {
    const schema = Joi.object({
        currentWork: Joi.string().min(10).required().error((errors) => errorConditions(errors)),
        previousEducation: Joi.string().min(10).required().error((errors) => errorConditions(errors)),
        currentJobDescription: Joi.string().min(10).required().error((errors) => errorConditions(errors)),
        outsideActivities: Joi.string().min(10).required().error((errors) => errorConditions(errors))
    });

    return schema.validate(backgroundInfo);
}

module.exports.BackgroundInfo = BackgroundInfo;
module.exports.validate = validateBackgroundInfo;