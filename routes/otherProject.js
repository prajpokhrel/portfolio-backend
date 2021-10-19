const express = require('express');
const mongoose = require('mongoose');
const OtherProject = require('../models/otherProject');
const router = express.Router();
const requireAuth = require('../middlewares/requireAuth');

router.post('/', requireAuth, async (req, res) => {

    let newOtherProject = new OtherProject({
        title: req.body.title,
        description: req.body.description,
        tools: req.body.tools,
        github: req.body.github,
        demo: req.body.demo,
        portfolioOf: req.currentUser._id
    });

    newOtherProject = await newOtherProject.save();
    res.send(newOtherProject);

});

router.get('/', requireAuth, async (req, res) => {
    const otherProject = await OtherProject
        .find({ portfolioOf: mongoose.Types.ObjectId(req.currentUser._id) })
        .sort({createdAt: -1});

    res.send(otherProject);
});

router.put('/:id', requireAuth, async (req, res) => {
    const otherProject = await OtherProject
        .findByIdAndUpdate(req.params.id, {
            $set: {
                title: req.body.title,
                description: req.body.description,
                tools: req.body.tools,
                github: req.body.github,
                demo: req.body.demo,
                portfolioOf: req.currentUser._id
            }
        }, {new: true});

    if (!otherProject) return res.status(404).send("The info requested does not exist.");

    res.send(otherProject);

});

router.delete('/:id', requireAuth, async (req, res) => {
    const otherProject = await OtherProject.findByIdAndDelete(req.params.id);

    if (!otherProject) return res.status(404).send("The info requested does not exist.");

    res.send(otherProject);
});

module.exports = router;