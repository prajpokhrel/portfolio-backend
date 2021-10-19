const express = require('express');
const mongoose = require('mongoose');
const FeaturedProject = require('../models/featuredProject');
const router = express.Router();
const requireAuth = require('../middlewares/requireAuth');
const imageUpload = require('../middlewares/imageUpload');

router.post('/', requireAuth, imageUpload.single('projectImage'), async (req, res) => {

    let newFeaturedProject = new FeaturedProject({
        title: req.body.title,
        description: req.body.description,
        tools: req.body.tools,
        projectImage: req.file.path,
        github: req.body.github,
        demo: req.body.demo,
        portfolioOf: req.currentUser._id
    });

    newFeaturedProject = await newFeaturedProject.save();
    res.send(newFeaturedProject);

});

router.get('/', requireAuth, async (req, res) => {
    const featuredProject = await FeaturedProject
        .find({ portfolioOf: mongoose.Types.ObjectId(req.currentUser._id) })
        .sort({createdAt: -1});

    res.send(featuredProject);
});

router.put('/:id', requireAuth, async (req, res) => {
    const featuredProject = await FeaturedProject
        .findByIdAndUpdate(req.params.id, {
            $set: {
                statusDescription: req.body.statusDescription,
                portfolioOf: req.currentUser._id
            }
        }, {new: true});

    if (!featuredProject) return res.status(404).send("The info requested does not exist.");

    res.send(featuredProject);

});

router.delete('/:id', requireAuth, async (req, res) => {
    const featuredProject = await FeaturedProject.findByIdAndDelete(req.params.id);

    if (!featuredProject) return res.status(404).send("The info requested does not exist.");

    res.send(featuredProject);
});

module.exports = router;