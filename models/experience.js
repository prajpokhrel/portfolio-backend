const mongoose = require('mongoose');
const Joi = require('joi');
const { errorConditions } = require('../utils/errorMessages');

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
    },
    portfolioId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Portfolio',
        required: true
    }
}, {timestamps: true});

const Experience = mongoose.model('Experience', experienceSchema, 'Experience');

function validateExperience(experience) {
    const schema = Joi.object({
        jobTitle: Joi.string().min(5).required().error((errors) => errorConditions(errors)),
        employer: Joi.string().min(3).required().error((errors) => errorConditions(errors)),
        jobDescription: Joi.array().items(Joi.string().required()).error((errors) => errorConditions(errors)),
        place: Joi.string().min(5).required().error((errors) => errorConditions(errors)),
        startDate: Joi.date().required().error((errors) => errorConditions(errors)),
        endDate: Joi.date().required().error((errors) => errorConditions(errors))
    });

    return schema.validate(experience);
}

module.exports.Experience = Experience;
module.exports.validate = validateExperience;