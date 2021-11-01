const mongoose = require('mongoose');
const {Skill, validate} = require('../models/skills');

module.exports.addSkills = async (req, res) => {

    const { error } = validate(req.body);

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    // Destructuring [i like to do the long way though :P]
    // const {Languages, Frameworks, Tools, Design} = req.body;

    try {
        let newSkills = new Skill({
            Languages: req.body.Languages,
            Frameworks: req.body.Frameworks,
            Tools: req.body.Tools,
            Design: req.body.Design,
            portfolioOf: req.currentUser._id,
            portfolioId: req.params.id
        });

        newSkills = await newSkills.save();
        res.status(201).send(newSkills);
    } catch (error) {
        res.status(400).send(error.message);
        // console.log(error.message);
    }
}

module.exports.getSkills = async (req, res) => {

    try {
        const skills = await Skill
            .find({ portfolioId: mongoose.Types.ObjectId(req.params.id) })
            .sort({createdAt: -1})
        // .select("-_id -__v -portfolioOf");

        res.status(200).send(skills);
    } catch (error) {
        res.status(500).send(error.message);
        // console.log(error.message);
    }
}

module.exports.updateSkills = async (req, res) => {

    try {
        const skills = await Skill
            .findByIdAndUpdate(req.params.id, {
                $set: {
                    Languages: req.body.Languages,
                    Frameworks: req.body.Frameworks,
                    Tools: req.body.Tools,
                    Design: req.body.Design,
                    portfolioOf: req.currentUser._id
                }
            }, {new: true});

        if (!skills) return res.status(404).send("The info requested does not exist.");

        res.status(200).send(skills);
    } catch (error) {
        res.status(400).send(error.message);
        // console.log(error.message);
    }
}

module.exports.deleteSkills = async (req, res) => {

    try {
        const skills = await Skill.findByIdAndDelete(req.params.id);

        if (!skills) return res.status(404).send("The info requested does not exist.");

        res.status(200).send(skills);
    } catch (error) {
        res.status(500).send(error.message);
        // console.log(error.message);
    }
}