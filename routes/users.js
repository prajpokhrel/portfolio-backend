const express = require('express');
const {User, validate} = require('../models/users');
const bcrypt = require('bcrypt');
const requireAuth = require('../middlewares/requireAuth');
const router = express.Router();

router.get('/me', requireAuth, async (req, res) => {
    const user = await User.findById(req.currentUser._id).select('-password');
    res.send(user);
});

// cookie expects time in milliseconds
const maxAge = 3 * 24 * 60 * 60;

router.post('/', async (req, res) => {

    const { error } = validate(req.body);

    if (error) {
        res.status(400).send(error.details[0]);
        return;
    }

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User is already registered, please login.');

    user = new User({
        name: req.body.name,
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    const token = user.generateAuthToken();
    res.cookie('portfolioJWT', token, { domain:'https://portfolio-builder.prajwalp.com.np', httpOnly: true, maxAge: maxAge * 1000, secure: true, sameSite: "None" });
    res.status(201).send({
        _id: user._id,
        name: user.name,
        email: user.email
    });
});

router.get('/logout', requireAuth, (req, res) => {
    res.cookie('portfolioJWT', '', {domain:'https://portfolio-builder.prajwalp.com.np', maxAge: 1, secure: true, sameSite: "None"});
    res.send("Logged out.");
});

module.exports = router;