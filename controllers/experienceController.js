const mongoose = require('mongoose');
const {Experience, validate} = require('../models/experience');

module.exports.addExperience = async (req, res) => {

    const { error } = validate(req.body);

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    // Destructuring [i like to do the long way though :P]
    // const {jobTitle, employer, jobDescription, place, startDate, endDate} = req.body;

    try {
        let newExperience = new Experience({
            jobTitle: req.body.jobTitle,
            employer: req.body.employer,
            jobDescription: req.body.jobDescription,
            place: req.body.place,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            portfolioOf: req.currentUser._id,
            portfolioId: req.params.id
        });

        newExperience = await newExperience.save();
        res.status(201).send(newExperience);
    } catch (error) {
        res.status(400).send(error.message);
        // console.log(error.message);
    }
}

module.exports.getExperience = async (req, res) => {

    try {
        const experience = await Experience
            .find({ portfolioId: mongoose.Types.ObjectId(req.params.id) })
            .sort({createdAt: -1});

        res.status(200).send(experience);
    } catch (error) {
        res.status(500).send(error.message);
        // console.log(error.message);
    }
}

module.exports.deleteExperience = async (req, res) => {

    try {
        const experience = await Experience.findByIdAndDelete(req.params.id);

        if (!experience) return res.status(404).send("The info requested does not exist.");

        res.status(200).send(experience);
    } catch (error) {
        res.status(500).send(error.message);
        // console.log(error.message);
    }
}