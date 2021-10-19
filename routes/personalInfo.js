const express = require('express');
const mongoose = require('mongoose');
const PersonalInfo = require('../models/personalInfo');
const router = express.Router();
const requireAuth = require('../middlewares/requireAuth');
const imageUpload = require('../middlewares/imageUpload');

router.post('/', requireAuth, imageUpload.single('profileImage'), async (req, res) => {
     let newPersonalInfo = new PersonalInfo({
         firstName: req.body.firstName,
         lastName: req.body.lastName,
         email: req.body.email,
         bio: req.body.bio,
         profileImage: req.file.path,
         portfolioOf: req.currentUser._id
     });

     newPersonalInfo = await  newPersonalInfo.save();
     res.send(newPersonalInfo);
});

router.get('/', requireAuth, async (req, res) => {
    const personal = await PersonalInfo
        .find({ portfolioOf: mongoose.Types.ObjectId(req.currentUser._id) })
        .sort({createdAt: -1});

    res.send(personal);
});

router.put('/:id', requireAuth, async (req, res) => {
    const personalInfo = await PersonalInfo
        .findByIdAndUpdate(req.params.id, {
            $set: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                bio: req.body.bio,
                profileImage: req.file.path,
                portfolioOf: req.currentUser._id
            }
        }, {new: true});

    if (!personalInfo) return res.status(404).send("The info requested does not exist.");

    res.send(personalInfo);

});

router.delete('/:id', requireAuth, async (req, res) => {
    const personalInfo = await PersonalInfo.findByIdAndDelete(req.params.id);

    if (!personalInfo) return res.status(404).send("The info requested does not exist.");

    res.send(personalInfo);
});

module.exports = router;