const mongoose = require('mongoose');

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
    }
});

const Skill = mongoose.model('Skill', skillsSchema);

module.exports = Skill;