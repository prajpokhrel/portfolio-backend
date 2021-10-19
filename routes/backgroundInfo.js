const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const BackgroundInfo = require('../models/backgroundInfo');
const requireAuth = require('../middlewares/requireAuth');

router.post('/', requireAuth, async (req, res) => {

    let newPersonalInfo = new BackgroundInfo({
        currentWork: req.body.currentWork,
        previousEducation: req.body.previousEducation,
        currentJobDescription: req.body.currentJobDescription,
        outsideActivities: req.body.outsideActivities,
        portfolioOf: req.currentUser._id
    });

    newPersonalInfo = await newPersonalInfo.save();
    res.send(newPersonalInfo);

});

router.get('/', requireAuth, async (req, res) => {
    const backgroundInfo = await BackgroundInfo
        .find({ portfolioOf: mongoose.Types.ObjectId(req.currentUser._id) })
        .sort({createdAt: -1});

    res.send(backgroundInfo);
});

router.put('/:id', requireAuth, async (req, res) => {
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

    res.send(backgroundInfo);

});

router.delete('/:id', requireAuth, async (req, res) => {
    const backgroundInfo = await BackgroundInfo.findByIdAndDelete(req.params.id);

    if (!backgroundInfo) return res.status(404).send("The info requested does not exist.");

    res.send(backgroundInfo);
});

module.exports = router;