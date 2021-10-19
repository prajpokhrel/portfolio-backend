const express = require('express');
const mongoose = require('mongoose');
const Skill = require('../models/skills');
const router = express.Router();
const requireAuth = require('../middlewares/requireAuth');

router.post('/', requireAuth, async (req, res) => {
    let newSkills = new Skill({
        Languages: req.body.languages,
        Frameworks: req.body.frameworks,
        Tools: req.body.tools,
        Design: req.body.design,
        portfolioOf: req.currentUser._id
    });

    newSkills = await newSkills.save();
    res.send(newSkills);
});

router.get('/', requireAuth, async (req, res) => {
    const skills = await Skill
        .find({ portfolioOf: mongoose.Types.ObjectId(req.currentUser._id) })
        .sort({createdAt: -1})
        .select("-_id -__v -portfolioOf");

    res.send(skills);
});

router.put('/:id', requireAuth, async (req, res) => {
    const skills = await Skill
        .findByIdAndUpdate(req.params.id, {
            $set: {
                Languages: req.body.languages,
                Frameworks: req.body.frameworks,
                Tools: req.body.tools,
                Design: req.body.design,
                portfolioOf: req.currentUser._id
            }
        }, {new: true});

    if (!skills) return res.status(404).send("The info requested does not exist.");

    res.send(skills);

});

router.delete('/:id', requireAuth, async (req, res) => {
    const skills = await Skill.findByIdAndDelete(req.params.id);

    if (!skills) return res.status(404).send("The info requested does not exist.");

    res.send(skills);
});

module.exports = router;