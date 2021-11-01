const mongoose = require('mongoose');
const {Contact, validate} = require('../models/contact');

module.exports.addContactInfo = async (req, res) => {

    const { error } = validate(req.body);

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    try {
        // Destructuring
        // const {statusDescription} = req.body;

        let newContact = new Contact({
            statusDescription: req.body.statusDescription,
            portfolioOf: req.currentUser._id,
            portfolioId: req.params.id
        });

        newContact = await newContact.save();
        res.status(201).send(newContact);
    } catch (error) {
        res.status(400).send(error.message);
        // console.log(error.message);
    }
}

module.exports.getContactInfo = async (req, res) => {

    try {
        const contact = await Contact
            .find({ portfolioId: mongoose.Types.ObjectId(req.params.id) })
            .sort({createdAt: -1});

        res.status(200).send(contact);
    } catch (error) {
        res.status(500).send(error.message);
        // console.log(error.message);
    }
}

module.exports.updateContactInfo = async (req, res) => {

    const { error } = validate(req.body);

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    try {
        const contact = await Contact
            .findByIdAndUpdate(req.params.id, {
                $set: {
                    statusDescription: req.body.statusDescription,
                    portfolioOf: req.currentUser._id
                }
            }, {new: true});

        if (!contact) return res.status(404).send("The info requested does not exist.");

        res.status(200).send(contact);
    } catch (error) {
        res.status(400).send(error.message);
        // console.log(error.message);
    }
}

module.exports.deleteContactInfo = async (req, res) => {

    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);

        if (!contact) return res.status(404).send("The info requested does not exist.");

        res.status(200).send(contact);
    } catch (error) {
        res.status(500).send(error.message);
        // console.log(error.message);
    }
}

