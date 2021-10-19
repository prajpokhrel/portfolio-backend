const mongoose = require('mongoose');

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
    }
}, {timestamps: true});

const OtherProject = mongoose.model('OtherProject', otherProjectSchema);

module.exports = OtherProject;