const mongoose = require('mongoose');
const {FeaturedProject, validate} = require('../models/featuredProject');
const fs = require('fs');

module.exports.addFeaturedProject = async (req, res) => {

    const { error } = validate(req.body);

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    // Destructuring
    // const {title, description, tools, github, demo} = req.body;

    try {
        let newFeaturedProject = new FeaturedProject({
            title: req.body.title,
            description: req.body.description,
            tools: req.body.tools,
            projectImage: req.file.path,
            github: req.body.github,
            demo: req.body.demo,
            portfolioOf: req.currentUser._id,
            portfolioId: req.params.id
        });

        newFeaturedProject = await newFeaturedProject.save((error) => {
            if(error) {
                if(req.file) {
                    fs.unlink(req.file.path, (error) => {
                        console.log(error);
                    });
                }
            }
        });
        res.status(201).send(newFeaturedProject);
    } catch (error) {
        res.status(400).send(error.message);
        // console.log(error.message);
    }
}

module.exports.getFeaturedProject = async (req, res) => {

    try {
        const featuredProject = await FeaturedProject
            .find({ portfolioId: mongoose.Types.ObjectId(req.params.id) })
            .sort({createdAt: -1});

        res.status(200).send(featuredProject);
    } catch (error) {
        res.status(500).send(error.message);
        // console.log(error.message);
    }
}

module.exports.deleteFeaturedProject = async (req, res) => {

    try {
        const featuredProject = await FeaturedProject.findByIdAndDelete(req.params.id);

        if (!featuredProject) return res.status(404).send("The info requested does not exist.");

        res.status(200).send(featuredProject);
    } catch (error) {
        res.status(500).send(error.message);
        // console.log(error.message);
    }
}