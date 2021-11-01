const {BackgroundInfo, validate} = require('../models/backgroundInfo');
const mongoose = require('mongoose');

module.exports.addBackgroundInfo = async (req, res) => {

    const { error } = validate(req.body);

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    // Destructuring
    // const { currentWork, previousEducation, currentJobDescription, outsideActivities } = req.body;

    try {
        let newBackgroundInfo = new BackgroundInfo({
            currentWork: req.body.currentWork,
            previousEducation: req.body.previousEducation,
            currentJobDescription: req.body.currentJobDescription,
            outsideActivities: req.body.outsideActivities,
            portfolioOf: req.currentUser._id,
            portfolioId: req.params.id
        });

        newBackgroundInfo = await newBackgroundInfo.save();
        res.status(201).send(newBackgroundInfo);
    } catch (error) {
        res.status(400).send(error.message);
        // console.log(error.message);
    }
}

module.exports.getBackgroundInfo = async (req, res) => {

    try {
        const backgroundInfo = await BackgroundInfo
            .find({ portfolioId: mongoose.Types.ObjectId(req.params.id) })
            .sort({createdAt: -1});

        res.status(200).send(backgroundInfo);
    } catch (error) {
        res.status(500).send(error.message);
        // console.log(error.message);
    }
}

module.exports.updateBackgroundInfo = async (req, res) => {

    const { error } = validate(req.body);

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    try {
        const backgroundInfo = await BackgroundInfo
            .findByIdAndUpdate(req.params.id, {
                $set: {
                    currentWork: req.body.currentWork,
                    previousEducation: req.body.previousEducation,
                    currentJobDescription: req.body.currentJobDescription,
                    outsideActivities: req.body.outsideActivities,
                    portfolioOf: req.currentUser._id
                }
            }, {new: true});

        if (!backgroundInfo) return res.status(404).send("The info requested does not exist.");

        res.status(200).send(backgroundInfo);
    } catch (error) {
        res.status(400).send(error.message);
        console.log(error.message);
    }
}

module.exports.deleteBackgroundInfo = async (req, res) => {

    try {
        const backgroundInfo = await BackgroundInfo.findByIdAndDelete(req.params.id);

        if (!backgroundInfo) return res.status(404).send("The info requested does not exist.");

        res.status(200).send(backgroundInfo);
    } catch (error) {
        res.status(500).send(error.message);
        console.log(error.message);
    }
}
