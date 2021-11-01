const mongoose = require('mongoose');
const Joi = require('joi');
const { errorConditions } = require('../utils/errorMessages');

const personalInfoSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    profileImage: {
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

const PersonalInfo = mongoose.model('PersonalInfo', personalInfoSchema, 'PersonalInfo');

function validatePersonalInfo(personalInfo) {
    const schema = Joi.object({
        firstName: Joi.string().min(3).max(50).required().error((errors) => errorConditions(errors)),
        lastName: Joi.string().min(3).max(50).required().error((errors) => errorConditions(errors)),
        email: Joi.string().email({ minDomainSegments: 2 }).required().error((errors) => errorConditions(errors)),
        bio: Joi.string().min(10).required().error((errors) => errorConditions(errors)),
    });

    return schema.validate(personalInfo);
}

module.exports.PersonalInfo = PersonalInfo;
module.exports.validate = validatePersonalInfo;