const mongoose = require('mongoose');
const Joi = require('joi');
const { errorConditions } = require('../utils/errorMessages');

const skillsSchema = new mongoose.Schema({
    Languages: [
        { type: String, required: true}
    ],
    Frameworks: [
        {type: String, required: true}
    ],
    Tools: [
        {type: String, required: true}
    ],
    Design: [
        {type: String, required: true}
    ],
    portfolioOf: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    portfolioId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Portfolio',
        required: true
    }
});

const Skill = mongoose.model('Skill', skillsSchema, 'Skill');

function validateSkills(skills) {
    const schema = Joi.object({
        Languages: Joi.array().items(Joi.string().required()).error((errors) => errorConditions(errors)),
        Frameworks: Joi.array().items(Joi.string().required()).error((errors) => errorConditions(errors)),
        Tools: Joi.array().items(Joi.string().required()).error((errors) => errorConditions(errors)),
        Design: Joi.array().items(Joi.string().required()).error((errors) => errorConditions(errors)),
    });

    return schema.validate(skills);
}

module.exports.Skill = Skill;
module.exports.validate = validateSkills;