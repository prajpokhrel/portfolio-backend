const express = require('express');
const mongoose = require('mongoose');
const Contact = require('../models/contact');
const router = express.Router();
const requireAuth = require('../middlewares/requireAuth');

router.post('/', requireAuth, async (req, res) => {

    let newContact = new Contact({
        statusDescription: req.body.statusDescription,
        portfolioOf: req.currentUser._id
    });

    newContact = await newContact.save();
    res.send(newContact);

});

router.get('/', requireAuth, async (req, res) => {
    const contact = await Contact
        .find({ portfolioOf: mongoose.Types.ObjectId(req.currentUser._id) })
        .sort({createdAt: -1});

    res.send(contact);
});

router.put('/:id', requireAuth, async (req, res) => {
    const contact = await Contact
        .findByIdAndUpdate(req.params.id, {
            $set: {
                statusDescription: req.body.statusDescription,
                portfolioOf: req.currentUser._id
            }
        }, {new: true});

    if (!contact) return res.status(404).send("The info requested does not exist.");

    res.send(contact);

});

router.delete('/:id', requireAuth, async (req, res) => {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) return res.status(404).send("The info requested does not exist.");

    res.send(contact);
});

module.exports = router;