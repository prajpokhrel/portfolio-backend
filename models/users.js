const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');
const Joi = require('joi');
const { errorConditions } = require('../utils/errorMessages');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    }
}, {timestamps: true});

// jwt expects time in seconds
const maxAge = 3 * 24 * 60 * 60;

userSchema.methods.generateAuthToken = function () {
    return jwt.sign({ _id: this._id }, config.get('jwtPrivateKey'), {
        expiresIn: maxAge
    });
}

const User = mongoose.model('User', userSchema, 'User');

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required().error((errors) => errorConditions(errors)),
        userName: Joi.string().alphanum().min(3).max(30).required().error((errors) => errorConditions(errors)),
        email: Joi.string().email({ minDomainSegments: 2 }).required().error((errors) => errorConditions(errors)),
        password: Joi.string()
            .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})"))
            .required().error((errors) => errorConditions(errors)),
    });

    return schema.validate(user);
}

module.exports.User = User;
module.exports.validate = validateUser;