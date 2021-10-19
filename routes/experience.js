const express = require('express');
const mongoose = require('mongoose');
const Experience = require('../models/experience');
const router = express.Router();
const requireAuth = require('../middlewares/requireAuth');

router.post('/', requireAuth, async (req, res) => {

    let newExperience = new Experience({
        jobTitle: req.body.jobTitle,
        employer: req.body.employer,
        jobDescription: req.body.jobDescription,
        place: req.body.place,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        portfolioOf: req.currentUser._id
    });

    newExperience = await newExperience.save();
    res.send(newExperience);

});

router.get('/', requireAuth, async (req, res) => {
    const experience = await Experience
        .find({ portfolioOf: mongoose.Types.ObjectId(req.currentUser._id) })
        .sort({createdAt: -1});

    res.send(experience);
});

router.put('/:id', requireAuth, async (req, res) => {
    const experience = await Experience
        .findByIdAndUpdate(req.params.id, {
            $set: {
                jobTitle: req.body.jobTitle,
                employer: req.body.employer,
                jobDescription: req.body.jobDescription,
                place: req.body.place,
                startDate: req.body.startDate,
                endDate: req.body.endDate,
                portfolioOf: req.currentUser._id
            }
        }, {new: true});

    if (!experience) return res.status(404).send("The info requested does not exist.");

    res.send(experience);

});

router.delete('/:id', requireAuth, async (req, res) => {
    const experience = await Experience.findByIdAndDelete(req.params.id);

    if (!experience) return res.status(404).send("The info requested does not exist.");

    res.send(experience);
});

module.exports = router;