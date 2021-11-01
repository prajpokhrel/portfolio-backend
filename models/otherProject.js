const mongoose = require('mongoose');
const Joi = require('joi');
const { errorConditions } = require('../utils/errorMessages');

const otherProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tools: [
        {type: String, required: true}
    ],
    github: {
        type: String,
        required: true
    },
    demo: {
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

const OtherProject = mongoose.model('OtherProject', otherProjectSchema, 'OtherProject');

function validateOtherProject(otherProject) {
    const schema = Joi.object({
        title: Joi.string().min(5).required().error((errors) => errorConditions(errors)),
        description: Joi.string().min(30).required().error((errors) => errorConditions(errors)),
        tools: Joi.array().items(Joi.string().required()).error((errors) => errorConditions(errors)),
        github: Joi.string().required().error((errors) => errorConditions(errors)),
        demo: Joi.string().required().error((errors) => errorConditions(errors))
    });

    return schema.validate(otherProject);
}

module.exports.OtherProject = OtherProject;
module.exports.validate = validateOtherProject;