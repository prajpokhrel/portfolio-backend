const mongoose = require('mongoose');
const {PersonalInfo, validate} = require('../models/personalInfo');
const fs = require("fs");

module.exports.addPersonalInfo = async (req, res) => {

    const { error } = validate(req.body);

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    // Destructuring
    // const {firstName, lastName, email, bio} = req.body;

    try {
        let newPersonalInfo = new PersonalInfo({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            bio: req.body.bio,
            profileImage: req.file.path,
            portfolioOf: req.currentUser._id,
            portfolioId: req.params.id
        });

        newPersonalInfo = await newPersonalInfo.save((error) => {
            if(error) {
                if(req.file) {
                    fs.unlink(req.file.path, (error) => {
                        console.log(error);
                    });
                }
            }
        });

        res.status(201).send(newPersonalInfo);
    } catch (error) {
        res.status(400).send(error.message);
        // console.log(error.message);
    }
}

module.exports.getPersonalInfo = async (req, res) => {

    try {
        const personal = await PersonalInfo
            .find({ portfolioId: mongoose.Types.ObjectId(req.params.id) })
            .sort({createdAt: -1});

        res.status(200).send(personal);
    } catch (error) {
        res.status(500).send(error.message);
        // console.log(error.message);
    }
}

module.exports.updatePersonalInfo = async (req, res) => {

    const { error } = validate(req.body);

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    let withImageData;

    if (req.file) {
        withImageData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            bio: req.body.bio,
            profileImage: req.file.path,
            portfolioOf: req.currentUser._id
        };
    } else {
        withImageData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            bio: req.body.bio,
            portfolioOf: req.currentUser._id
        };
    }

    try {
        const personalInfo = await PersonalInfo
            .findByIdAndUpdate(req.params.id, {
                $set: withImageData
            }, {new: true});

        if (!personalInfo) return res.status(404).send("The info requested does not exist.");

        res.status(200).send(personalInfo);
    } catch (error) {
        res.status(400).send(error.message);
        // console.log(error.message);
    }
}

module.exports.deletePersonalInfo = async (req, res) => {

    try {
        const personalInfo = await PersonalInfo.findByIdAndDelete(req.params.id);

        if (!personalInfo) return res.status(404).send("The info requested does not exist.");

        res.status(200).send(personalInfo);
    } catch (error) {
        res.status(500).send(error.message);
        // console.log(error.message);
    }
}
