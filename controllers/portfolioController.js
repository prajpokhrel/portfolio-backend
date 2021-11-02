const mongoose = require('mongoose');
const {Portfolio, validate} = require('../models/portfolio');

module.exports.addPortfolio = async (req, res) => {

    const { error } = validate(req.body);

    if (error) {
        res.status(400).send(error.details[0]);
        return;
    }

    // Destructuring
    // const {portfolioName, portfolioDescription} = req.body;

    try {
        let newPortfolio = new Portfolio({
            portfolioName: req.body.portfolioName,
            portfolioDescription: req.body.portfolioDescription,
            portfolioOf: req.currentUser._id
        });

        newPortfolio = await newPortfolio.save();
        res.status(201).send(newPortfolio);
    } catch (error) {
        res.status(400).send(error.message);
        // console.log(error.message);
    }
}

module.exports.getPortfolio = async (req, res) => {

    try {
        const portfolios = await Portfolio
            .find({ portfolioOf: mongoose.Types.ObjectId(req.currentUser._id) })
            .sort({createdAt: -1});

        res.status(200).send(portfolios);
    } catch (error) {
        res.status(500).send(error.message);
        // console.log(error.message);
    }
}

module.exports.getUserPortfolioDetails = async (req, res) => {
    try {
        const buildPortfolio = await Portfolio
            .find({ _id: mongoose.Types.ObjectId(req.params.id) })
            .populate('contact')
            .populate('personal')
            .populate('background')
            .populate('experience')
            .populate({path: 'skill', select: 'Languages Frameworks Tools Design portfolioId'})
            .populate('featured')
            .populate('other')
            .exec();
        res.status(200).send(buildPortfolio);
    } catch (error) {
        res.status(500).send(error.message);
        // console.log(error);
    }
}

module.exports.deletePortfolio = async (req, res) => {

    try {
        const portfolio = await Portfolio.findByIdAndDelete(req.params.id);

        if (!portfolio) return res.status(404).send("The requested portfolio does not exists.");

        res.status(200).send(portfolio);
    } catch (error) {
        res.status(500).send(error.message);
        // console.log(error.message);
    }
}