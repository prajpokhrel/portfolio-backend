const mongoose = require('mongoose');
const Joi = require('joi');
const { errorConditions } = require('../utils/errorMessages');

const contactSchema = new mongoose.Schema({
    statusDescription: {
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

const Contact = mongoose.model('Contact', contactSchema, 'Contact');

function validateContact(contact) {
    const schema = Joi.object({
        statusDescription: Joi.string().min(30).required().error((errors => errorConditions(errors)))
    });

    return schema.validate(contact, {allowUnknown: true});
}

module.exports.Contact = Contact;
module.exports.validate = validateContact;