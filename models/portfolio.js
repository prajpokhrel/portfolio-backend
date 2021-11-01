const mongoose = require('mongoose');
const Joi = require('joi');
const { errorConditions } = require('../utils/errorMessages');

const portfolioSchema = new mongoose.Schema({
    portfolioName : {
        type: String,
        required: true
    },
    portfolioDescription: {
        type: String,
        required: true
    },
    portfolioOf: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true,
    toObject: {virtuals: true},
    toJSON: {virtuals: true}
});

portfolioSchema.virtual('contact', {
    ref: 'Contact',
    localField: '_id',
    foreignField: 'portfolioId'
});

portfolioSchema.virtual('personal', {
    ref: 'PersonalInfo',
    localField: '_id',
    foreignField: 'portfolioId'
});

portfolioSchema.virtual('background', {
    ref: 'BackgroundInfo',
    localField: '_id',
    foreignField: 'portfolioId'
});

portfolioSchema.virtual('experience', {
    ref: 'Experience',
    localField: '_id',
    foreignField: 'portfolioId'
});

portfolioSchema.virtual('skill', {
    ref: 'Skill',
    localField: '_id',
    foreignField: 'portfolioId'
});

portfolioSchema.virtual('featured', {
    ref: 'FeaturedProject',
    localField: '_id',
    foreignField: 'portfolioId'
});

portfolioSchema.virtual('other', {
    ref: 'OtherProject',
    localField: '_id',
    foreignField: 'portfolioId'
});

const Portfolio = mongoose.model('Portfolio', portfolioSchema, 'Portfolio');

function validatePortfolio(portfolio) {
    const schema = Joi.object({
        portfolioName: Joi.string().min(5).required().error((errors) => errorConditions(errors)),
        portfolioDescription: Joi.string().min(10).required().error((errors) => errorConditions(errors)),
    });

    return schema.validate(portfolio);
}

module.exports.Portfolio = Portfolio;
module.exports.validate = validatePortfolio;