const mongoose = require('mongoose');
const {OtherProject, validate} = require('../models/otherProject');

module.exports.addOtherProject = async (req, res) => {

    const { error } = validate(req.body);

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    // Destructuring
    // const {title, description, tools, github, demo} = req.body;

    try {
        let newOtherProject = new OtherProject({
            title: req.body.title,
            description: req.body.description,
            tools: req.body.tools,
            github: req.body.github,
            demo: req.body.demo,
            portfolioOf: req.currentUser._id,
            portfolioId: req.params.id
        });

        newOtherProject = await newOtherProject.save();
        res.status(201).send(newOtherProject);
    } catch (error) {
        res.status(400).send(error.message);
        // console.log(error.message);
    }
}

module.exports.getOtherProject = async (req, res) => {

    try {
        const otherProject = await OtherProject
            .find({ portfolioId: mongoose.Types.ObjectId(req.params.id) })
            .sort({createdAt: -1});

        res.status(200).send(otherProject);
    } catch (error) {
        res.status(500).send(error.message);
        // console.log(error.message);
    }
}

module.exports.deleteOtherProject = async (req, res) => {

    try {
        const otherProject = await OtherProject.findByIdAndDelete(req.params.id);

        if (!otherProject) return res.status(404).send("The info requested does not exist.");

        res.status(200).send(otherProject);
    } catch (error) {
        res.status(500).send(error.message);
        // console.log(error.message);
    }
}

