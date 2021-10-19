const mongoose = require('mongoose');

const featuredProjectSchema = new mongoose.Schema({
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
    projectImage: {
        type: String,
        required: true
    },
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

const FeaturedProject = mongoose.model('FeaturedProject', featuredProjectSchema);

module.exports = FeaturedProject;