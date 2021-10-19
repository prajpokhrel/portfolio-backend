const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    statusDescription: {
        type: String,
        required: true
    },
    portfolioOf: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {timestamps: true});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;